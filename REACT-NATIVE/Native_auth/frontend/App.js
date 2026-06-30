import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, ActivityIndicator, View, Text, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import VerifyScreen from './screens/VerifyScreen';

export default function App() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegisterPage, setIsRegisterPage] = useState(false);
  const [isVerifyPage, setIsVerifyPage] = useState(false);
  const [userEmail, setUserEmail] = useState(''); // Na rike email din da za a yi verify

  useEffect(() => {
    const checkToken = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync('userToken');
        if (storedToken) setToken(storedToken);
      } catch (e) {
        console.log("No token found");
      }
      setLoading(false);
    };
    checkToken();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f0d76a" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {token ? (
        <HomeScreen setToken={setToken} />
      ) : isVerifyPage ? (
        // Idan an gama register, nuna shafin Verify OTP
        <VerifyScreen 
          email={userEmail} 
          setIsRegisterPage={setIsRegisterPage} 
          setIsVerifyPage={setIsVerifyPage} 
        />
      ) : isRegisterPage ? (
        <View style={{ flex: 1 }}>
          <RegisterScreen setIsVerifyPage={setIsVerifyPage} setUserEmail={setUserEmail} />
          <TouchableOpacity onPress={() => setIsRegisterPage(false)}>
            <Text style={styles.switchText}>Already have an account? Login here</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <LoginScreen setToken={setToken} />
          <TouchableOpacity onPress={() => setIsRegisterPage(true)}>
            <Text style={styles.switchText}>Don't have an account? Register here</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  switchText: { color: '#007BFF', textAlign: 'center', marginBottom: 30, fontSize: 16, fontWeight: '500' }
});