import { SaveUserResource } from '@/core/users/resources/SaveUserResource';
import { LoginUserUsecase } from '@/core/users/usecases/LoginUserUsecase';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, StatusBar, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { icon } from '@/assets/images';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: 'Iniciar Sesión'
    });
  }, [navigation]);

  const loginUserUsecase = new LoginUserUsecase();

  const handleLogin = async () => {
    const resource: SaveUserResource = {
      username,
      password,
    };

    const user = await loginUserUsecase.loginUser(resource);
    console.log('Usuario autenticado:', user);
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
          placeholder="Usuario"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
      
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
      
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>¿No tienes una cuenta? </Text>
        <TouchableOpacity>
          <Text style={styles.signupLink}>Regístrate</Text>
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
  forgotPassword: {
    color: '#4CAF50',
    marginTop: 15,
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
});