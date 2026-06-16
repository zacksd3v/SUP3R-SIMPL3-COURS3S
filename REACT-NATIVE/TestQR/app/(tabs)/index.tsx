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
      if (savedTasks) {
        const parsedTasks: Task[] = JSON.parse(savedTasks);
        setTasks(parsedTasks.reverse());
      }
    } catch (e) {
      Alert.alert('Error', 'Something went wrong while loading data.');
    }
  };

  const handleSaveTask = async () => {
    if (task.trim() === '') {
      Alert.alert('Empty Input', 'Please write something first.');
      return;
    }

    let rawExistingTasks: Task[] = [];
    try {
      const savedTasks = await AsyncStorage.getItem('my_tasks');
      if (savedTasks) {
        rawExistingTasks = JSON.parse(savedTasks);
      }
    } catch (e) {
      // Fallback
    }

    const updatedRawTasks = [...rawExistingTasks, { id: Date.now().toString(), text: task }];
    setTasks([...updatedRawTasks].reverse());
    
    try {
      await AsyncStorage.setItem('my_tasks', JSON.stringify(updatedRawTasks));
    } catch (e) {
      Alert.alert('Error', 'Failed to save note.');
    }
    setTask('');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📝 ZEE-N0t3Pad </Text>
      </View>

      {/* Input Box Area */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your notes here..."
            placeholderTextColor="#888"
            value={task}
            onChangeText={setTask}
            multiline
            // REMOVED maxLength completely so you can write infinite text
            scrollEnabled={true} // Forces the text inside the box to scroll smoothly
          />
          <TouchableOpacity style={styles.button} onPress={handleSaveTask}>
            <Text style={styles.buttonText}>Save Note</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* List of Notes */}
      <View style={styles.listWrapper}>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.taskCard}
              onPress={() => router.push(`/${item.id}` as any)}
            >
              {/* Shows up to 3 lines on the dashboard, tapping opens the full note */}
              <Text numberOfLines={3} style={styles.taskText}>{item.text}</Text>
              <Text style={styles.viewMoreText}>Tap to open / edit ➡️</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nothing saved yet. Start typing!</Text>
          }
        />
      </View>

      {/* Footer Design */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>⚡ Powered by R1ng1m T3ch - 301</Text>
        <Text style={styles.footerCredits}>Version 1.0.0 | © Z4cks</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0e7e7' },
  header: { 
    backgroundColor: '#ffc1c1', borderBottomWidth: 1, borderBottomColor: '#E2E8F0', 
    alignItems: 'center', justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ? StatusBar.currentHeight + 15 : 40) : 15,
    paddingBottom: 15, paddingHorizontal: 20
  },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#596577', textAlign: 'center' },
  inputContainer: { padding: 15, backgroundColor: '#FFF', marginHorizontal: 15, marginTop: 15, borderRadius: 12, elevation: 1 },
  // Fixed style constraints: minHeight keeps it neat, maxHeight stops it from overflowing the screen
  input: { fontSize: 16, color: '#334155', minHeight: 60, maxHeight: 120, textAlignVertical: 'top' }, 
  button: { backgroundColor: '#10B981', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  listWrapper: { flex: 1, marginTop: 5 }, 
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
  footerCredits: { fontSize: 10, color: '#ffc1c1', marginTop: 2 }
});
