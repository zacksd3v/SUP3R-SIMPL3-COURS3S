import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';

export default function RootLayout() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="#F4F6FA" translucent={false} />
      
      <Stack
        screenOptions={{
          headerShown: false, // Wipes out all default top headers globally
        }}
      >
        {/* Main List Screen */}
        <Stack.Screen 
          name="index" 
          options={{ 
            headerShown: false,
          }} 
        />
        
        {/* Note Detail Screen - Matching the exact filename string */}
        <Stack.Screen 
          name="[id]" 
          options={{ 
            headerShown: false,
          }} 
        />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
  },
});
