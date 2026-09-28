import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';

export const AdaptiveProfile = ({ onSaveToken, onClearToken, storedToken }) => {
  // Mengambil lebar layar aktual secara real-time
  const { width } = useWindowDimensions();

  // Mengatur batas breakpoint tablet (600 pixel)
  const isTablet = width > 600;

  // Ephemeral state untuk input lokal
  const [inputToken, setInputToken] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>
        {isTablet ? 'Panel Profil Tablet (Mode Luas)' : 'Profil Pengguna (Mode Ringkas)'}
      </Text>

      {/* Pembungkus Dinamis: Berubah dari Kolom ke Baris saat Layar Lebar */}
      <View style={[styles.cardWrapper, isTablet && styles.tabletRow]}>
        {/* Bagian Visual Avatar */}
        <View style={[styles.avatarBox, isTablet && styles.tabletAvatar]}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>UMM</Text>
          </View>
          <Text style={styles.userName}>Ahmad Dahlan</Text>
          <Text style={styles.userRole}>Insinyur Perangkat Lunak</Text>
        </View>

        {/* Bagian Pengelolaan Kredensial */}
        <View style={[styles.formBox, isTablet && styles.tabletForm]}>
          <Text style={styles.sectionTitle}>Keamanan Akses Sesi</Text>
          <Text style={styles.label}>Token Otentikasi (JWT):</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukkan Token Baru..."
            value={inputToken}
            onChangeText={setInputToken}
            secureTextEntry={true}
          />

          <TouchableOpacity
            style={styles.buttonPrimary}
            onPress={() => {
              if (inputToken.trim()) {
                onSaveToken(inputToken);
                setInputToken('');
              }
            }}
          >
            <Text style={styles.buttonText}>Enkripsi & Simpan Token</Text>
          </TouchableOpacity>

          {storedToken ? (
            <TouchableOpacity
              style={styles.buttonSecondary}
              onPress={() => {
                if (onClearToken) {
                  onClearToken();
                }
              }}
            >
              <Text style={styles.buttonSecondaryText}>Hapus Token (Logout)</Text>
            </TouchableOpacity>
          ) : null}

          <View style={styles.tokenDisplayArea}>
            <Text style={styles.label}>Status Penyimpanan Hardware:</Text>
            <Text style={styles.tokenStatusText}>
              {storedToken
                ? `Terenkripsi: ${storedToken.substring(0, 10)}...`
                : 'Belum Ada Token Tersimpan'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F6F9',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0A192F', // Warna Navy Utama UMM
    marginBottom: 16,
    textAlign: 'center',
  },
  cardWrapper: {
    flexDirection: 'column', // Orientasi default untuk mobile
    gap: 16,
  },
  tabletRow: {
    flexDirection: 'row', // Orientasi berubah ke baris untuk tablet
    alignItems: 'stretch',
  },
  avatarBox: {
    backgroundColor: '#8B0000', // Warna Merah UMM
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabletAvatar: {
    flex: 1, // Mengambil 1 porsi ruang di mode tablet
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#D4AF37', // Warna Aksesori Emas
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontWeight: 'bold',
    color: '#0A192F',
    fontSize: 18,
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userRole: {
    color: '#E0E0E0',
    fontSize: 14,
  },
  formBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E1E8ED',
  },
  tabletForm: {
    flex: 2, // Mengambil 2 porsi ruang di mode tablet (lebih lebar)
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A192F',
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    backgroundColor: '#FAFAFA',
  },
  buttonPrimary: {
    backgroundColor: '#0A192F',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  buttonSecondary: {
    backgroundColor: '#E53E3E',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonSecondaryText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  tokenDisplayArea: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  tokenStatusText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8B0000',
  },
});
