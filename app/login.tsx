import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../store/AuthContext';
import NotificationModal from '../components/NotificationModal';
import { globalStyles } from '../styles/globalStyles';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    const success = await login(email, password);
    if (success) {
      router.replace('/home'); 
    } else {
      setShowErrorModal(true);
    }
  };

  return (
    <View style={[globalStyles.container, styles.container]}>
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <FontAwesome name="dollar" size={30} color="#fff" style={styles.logoIcon} />
        </View>
        <Text style={styles.logoText}>Ahorra.pe</Text>
      </View>

      <Text style={styles.title}>Iniciar Sesión</Text>
      
      <Text style={styles.subtitle}>
        Ingresa tus credenciales para acceder a tu cuenta
      </Text>
      
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.passwordToggle}>
          <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#666" />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
      
      {isLoading ? (
        <ActivityIndicator size="large" color="#22A9A2" />
      ) : (
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      )}
      
      <TouchableOpacity style={styles.registerContainer}>
        <Text style={styles.registerText}>
          ¿No tienes una cuenta? <Text style={styles.registerLink}>Regístrate</Text>
        </Text>
      </TouchableOpacity>
      
      <View style={styles.demoContainer}>
        <Text style={styles.demoText}>
          Para fines de demostración, usa:
        </Text>
        <Text style={styles.demoText}>
          Email: demo@ahorra.pe
        </Text>
        <Text style={styles.demoText}>
          Contraseña: password
        </Text>
      </View>

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
    backgroundColor: '#FFFFFF',
    padding: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#22A9A2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoIcon: {
    marginLeft: 2,
  },
  logoText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#22A9A2',
    marginTop: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    color: '#666',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#FFF',
  },
  inputIcon: {
    marginLeft: 12,
    marginRight: 8,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  passwordToggle: {
    padding: 12,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  forgotPassword: {
    color: '#22A9A2',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#22A9A2',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  registerContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  registerText: {
    fontSize: 14,
    color: '#666',
  },
  registerLink: {
    color: '#22A9A2',
    fontWeight: 'bold',
  },
  demoContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  demoText: {
    fontSize: 13,
    color: '#888',
    lineHeight: 20,
  },
});
