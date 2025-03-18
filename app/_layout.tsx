import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { AuthProvider, useAuth } from '../store/AuthContext';
import { useRouter } from 'expo-router';

export default function Layout() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace('/home');
    } else {
      router.replace('/login');
    }
  }, [user]);

  return (
    <AuthProvider>
      {/*
        Stack: each screen is stacked on top of the other and
        allows "push/pop" type transitions by default
      */}
      <Stack screenOptions={{ headerShown: false }}>
        {/*
          Stack.Screen: Defines a screen within the Stack navigation.
          name='index': This is the route name of this screen. In this case, 'index' indicates the main screen (the root).
        */}
        <Stack.Screen name='index' />
        {/*
          Other routes are defined here.
          name='login': This is the route name for the login screen.
        */}
        <Stack.Screen name='login' />
        {/*
          name='home': This is the route name for the home screen.
        */}
        <Stack.Screen name='home' />
        <Stack.Screen name='budget-daily' />
        <Stack.Screen name='categories' />
        <Stack.Screen name='goals' />
        <Stack.Screen name='recent-movements' />
      </Stack>
    </AuthProvider>
  );
}
