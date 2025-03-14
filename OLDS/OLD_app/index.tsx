import { useEffect, useState } from 'react';
import LoginScreen from './(auth)/login';
import HomeScreen from './(core)/home';
import { useAuth } from '@/core/users/utils/UsersUtils';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';

export default function IndexScreen() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: '¡Bienvenido!'
    });
  }, [navigation]);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      const { authenticated } = await useAuth();
      setIsAuthenticated(authenticated);
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    isAuthenticated ? (
      <HomeScreen />
    ) : (
      <LoginScreen />
    )
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});