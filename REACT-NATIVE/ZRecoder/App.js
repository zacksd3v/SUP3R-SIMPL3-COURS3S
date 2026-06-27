import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sharing from 'expo-sharing';


export default function App() {
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingsList, setRecordingsList] = useState([]);
  
  // Timer States
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);

  // Playback States
  const [sound, setSound] = useState(null);
  const [playingId, setPlayingId] = useState(null);

  // Rename Modal States
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [newTitleText, setNewTitleText] = useState("");


  // Load recordings from storage when app starts
  useEffect(() => {
    const loadRecordings = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@recordings_key');
        if (jsonValue !== null) {
          setRecordingsList(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error('Failed to load recordings from storage:', e);
      }
    };

    loadRecordings();
  }, []);


  // 1. Format Time (00:00:00)
  function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  }

  // 2. Start Recording Function
  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();
      
      if (permission.status === 'granted') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        
        setRecording(recording);
        setIsRecording(true);

        // Start Timer
        setSecondsElapsed(0);
        const interval = setInterval(() => {
          setSecondsElapsed((prev) => prev + 1);
        }, 1000);
        setTimerInterval(interval);
      } else {
        alert('Microphone permission is required to record audio.');
      }
    } catch (err) {
      console.error('Failed to start recording:', err);
    }
  }

  // 3. Stop Recording Function
  async function stopRecording() {
    try {
      setIsRecording(false);
      setRecording(null);

      // Stop Timer
      if (timerInterval) {
        clearInterval(timerInterval);
        setTimerInterval(null);
      }

      await recording.stopAndUnloadAsync();
      const uri = recording.getURI(); 

      // Save to Storage
      if (uri) {
        const newRecordingItem = {
          id: Date.now().toString(),
          title: `Recording #${recordingsList.length + 1}`,
          uri: uri,
          duration: formatTime(secondsElapsed),
        };
        const updatedList = [newRecordingItem, ...recordingsList];
        setRecordingsList(updatedList);
        saveToStorage(updatedList); // Wannan zai adana shi a storage
      }

    } catch (err) {
      console.error('Failed to stop recording:', err);
    }
  }

  // 4. Play Specific Sound From List
  async function playListItem(item) {
    try {
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
        
        if (playingId === item.id) {
          setPlayingId(null);
          return;
        }
      }

      setPlayingId(item.id);
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: item.uri },
        { shouldPlay: true }
      );
      setSound(newSound);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setPlayingId(null);
          newSound.unloadAsync();
        }
      });
    } catch (err) {
      console.error('Failed to play audio:', err);
    }
  }

  // Function to delete a single recording from the list
    function deleteRecording(id) {
    const updatedList = recordingsList.filter((item) => item.id !== id);
    setRecordingsList(updatedList);
    saveToStorage(updatedList); // Wannan zai adana sabon list din bayan an goge guda daya
  }


  // Function to save recordings list to phone storage
  const saveToStorage = async (listToSave) => {
    try {
      const jsonValue = JSON.stringify(listToSave);
      await AsyncStorage.setItem('@recordings_key', jsonValue);
    } catch (e) {
      console.error('Failed to save recordings to storage:', e);
    }
  };

  // 1. Triggered when user clicks the recording name to open the popup
  function openRenameModal(id, currentTitle) {
    setSelectedItemId(id);
    setNewTitleText(currentTitle);
    setIsModalVisible(true);
  }

  // 2. Triggered when user clicks "Save" inside the popup
  function saveNewName() {
    if (newTitleText && newTitleText.trim() !== "") {
      const updatedList = recordingsList.map((item) => {
        if (item.id === selectedItemId) {
          return { ...item, title: newTitleText };
        }
        return item;
          });
      setRecordingsList(updatedList);
      saveToStorage(updatedList);
    }
    setIsModalVisible(false); // Close the popup
  }

  // Function to share or save the audio file
  async function shareRecording(itemUri) {
    try {
      // Check if sharing is available on the device
      const isAvailable = await Sharing.isAvailableAsync();
      
      if (isAvailable) {
        await Sharing.shareAsync(itemUri);
      } else {
        alert("Sharing is not available on this device");
      }
    } catch (err) {
      console.error("Failed to share recording:", err);
    }
  }


  return (
    <View style={styles.container}>
      {/* HEADER AREA */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ZRecorder</Text>
        <Text style={styles.headerSubtitle}>PRO</Text>
      </View>

      {/* TIMER & STATUS AREA */}
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{formatTime(secondsElapsed)}</Text>
        <Text style={styles.statusText}>
          {isRecording ? 'Recording...' : 'Ready to Record'}
        </Text>
      </View>

      {/* LIST AREA */}
      <ScrollView style={styles.listContainer}>
        {recordingsList.length === 0 ? (
          <Text style={styles.emptyText}>No recordings found</Text>
        ) : (
          recordingsList.map((item) => {
            const isThisPlaying = playingId === item.id;
            return (
              <View key={item.id} style={styles.listItem}>
                <View>
                  <TouchableOpacity  onPress={() => openRenameModal(item.id, item.title)}>
                      <Text style={styles.itemTitle}>{item.title}</Text>
                  </TouchableOpacity>
                  <Text style={styles.itemDuration}>{item.duration}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                {/* Share Button */}
                <TouchableOpacity 
                  style={styles.itemShareButton} 
                  onPress={() => shareRecording(item.uri)}
                >
                  <Text style={{ fontSize: 16 }}>📤</Text>
                </TouchableOpacity>

                {/* Play Button */}
                <TouchableOpacity 
                  style={styles.itemPlayButton} 
                  onPress={() => playListItem(item)}
                >
                  <Text style={{ color: '#FFF', fontSize: 12, fontWeight: '600' }}>
                    {isThisPlaying ? "⏹️ Stop" : "▶️ Play"}
                  </Text>
                </TouchableOpacity>

                {/* Delete Button */}
                <TouchableOpacity 
                  style={styles.itemDeleteButton} 
                  onPress={() => deleteRecording(item.id)}
                >
                  <Text style={{ fontSize: 16 }}>🗑️</Text>
                </TouchableOpacity>
              </View>


              </View>
            );
          })
        )}
      </ScrollView>

      {/* CONTROLS AREA */}
      <View style={styles.controlsContainer}>
        <View style={{ width: 60 }} />
        
        <TouchableOpacity 
          style={styles.recordButtonWrapper} 
          onPress={isRecording ? stopRecording : startRecording}
        >
          <View style={[
            styles.recordButton, 
            isRecording && { borderRadius: 8, width: 40, height: 40 }
          ]} />
        </TouchableOpacity>

        <View style={{ width: 60 }} />        
      </View>
       {/* FOOTER AREA */}
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Powered by RNG Tech-301</Text>
      </View>
      {/* RENAME POPUP MODAL */}
      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Rename Recording</Text>
            
            <TextInput
              style={styles.modalInput}
              value={newTitleText}
              onChangeText={setNewTitleText}
              placeholder="Enter new name"
              placeholderTextColor="#8E8E93"
              autoFocus={true}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, { backgroundColor: '#2C2C2E' }]} 
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={{ color: '#FFF', fontWeight: '600' }}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.modalButton, { backgroundColor: '#FF3B30' }]} 
                onPress={saveNewName}
              >
                <Text style={{ color: '#FFF', fontWeight: '600' }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'space-between',
    paddingVertical: 60,
    paddingHorizontal: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  headerSubtitle: {
    color: '#FF3B30',
    fontSize: 12,
    fontWeight: 'bold',
    backgroundColor: '#2C2C2E',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
  },
  timerText: {
    color: '#FFFFFF',
    fontSize: 64,
    fontWeight: '200',
    fontVariant: ['tabular-nums'],
  },
  statusText: {
    color: '#8E8E93',
    fontSize: 16,
    marginTop: 10,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  listContainer: {
    flex: 1,
    width: '100%',
    marginVertical: 20,
    maxHeight: 250,
  },
  emptyText: {
    color: '#4E4E52',
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
  listItem: {
    backgroundColor: '#1C1C1E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2C2C2E',
  },
  itemTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDuration: {
    color: '#8E8E93',
    fontSize: 12,
    marginTop: 4,
  },
  itemPlayButton: {
    backgroundColor: '#2C2C2E',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    minWidth: 75,
    alignItems: 'center'
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  recordButtonWrapper: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  recordButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FF3B30',
  },
    itemDeleteButton: {
    backgroundColor: '#2C2C2E',
    padding: 8,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
    modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)', // Zai danyi baki-baki a bayan popup
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1C1C1E',
    width: '80%',
    padding: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#2C2C2E',
  },
  modalTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalInput: {
    backgroundColor: '#2C2C2E',
    color: '#FFF',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
    footerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: -20, // Don ya dan matsa kasa daidai kasan screen
  },
  footerText: {
    color: '#6e6e7c', // Launi mai kyau wanda baya baci a duhu
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 1,
    textTransform: 'uppercase', // Zai maida shi babban baki fers
  },

});
