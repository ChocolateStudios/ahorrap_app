import { RegisterUserUseCase } from '@/core/users/usecases/RegisterUserUseCase';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { icon } from '@/assets/images';
import { Link, useNavigation, router } from 'expo-router';
import { SaveUserResource } from '@/core/users/resources/SaveUserResource';
import { validatePassword, validateUsername } from '@/core/_shared/utils/validationUtils';
import { SimpleAlert } from '@/components/_shared/SimpleAlert';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const registerUserUseCase = new RegisterUserUseCase();

  useEffect(() => {
    navigation.setOptions({
      title: 'Registrarse'
    });
  }, [navigation]);

  const _validateUsername = (username: string) => {
    const validationResult = validateUsername(username);
    setUsernameError(validationResult.errorMessage);
    return validationResult.isValid;
  };

  const _validatePassword = (password: string) => {
    const validationResult = validatePassword(password);
    setPasswordError(validationResult.errorMessage);
    return validationResult.isValid;
  };

  const _handleRegister = async () => {
    if (isLoading)
      return;

    const isUsernameValid = _validateUsername(username);
    const isPasswordValid = _validatePassword(password);

    if (isUsernameValid && isPasswordValid) {
      if (password !== confirmPassword) {
        SimpleAlert('Error', 'Las contraseñas no coinciden');
        return;
      }

      setIsLoading(true);
      
      const resource: SaveUserResource = {
        username,
        password,
      };

      const response = await registerUserUseCase.registerUser(resource);

      if (response.success) {
        SimpleAlert('Éxito', 'Registro completado. Por favor, inicia sesión.');
        router.push('/home');
      } else {
        setUsernameError(response.usernameErrorMessage);
        setPasswordError(response.passwordErrorMessage);
        
        if (response.alertErrorMessage) {
          SimpleAlert('Error', response.alertErrorMessage);
        }
      }
      setIsLoading(false);
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
      <Text style={styles.title}>Crear Cuenta</Text>
      
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
        
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            _validatePassword(text);
          }}
          secureTextEntry
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        
        <TextInput
          style={styles.input}
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      </View>
      
      <TouchableOpacity style={styles.registerButton} onPress={_handleRegister}>
        <Text style={styles.registerButtonText}>Registrarse</Text>
      </TouchableOpacity>

      {isLoading && <ActivityIndicator size="large" style={styles.loadingIndicator} />}
      
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>¿Ya tienes una cuenta? </Text>
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
  registerButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 15,
    width: '100%',
    alignItems: 'center',
  },
  registerButtonText: {
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
  loadingIndicator: {
    marginTop: 20,
  },
});