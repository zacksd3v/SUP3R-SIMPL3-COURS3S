import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function ForgotPasswordScreen({ setIsForgotPasswordPage }) {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // Step 1: Request OTP, Step 2: Reset Password

  // Mataki na 1: Neman OTP
  const handleRequestOtp = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/auth/forgot-password', { email });
      setLoading(false);
      Alert.alert("Success", response.data.message);
      setStep(2); // Wuce zuwa mataki na biyu
    } catch (error) {
      setLoading(false);
      const errorMsg = error.response?.data?.message || "Something went wrong.";
      Alert.alert("Error", errorMsg);
    }
  };

  // Mataki na 2: Saka sabuwar Password
  const handleResetPassword = async () => {
    if (!otp || !newPassword) {
      Alert.alert("Error", "Please fill in all fields!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/auth/reset-password', {
        email,
        otp,
        newPassword
      });
      setLoading(false);
      Alert.alert("Success 🎉", response.data.message);
      setIsForgotPasswordPage(false); // Maida shi shafin Login gaba daya
    } catch (error) {
      setLoading(false);
      const errorMsg = error.response?.data?.message || "Reset failed.";
      Alert.alert("Error", errorMsg);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>

      {step === 1 ? (
        // MATAKI NA FARKOR: Shigar da Email
        <View style={{ width: '100%' }}>
          <Text style={styles.subtitle}>Enter your registered email to receive an OTP code.</Text>
          <TextInput style={styles.input} placeholder="Email Address" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
          <TouchableOpacity style={styles.button} onPress={handleRequestOtp} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Send OTP Code</Text>}
          </TouchableOpacity>
        </View>
      ) : (
        // MATAKI NA BIYU: Saka OTP da Sabuwar Password
        <View style={{ width: '100%' }}>
          <Text style={styles.subtitle}>Enter the 6-digit code sent to your email and your new password.</Text>
          <TextInput style={styles.input} placeholder="6-Digit OTP" value={otp} onChangeText={setOtp} keyboardType="number-pad" maxLength={6} />
          <TextInput style={styles.input} placeholder="New Password" value={newPassword} onChangeText={setNewPassword} secureTextEntry />
          <TouchableOpacity style={[styles.button, { backgroundColor: '#28a745' }]} onPress={handleResetPassword} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Update Password</Text>}
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity onPress={() => setIsForgotPasswordPage(false)}>
        <Text style={styles.switchText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  subtitle: { fontSize: 15, color: '#666', textAlign: 'center', marginBottom: 20, paddingHorizontal: 10 },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: '#ddd', width: '100%' },
  button: { backgroundColor: '#1E3A8A', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10, height: 55, justifyContent: 'center', width: '100%' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  switchText: { color: '#007BFF', textAlign: 'center', marginTop: 25, fontSize: 16, fontWeight: '500' }
});