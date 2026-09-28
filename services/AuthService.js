import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'umm_auth_secure_jwt';

export class AuthService {
  /**
   * Menyimpan token secara terenkripsi di Keystore / Keychain perangkat
   */
  static async persistToken(token) {
    try {
      await SecureStore.setItemAsync(TOKEN_KEY, token, {
        keychainAccessible: SecureStore.WHEN_UNLOCKED,
      });
      return { success: true };
    } catch (error) {
      console.error('Gagal melakukan enkripsi token:', error);
      return { success: false, error };
    }
  }

  /**
   * Membaca dan mendekripsi token dari memori terproteksi hardware
   */
  static async fetchStoredToken() {
    try {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      return token;
    } catch (error) {
      console.error('Gagal membaca token terenkripsi:', error);
      return null;
    }
  }

  /**
   * Menghapus token dari enkripsi hardware saat sistem melakukan logout
   */
  static async clearStoredToken() {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      return true;
    } catch (error) {
      console.error('Gagal menghapus token terenkripsi:', error);
      return false;
    }
  }
}
