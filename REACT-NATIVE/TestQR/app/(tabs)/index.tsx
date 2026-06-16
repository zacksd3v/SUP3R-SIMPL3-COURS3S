import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
  FlatList, Alert, SafeAreaView, KeyboardAvoidingView, Platform, StatusBar
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';

interface Task {
  id: string;
  text: string;
}

export default function HomeScreen() {
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      loadTasks();
    }
  }, [isFocused]);

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('my_tasks');
      if (savedTasks) setTasks(JSON.parse(savedTasks));
    } catch (e) {
      Alert.alert('Error', 'Something went wrong while loading data.');
    }
  };

  const handleSaveTask = async () => {
    if (task.trim() === '') {
      Alert.alert('Empty Input', 'Please write something first.');
      return;
    }

    const newTasks = [...tasks, { id: Date.now().toString(), text: task }];
    setTasks(newTasks);
    try {
      await AsyncStorage.setItem('my_tasks', JSON.stringify(newTasks));
    } catch (e) {
      Alert.alert('Error', 'Failed to save note.');
    }
    setTask('');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📝 ZN0t3 BY Z4cks</Text>
      </View>

      {/* Input Box Wrapped in KeyboardAvoidingView safely */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your notes here..."
            placeholderTextColor="#888"
            value={task}
            onChangeText={setTask}
            multiline
          />
          <TouchableOpacity style={styles.button} onPress={handleSaveTask}>
            <Text style={styles.buttonText}>Save Note</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* List of Notes */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.taskCard}
            onPress={() => router.push(`/${item.id}` as any)}
          >
            <Text numberOfLines={3} style={styles.taskText}>{item.text}</Text>
            <Text style={styles.viewMoreText}>Tap to open / edit ➡️</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nothing saved yet. Start typing!</Text>
        }
      />

      {/* Footer Design - Locked firmly at the bottom */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>⚡ Powered by R1ng1m T3ch - 301</Text>
        <Text style={styles.footerCredits}>Version 1.0.0 | © Z4cks</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F6FA' },
  header: { 
    backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E2E8F0', 
    alignItems: 'center', justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ? StatusBar.currentHeight + 15 : 40) : 15,
    paddingBottom: 15, paddingHorizontal: 20
  },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#1E293B', textAlign: 'center' },
  inputContainer: { padding: 20, backgroundColor: '#FFF', margin: 15, borderRadius: 12, elevation: 1 },
  input: { fontSize: 16, color: '#334155', minHeight: 60, textAlignVertical: 'top' },
  button: { backgroundColor: '#10B981', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  listContainer: { paddingHorizontal: 15, paddingBottom: 20 },
  taskCard: { 
    backgroundColor: '#FFF', padding: 15, borderRadius: 12, marginBottom: 12,
    elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1 
  },
  taskText: { fontSize: 16, color: '#334155', lineHeight: 22 },
  viewMoreText: { fontSize: 12, color: '#6366F1', marginTop: 8, fontWeight: 'bold', textAlign: 'right' },
  emptyText: { textAlign: 'center', color: '#94A3B8', marginTop: 40, fontSize: 16 },
  footer: {
    padding: 15, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E2E8F0', alignItems: 'center', justifyContent: 'center'
  },
  footerText: { fontSize: 12, color: '#64748B', fontWeight: '600' },
  footerCredits: { fontSize: 10, color: '#94A3B8', marginTop: 2 }
});
