import { SaveUserResource } from '@/core/users/resources/SaveUserResource';
import { LoginUserUseCase } from '@/core/users/usecases/LoginUserUseCase';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, StatusBar, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { icon } from '@/assets/images';
import { Link, router, useNavigation } from 'expo-router';
import { validatePassword, validateUsername } from '@/core/_shared/utils/validationUtils';
import { SimpleAlert } from '@/components/_shared/SimpleAlert';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const loginUserUseCase = new LoginUserUseCase();

  useEffect(() => {
    navigation.setOptions({
      title: 'Iniciar Sesión'
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

  const handleLogin = async () => {
    if (isLoading)
      return;

    const isUsernameValid = _validateUsername(username);
    const isPasswordValid = _validatePassword(password);
    
    if (isUsernameValid && isPasswordValid) {
      setIsLoading(true);

      const resource: SaveUserResource = {
        username,
        password,
      };

      const response = await loginUserUseCase.loginUser(resource);

      if (response.success) {
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
      <Text style={styles.title}>AhorrApp'e</Text>
      <Text style={styles.subtitle}>Simplifica tus finanzas</Text>
      
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
      </View>
      
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      {isLoading && <ActivityIndicator size="large" style={styles.loadingIndicator} />}
      
      <TouchableOpacity>
        <Link href="/recover" style={styles.forgotPasswordLink}>
          <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
        </Link>
      </TouchableOpacity>
      
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>¿No tienes una cuenta? </Text>
        <TouchableOpacity>
          <Link href="/register">
            <Text style={styles.signupLink}>Regístrate</Text>
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
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#4CAF50',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
    maxWidth: 500,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 15,
    width: '100%',
    alignItems: 'center',
    maxWidth: 400,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordLink: {
    marginTop: 15,
  },
  forgotPassword: {
    color: '#4CAF50',
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  signupText: {
    color: '#000000',
  },
  signupLink: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  loadingIndicator: {
    marginTop: 20,
  },
});