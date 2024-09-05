import { LinearGradient } from "expo-linear-gradient";
import { Link, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, Alert, Image, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { icon } from '@/assets/images';
import { validateUsername } from "@/core/_shared/utils/validationUtils";
import { SimpleAlert } from "@/components/_shared/SimpleAlert";

export default function RecoverScreen() {
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: 'Recuperar cuenta'
    });
  }, [navigation]);

  const _validateUsername = (username: string) => {
    const validationResult = validateUsername(username);
    setUsernameError(validationResult.errorMessage);
    return validationResult.isValid;
  };

  const handleRecoverAccount = () => {
    if (_validateUsername(username)) {
      // Aquí iría la lógica para enviar el correo de recuperación
      SimpleAlert('Éxito', 'Se ha enviado un correo de recuperación a tu dirección de email.');
      navigation.navigate('Login' as never);
    }
  };

  return (
    <LinearGradient
      colors={['#ffffff', '#e6f7e6']}
      style={styles.container}
    >
      <Image
        source={icon}
        style={styles.logo}
      />
      <Text style={styles.title}>Recuperar cuenta</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            _validateUsername(text);
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}
      </View>
      
      <TouchableOpacity style={styles.recoverButton} onPress={handleRecoverAccount}>
        <Text style={styles.recoverButtonText}>Enviar correo de recuperación</Text>
      </TouchableOpacity>
      
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>¿Recordaste tu contraseña? </Text>
        <TouchableOpacity>
          <Link href="/login">
            <Text style={styles.loginLink}>Inicia sesión</Text>
          </Link>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  recoverButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 15,
    width: '100%',
    alignItems: 'center',
  },
  recoverButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  loginText: {
    color: '#000000',
  },
  loginLink: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});