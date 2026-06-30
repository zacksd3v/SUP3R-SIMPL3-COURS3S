import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function RegisterScreen({ setIsVerifyPage, setUserEmail }) { // Mun karbi wadannan props din
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill in all fields!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://10.44.101.78:5000/api/auth/register', {
        name,
        email,
        password
      });

      setLoading(false);
      Alert.alert("Success 🎉", response.data.message);
      
      // REDIRECT: Ajiye email din sannan a tura shi shafin shigar da OTP
      setUserEmail(email);
      setIsVerifyPage(true); 
    } catch (error) {
      setLoading(false);
      const errorMsg = error.response?.data?.message || "Network Error! Check your Backend IP Address.";
      Alert.alert("Registration Failed", errorMsg);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      
      <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email Address" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />

      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Register</Text>}
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