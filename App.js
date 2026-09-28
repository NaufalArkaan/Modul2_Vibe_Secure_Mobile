import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { AdaptiveProfile } from './components/AdaptiveProfile';
import { AuthService } from './services/AuthService';

export default function App() {
  const [authToken, setAuthToken] = useState(null);

  // Memicu pembacaan token terenkripsi saat aplikasi pertama kali dimuat
  useEffect(() => {
    loadExistingToken();
  }, []);

  const loadExistingToken = async () => {
    const token = await AuthService.fetchStoredToken();
    if (token) {
      setAuthToken(token);
    }
  };

  const handleSaveToken = async (newToken) => {
    if (!newToken.trim()) return;
    const result = await AuthService.persistToken(newToken);
    if (result.success) {
      setAuthToken(newToken);
    }
  };

  const handleClearToken = async () => {
    const success = await AuthService.clearStoredToken();
    if (success) {
      setAuthToken(null);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F6F9" />
      <AdaptiveProfile
        onSaveToken={handleSaveToken}
        onClearToken={handleClearToken}
        storedToken={authToken}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F4F6F9',
  },
});
