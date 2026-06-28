import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export default function HomeScreen({ setToken }) {
  
  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync('userToken');
      Alert.alert("Logged Out", "Logged out successfully! 👋");
      setToken(null); // Dawo da mu shafin Login
    } catch (error) {
      Alert.alert("Error", "Could not complete logout.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Home! 🎉</Text>
      <Text style={styles.subtitle}>This screen is protected by a secured JWT Token.</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 30 },
  logoutButton: { backgroundColor: '#dc3545', padding: 15, borderRadius: 8, width: '100%', alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});