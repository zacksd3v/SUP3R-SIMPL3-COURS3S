import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
  FlatList, Alert, Share, SafeAreaView, KeyboardAvoidingView, Platform 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Load saved tasks on app start
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('my_tasks');
      if (savedTasks) setTasks(JSON.parse(savedTasks));
    } catch (e) {
      Alert.alert('Error', 'Something went wrong while loading data.');
    }
  };

  const saveTasks = async (newTasks) => {
    try {
      await AsyncStorage.setItem('my_tasks', JSON.stringify(newTasks));
    } catch (e) {
      Alert.alert('Error', 'Something went wrong while saving data.');
    }
  };

  // Create or Update Task
  const handleSaveTask = () => {
    if (task.trim() === '') {
      Alert.alert('Empty Input', 'Please write something first.');
      return;
    }

    if (editingId) {
      const updatedTasks = tasks.map((item) =>
        item.id === editingId ? { ...item, text: task } : item
      );
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
      setEditingId(null);
    } else {
      const newTasks = [...tasks, { id: Date.now().toString(), text: task }];
      setTasks(newTasks);
      saveTasks(newTasks);
    }
    setTask('');
  };

  // Share specific task with friends
  const handleShareTask = async (text) => {
    try {
      await Share.share({ message: text });
    } catch (error) {
      Alert.alert('Error', 'Could not share this item.');
    }
  };

  // Share the app itself with friends
  const handleShareApp = async () => {
    try {
      await Share.share({
        message: 'Download this awesome Notepad app! Zero ads, completely built by me.',
      });
    } catch (error) {
      Alert.alert('Error', 'Something went wrong.');
    }
  };

  // Delete Task
  const handleDeleteTask = (id) => {
    Alert.alert('Confirmation', 'Are you sure you want to delete this note?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          const filteredTasks = tasks.filter((item) => item.id !== id);
          setTasks(filteredTasks);
          saveTasks(filteredTasks);
        },
      },
    ]);
  };

  // Setup Update Mode
  const startEdit = (item) => {
    setTask(item.text);
    setEditingId(item.id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.innerContainer}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>📝 Zacks Notepad</Text>
        </View>

        {/* Input Box */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your thoughts here..."
            placeholderTextColor="#888"
            value={task}
            onChangeText={setTask}
            multiline
          />
          <TouchableOpacity style={styles.button} onPress={handleSaveTask}>
            <Text style={styles.buttonText}>{editingId ? 'Update' : 'Save'}</Text>
          </TouchableOpacity>
        </View>

        {/* List of Tasks */}
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.taskCard}>
              <Text style={styles.taskText}>{item.text}</Text>
              <View style={styles.actionButtons}>
                <TouchableOpacity onPress={() => startEdit(item)} style={styles.editBtn}>
                  <Text style={styles.btnText}>✏️</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleShareTask(item.text)} style={styles.shareBtn}>
                  <Text style={styles.btnText}>📤</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteTask(item.id)} style={styles.deleteBtn}>
                  <Text style={styles.btnText}>🗑️</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nothing saved yet. Start typing!</Text>
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F6FA' },
  innerContainer: { flex: 1 },
  header: { 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 20, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' 
  },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#1E293B' },
  shareAppButton: { backgroundColor: '#6366F1', padding: 8, borderRadius: 8 },
  inputContainer: { padding: 20, backgroundColor: '#FFF', margin: 15, borderRadius: 12, elevation: 2 },
  input: { fontSize: 16, color: '#334155', minHeight: 60, textAlignVertical: 'top' },
  button: { backgroundColor: '#10B981', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  listContainer: { paddingHorizontal: 15 },
  taskCard: { 
    backgroundColor: '#FFF', padding: 15, borderRadius: 12, marginBottom: 12,
    elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1 
  },
  taskText: { fontSize: 16, color: '#334155', lineHeight: 22 },
  actionButtons: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10, borderTopWidth: 0.5, paddingTop: 10, borderColor: '#EDF2F7' },
  editBtn: { marginRight: 15 },
  shareBtn: { marginRight: 15 },
  deleteBtn: {},
  btnText: { fontSize: 18 },
  emptyText: { textAlign: 'center', color: '#94A3B8', marginTop: 40, fontSize: 16 }
});
