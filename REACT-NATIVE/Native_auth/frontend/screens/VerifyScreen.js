import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function VerifyScreen({ email, setIsRegisterPage, setIsVerifyPage }) {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!otp) {
      Alert.alert("Error", "Please enter the OTP code!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://10.44.101.78:5000/api/auth/verify-otp', {
        email, // Mun samo wannan daga register
        otp
      });

      setLoading(false);
      Alert.alert("Success 🚀", response.data.message);
      
      // REDIRECT: Idan an yi verification lafiya, tura shi shafin Login gaba daya
      setIsVerifyPage(false);
      setIsRegisterPage(false);
    } catch (error) {
      setLoading(false);
      const errorMsg = error.response?.data?.message || "Verification failed. Please try again.";
      Alert.alert("Error", errorMsg);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP Code</Text>
      <Text style={styles.subtitle}>We sent a 6-digit verification code to: {email}</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="6-Digit OTP" 
        value={otp} 
        onChangeText={setOtp} 
        keyboardType="number-pad"
        maxLength={6}
      />

      <TouchableOpacity style={styles.button} onPress={handleVerify} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Verify Account</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', color: '#333' },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 20 },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: '#ddd', textAlign: 'center', fontSize: 20, fontWeight: 'bold' },
  button: { backgroundColor: '#1E3A8A', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10, height: 55, justifyContent: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});