import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
  Alert, Share, SafeAreaView, KeyboardAvoidingView, Platform, StatusBar, ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';

interface Task {
  id: string;
  text: string;
}

export default function NoteDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const [noteText, setNoteText] = useState<string>('');
  const [allTasks, setAllTasks] = useState<Task[]>([]);

  useEffect(() => {
    loadNote();
  }, [id]);

  const loadNote = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('my_tasks');
      if (savedTasks) {
        const tasks: Task[] = JSON.parse(savedTasks);
        setAllTasks(tasks);
        const currentNote = tasks.find((item) => item.id === id);
        if (currentNote) setNoteText(currentNote.text);
      }
    } catch (e) {
      Alert.alert('Error', 'Failed to load note detail.');
    }
  };

  const handleUpdate = async () => {
    if (noteText.trim() === '') {
      Alert.alert('Empty Input', 'Note content cannot be empty.');
      return;
    }

    const updatedTasks = allTasks.map((item) =>
      item.id === id ? { ...item, text: noteText } : item
    );

    try {
      await AsyncStorage.setItem('my_tasks', JSON.stringify(updatedTasks));
      Alert.alert('Success', 'Note updated successfully!', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (e) {
      Alert.alert('Error', 'Failed to update note.');
    }
  };

  const handleDelete = () => {
    Alert.alert('Delete Note', 'Are you sure you want to delete this note permanently?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const filteredTasks = allTasks.filter((item) => item.id !== id);
          try {
            await AsyncStorage.setItem('my_tasks', JSON.stringify(filteredTasks));
            router.back();
          } catch (e) {
            Alert.alert('Error', 'Failed to delete note.');
          }
        },
      },
    ]);
  };

  const handleShare = async () => {
    try {
      await Share.share({ message: noteText });
    } catch (error) {
      Alert.alert('Error', 'Could not share this note.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* KeyboardAvoidingView wraps everything so buttons lift with keyboard */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.innerContainer}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 25}
      >
        {/* Safe Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>⬅️ Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>View / Edit Note</Text>
          <TouchableOpacity onPress={handleShare} style={styles.shareSubBtn}>
            <Text style={styles.shareTextIcon}>Share 📤</Text>
          </TouchableOpacity>
        </View>

        {/* Scrollable Editable Text Area */}
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <TextInput
            style={styles.mainInput}
            value={noteText}
            onChangeText={setNoteText}
            multiline
            placeholder="Edit your note details here..."
            placeholderTextColor="#888"
          />
        </ScrollView>

        {/* Action Buttons Footer - Always visible above the keyboard */}
        <View style={styles.actionFooter}>
          <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
            <Text style={styles.btnText}>Delete 🗑️</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleUpdate} style={styles.updateButton}>
            <Text style={styles.btnText}>Save ✅</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  innerContainer: { flex: 1 },
  header: { 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#F8FAFC', borderBottomWidth: 1, borderBottomColor: '#E2E8F0',
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ? StatusBar.currentHeight + 15 : 40) : 15,
    paddingBottom: 15, paddingHorizontal: 20
  },
  backButton: { padding: 5 },
  backButtonText: { fontSize: 16, color: '#6366F1', fontWeight: 'bold' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E293B' },
  shareSubBtn: { backgroundColor: '#EEF2F6', padding: 6, borderRadius: 6 },
  shareTextIcon: { fontSize: 12, fontWeight: '600', color: '#475569' },
  scrollContainer: { flexGrow: 1, padding: 20 },
  mainInput: { fontSize: 18, color: '#334155', lineHeight: 26, textAlignVertical: 'top', minHeight: 200 },
    actionFooter: {
    flexDirection: 'row', 
    backgroundColor: '#F8FAFC', 
    borderTopWidth: 1, 
    borderColor: '#E2E8F0', 
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    // Pushes buttons up away from the absolute screen bottom edge
    paddingTop: 15, 
    paddingBottom: Platform.OS === 'ios' ? 40 : 30, // Increased from 15 to 30 for perfect spacing on Android
  },
  deleteButton: { backgroundColor: '#EF4444', padding: 15, borderRadius: 10, flex: 0.45, alignItems: 'center' },
  updateButton: { backgroundColor: '#10B981', padding: 15, borderRadius: 10, flex: 0.45, alignItems: 'center' },
  btnText: { color: '#FFF', fontWeight: 'bold', fontSize: 15 }
});
