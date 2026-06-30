import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

export default function LoginScreen({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://10.44.101.78:5000/api/auth/login', {
        email,
        password
      });

      const { token } = response.data;
      
      // Ajiye Token a wayar
      await SecureStore.setItemAsync('userToken', token);
      
      setLoading(false);
      
      // REDIRECT: Wannan zai sanar da App.js ya canza fuska zuwa Home kai tsaye
      setToken(token);
    } catch (error) {
      setLoading(false);
      const errorMsg = error.response?.data?.message || "Network Error! Check your Backend IP Address.";
      Alert.alert("Login Failed", errorMsg);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      
      <TextInput style={styles.input} placeholder="Email Address" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333' },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: '#ddd' },
  button: { backgroundColor: '#1E3A8A', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10, height: 55, justifyContent: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});