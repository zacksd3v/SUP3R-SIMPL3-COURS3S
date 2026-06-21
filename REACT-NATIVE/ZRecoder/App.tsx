import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  FlatList, 
  Alert, 
  Modal, 
  TextInput 
} from 'react-native';
import { Audio } from 'expo-av';
import * as Sharing from 'expo-sharing'; // An dawo da Sharing don ajiye fayil cikin sauki
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import na Waveform component dinka
import Waveform from './components/Waveform';

interface RecordingItem {
  id: string;
  uri: string;
  name: string;
  date: string;
  duration: string;
}

const STORAGE_KEY = '@ZRecorder_Recordings';

export default function App() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  
  const [recordingsList, setRecordingsList] = useState<RecordingItem[]>([]);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [soundInstance, setSoundInstance] = useState<Audio.Sound | null>(null);

  // States na kula da Modal din Canza Suna (Rename Modal)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [renameId, setRenameId] = useState<string | null>(null);
  const [newNameInput, setNewNameInput] = useState('');

  // Dauko tsofaffin bayanai idan an bude app
  useEffect(() => {
    loadRecordings();
    
    // Tsaftace sound idan an rufe wannan component din
    return () => {
      if (soundInstance) {
        soundInstance.unloadAsync();
      }
    };
  }, []);

  // Kula da agogo mai tafiya (Live Timer)
  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Dauko bayanai daga AsyncStorage
  async function loadRecordings() {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        setRecordingsList(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error fetching data', e);
    }
  }

  // Adana bayanai a AsyncStorage
  async function saveRecordings(updatedList: RecordingItem[]) {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      setRecordingsList(updatedList);
    } catch (e) {
      Alert.alert('Error', 'Failed to save data to storage.');
    }
  }

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  // FARA RIKODIN SAUTI
  async function startRecording() {
    try {
      if (permissionResponse?.status !== 'granted') {
        const permission = await requestPermission();
        if (permission.status !== 'granted') {
          Alert.alert('Permission', 'Microphone access is required.');
          return;
        }
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      
      setRecording(recording);
      setIsRecording(true);
    } catch (err) {
      Alert.alert('Error', 'Failed to start voice recording.');
    }
  }

  // TSAYAR DA RIKODIN SAUTI
  async function stopRecording() {
    if (!recording) return;

    setIsRecording(false);
    try {
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({ allowsRecordingIOS: false });
      
      const uri = recording.getURI();
      const timestamp = Date.now().toString();
      
      if (uri) {
        const newRecording: RecordingItem = {
          id: timestamp,
          uri: uri,
          name: `MyAudio_${timestamp.slice(-4)}`,
          date: new Date().toLocaleDateString('en-US', { hour: '2-digit', minute: '2-digit' }),
          duration: formatTime(seconds),
        };
        const updated = [newRecording, ...recordingsList];
        await saveRecordings(updated);
        Alert.alert('Saved!', 'Your voice recording has been successfully saved.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while stopping the recording.');
    }
    setRecording(null);
  }

  // BUDE AKWATIN CANZA SUNAN RIKODIN (RENAME MODAL)
  function renameRecording(id: string, currentName: string) {
    setRenameId(id);
    setNewNameInput(currentName);
    setIsModalVisible(true);
  }

  // ADANA SABON SUNAN DA AKA SAKA
  async function handleSaveRename() {
    if (renameId && newNameInput.trim() !== '') {
      const updated = recordingsList.map((item) => {
        if (item.id === renameId) {
          return { ...item, name: newNameInput.trim() };
        }
        return item;
      });
      await saveRecordings(updated);
      setIsModalVisible(false);
      setRenameId(null);
      setNewNameInput('');
    } else {
      Alert.alert('Error', 'Name cannot be empty.');
    }
  }

  // KUNNA SAUTIN DA AKA NADA
  async function playSound(uri: string, id: string) {
    try {
      if (soundInstance && playingId === id) {
        await soundInstance.stopAsync();
        setPlayingId(null);
        return;
      }

      if (soundInstance) {
        await soundInstance.unloadAsync();
      }

      await Audio.setAudioModeAsync({ allowsRecordingIOS: false, playsInSilentModeIOS: true });

      const { sound } = await Audio.Sound.createAsync({ uri });
      setSoundInstance(sound);
      setPlayingId(id);

      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setPlayingId(null);
        }
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to play this audio.');
    }
  }

  // AIKIN ADANA FAYIL A PUBLIC FOLDER (Yana amfani da Native Sharing Window)
  async function saveToPublicFolder(uri: string) {
    try {
      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        await Sharing.shareAsync(uri, {
          dialogTitle: 'Save Audio File',
          mimeType: 'audio/x-m4a',
          UTI: 'public.audio'
        });
      } else {
        Alert.alert('Error', 'Your device does not support saving files this way.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save audio.');
      console.error(error);
    }
  }

  // GOGE SAUTI
  function deleteRecording(id: string) {
    Alert.alert('Delete File', 'Are you sure you want to permanently delete this recording?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const updated = recordingsList.filter((item) => item.id !== id);
          await saveRecordings(updated);
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#121212" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Abies-Recorder Pro 🎙️</Text>
      </View>

      {/* Tsakiyar Shafi - Agogo da Visualizer */}
      <View style={styles.centerContainer}>
        <Text style={styles.timerText}>{formatTime(seconds)}</Text>
        
        <View style={styles.visualizerBox}>
          {isRecording ? (
            <Waveform isRecording={isRecording} />
          ) : (
            <Text style={styles.statusText}>Start Recording</Text>
          )}
        </View>
      </View>

      {/* Sashen Lissafin Tsofaffin Rikodin */}
      <View style={styles.listContainer}>
        <Text style={styles.listSectionTitle}>Saved Recordings 🔒</Text>
        {recordingsList.length === 0 ? (
          <Text style={styles.emptyText}>No recordings yet.</Text>
        ) : (
          <FlatList
            data={recordingsList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.cardSubtitle}>{item.date} • {item.duration}</Text>
                </View>
                
                <View style={styles.actions}>
                  {/* Play Button */}
                  <TouchableOpacity onPress={() => playSound(item.uri, item.id)}>
                    <Ionicons 
                      name={playingId === item.id ? "stop-circle" : "play-circle"} 
                      size={34} 
                      color="#34C759" 
                    />
                  </TouchableOpacity>

                  {/* Rename Button */}
                  <TouchableOpacity onPress={() => renameRecording(item.id, item.name)}>
                    <Ionicons name="create-outline" size={24} color="#FFD60A" />
                  </TouchableOpacity>

                  {/* Download to Folder Button */}
                  <TouchableOpacity onPress={() => saveToPublicFolder(item.uri)}>
                    <Ionicons name="download-outline" size={24} color="#007AFF" />
                  </TouchableOpacity>

                  {/* Delete Button */}
                  <TouchableOpacity onPress={() => deleteRecording(item.id)}>
                    <Ionicons name="trash-outline" size={24} color="#FF3B30" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      </View>

      {/* Kasan Shafi - Babban Record Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={[styles.recordButton, isRecording && styles.recordingActive]} 
          onPress={isRecording ? stopRecording : startRecording}
          activeOpacity={0.8}
        >
          <Ionicons 
            name={isRecording ? "stop" : "mic"} 
            size={36} 
            color="#FFF" 
          />
        </TouchableOpacity>
      </View>

      {/* Sashen Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>by RNG-Tech 301</Text>
      </View>

      {/* Akwatin Canza Suna (Rename Modal) */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Rename ✏️</Text>
            
            <TextInput
              style={styles.input}
              value={newNameInput}
              onChangeText={setNewNameInput}
              placeholder="Enter new name..."
              placeholderTextColor="#666"
              autoFocus={true}
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]} 
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]} 
                onPress={handleSaveRename}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', paddingHorizontal: 20 },
  header: { marginTop: 60, alignItems: 'center', marginBottom: 20 },
  headerTitle: { color: '#FFF', fontSize: 24, fontWeight: 'bold', letterSpacing: 0.5 },
  centerContainer: { alignItems: 'center', marginVertical: 10 },
  timerText: { color: '#FFF', fontSize: 64, fontWeight: '200', fontVariant: ['tabular-nums'] },
  visualizerBox: { height: 100, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  statusText: { color: '#666', fontSize: 16 },
  listContainer: { flex: 1, marginTop: 10 },
  listSectionTitle: { color: '#aaa', fontSize: 14, fontWeight: 'bold', marginBottom: 10, textTransform: 'uppercase' },
  emptyText: { color: '#444', fontSize: 15, textAlign: 'center', marginTop: 30 },
  card: { backgroundColor: '#1E1E1E', padding: 14, borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  cardInfo: { flex: 1 },
  cardTitle: { color: '#FFF', fontSize: 15, fontWeight: 'bold' },
  cardSubtitle: { color: '#aaa', fontSize: 12, marginTop: 4 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  bottomContainer: { alignItems: 'center', marginBottom: 50, marginTop: 20 },
  recordButton: { width: 80, height: 80, backgroundColor: '#FF3B30', borderRadius: 40, justifyContent: 'center', alignItems: 'center', elevation: 6, shadowColor: '#FF3B30', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 },
  recordingActive: { backgroundColor: '#1E1E1E', borderWidth: 4, borderColor: '#FF3B30', shadowColor: '#000' },
  
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#1E1E1E',
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  modalTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    backgroundColor: '#2A2A2A',
    color: '#FFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#444',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#333',
  },
  cancelButtonText: {
    color: '#AAA',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#34C759',
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    color: '#997f7f', 
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1.5,
    textTransform: 'uppercase', 
  },
});