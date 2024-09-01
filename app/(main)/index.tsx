import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router'; // O la importación correspondiente para React Navigation

export default function MainHomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MAIN AhorrApp'e</Text>
      <Link href="/login" style={styles.link}>Login</Link>
      <Link href="/register" style={styles.link}>Register</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  link: {
    fontSize: 18,
    color: 'blue',
    marginTop: 10,
  },
});
