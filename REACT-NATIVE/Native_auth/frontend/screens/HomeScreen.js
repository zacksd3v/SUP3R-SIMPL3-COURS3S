import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert, ScrollView, TextInput, Modal } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export default function HomeScreen({ setToken }) {
  const [balance, setBalance] = useState(5000);
  const [userData, setUserData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [vtuType, setVtuType] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');

  // Logout Function
  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync('userToken');
      Alert.alert("Logged Out", "Logged out successfully! 👋");
      setToken(null);
    } catch (error) {
      Alert.alert("Error", "Could not complete logout.");
    }
  };

  const handleVtuTransaction = () => {
    if (!phoneNumber || !amount) {
      Alert.alert("Error", "Please fill in all fields!");
      return;
    }

    const txAmount = parseFloat(amount);
    if (txAmount > balance) {
      Alert.alert("Transaction Failed", "Insufficient wallet balance! ❌");
      return;
    }

    // Rage kudi daga wallet dinka na bogi
    setBalance(prev => prev - txAmount);
    setModalVisible(false);
    
    Alert.alert(
      "Transaction Success 🎉", 
      `Successfully sent ${vtuType} worth ₦${amount} to ${phoneNumber}.`
    );

    // Wanke guraren da aka cike
    setPhoneNumber('');
    setAmount('');
  };

  const openVtuModal = (type) => {
    setVtuType(type);
    setModalVisible(true);
  };

  return (
    <ScrollView style={styles.container}>
      {/* HEADER SECTION */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome Back {}</Text>
          <Text style={styles.userEmail}>Hacker | Developer</Text>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutBtnText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* WALLET CARD */}
      <View style={styles.walletCard}>
        <Text style={styles.walletTitle}>Wallet Balance</Text>
        <Text style={styles.walletBalance}>₦{balance.toLocaleString()}</Text>
        <View style={styles.walletFooter}>
          <Text style={styles.accountType}>Account Status: Verified ✔</Text>
        </View>
      </View>

      {/* SERVICES SECTION */}
      <Text style={styles.sectionTitle}>VTU Services</Text>
      
      <View style={styles.servicesGrid}>
        {/* Airtime Button */}
        <TouchableOpacity style={styles.serviceItem} onPress={() => openVtuModal('Airtime')}>
          <View style={[styles.iconCircle, { backgroundColor: '#b6dffc' }]}>
            <Text style={{ fontSize: 24 }}>📱</Text>
          </View>
          <Text style={styles.serviceLabel}>Buy Airtime</Text>
        </TouchableOpacity>

        {/* Data Button */}
        <TouchableOpacity style={styles.serviceItem} onPress={() => openVtuModal('Data')}>
          <View style={[styles.iconCircle, { backgroundColor: '#E8F5E9' }]}>
            <Text style={{ fontSize: 24 }}>🌐</Text>
          </View>
          <Text style={styles.serviceLabel}>Buy Data</Text>
        </TouchableOpacity>

        {/* Electricity (Fake) */}
        <TouchableOpacity style={styles.serviceItem} onPress={() => Alert.alert("Notice", "Electricity service coming soon!")}>
          <View style={[styles.iconCircle, { backgroundColor: '#FFFDE7' }]}>
            <Text style={{ fontSize: 24 }}>💡</Text>
          </View>
          <Text style={styles.serviceLabel}>Electricity</Text>
        </TouchableOpacity>

        {/* Cable TV (Fake) */}
        <TouchableOpacity style={styles.serviceItem} onPress={() => Alert.alert("Notice", "Cable TV service coming soon!")}>
          <View style={[styles.iconCircle, { backgroundColor: '#F3E5F5' }]}>
            <Text style={{ fontSize: 24 }}>📺</Text>
          </View>
          <Text style={styles.serviceLabel}>Cable TV</Text>
        </TouchableOpacity>
      </View>

      {/* POPUP MODAL FOR AIRTIME / DATA TRANSACTION */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Purchase {vtuType}</Text>
            
            <TextInput 
              style={styles.modalInput} 
              placeholder="Phone Number (e.g., 08123456789)" 
              keyboardType="phone-pad"
              maxLength={11}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />

            <TextInput 
              style={styles.modalInput} 
              placeholder={vtuType === 'Airtime' ? "Amount (₦)" : "Data Size Cost (₦)"} 
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />

            <View style={styles.modalButtonsRow}>
              <TouchableOpacity style={[styles.modalBtn, styles.cancelBtn]} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.modalBtn, styles.proceedBtn]} onPress={handleVtuTransaction}>
                <Text style={styles.proceedBtnText}>Proceed</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', paddingHorizontal: 20, paddingTop: 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  welcomeText: { fontSize: 22, fontWeight: 'bold', color: '#111827' },
  userEmail: { fontSize: 14, color: '#6B7280', marginTop: 2 },
  logoutBtn: { backgroundColor: '#FEE2E2', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20 },
  logoutBtnText: { color: '#EF4444', fontWeight: '600', fontSize: 13 },
  
  walletCard: { backgroundColor: '#1E3A8A', padding: 22, borderRadius: 16, marginBottom: 30, elevation: 4 },
  walletTitle: { color: '#93C5FD', fontSize: 14, fontWeight: '500' },
  walletBalance: { color: '#FFF', fontSize: 32, fontWeight: 'bold', marginVertical: 8 },
  walletFooter: { borderTopWidth: 0.5, borderTopColor: '#3B82F6', paddingTop: 8, marginTop: 4 },
  accountType: { color: '#6EE7B7', fontSize: 12, fontWeight: '600' },
  
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827', marginBottom: 15 },
  servicesGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  serviceItem: { backgroundColor: '#b2c5f8', width: '47%', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 15, elevation: 1 },
  iconCircle: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  serviceLabel: { fontSize: 14, fontWeight: '600', color: '#374151' },
  
  // MODAL STYLES
  modalOverlay: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 },
  modalContent: { backgroundColor: '#FFF', padding: 25, borderRadius: 16, elevation: 10 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: '#111827', textAlign: 'center' },
  modalInput: { backgroundColor: '#F3F4F6', padding: 15, borderRadius: 8, marginBottom: 15, fontSize: 16, borderWidth: 1, borderColor: '#E5E7EB' },
  modalButtonsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  modalBtn: { flex: 1, padding: 15, borderRadius: 8, alignItems: 'center' },
  cancelBtn: { backgroundColor: '#F3F4F6', marginRight: 10 },
  cancelBtnText: { color: '#4B5563', fontWeight: 'bold', fontSize: 16 },
  proceedBtn: { backgroundColor: '#1E3A8A' },
  proceedBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});