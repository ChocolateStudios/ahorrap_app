import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../store/AuthContext';
import NotificationModal from '../components/NotificationModal';

export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleLogin = async () => {
    const success = await login(email, password);
    if (success) {
      router.replace('/home'); 
    } else {
      setShowErrorModal(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <Text style={styles.label}>Correo electrónico</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {isLoading ? (
        <ActivityIndicator size="large" color="#00bfff" />
      ) : (
        <Button title="Iniciar Sesión" onPress={handleLogin} />
      )}

      <NotificationModal
        isVisible={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        message="Credenciales incorrectas. Por favor, inténtalo de nuevo."
        type="error"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f6fa',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    marginBottom: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  label: {
    marginTop: 8,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 8,
    borderRadius: 6,
  },
});
