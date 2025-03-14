import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { fetchRecentMovements, Movement } from '../services/api';

export default function RecentMovementsScreen() {
  const router = useRouter();
  const [movements, setMovements] = useState<Movement[]>([]);

  useEffect(() => {
    (async () => {
      const data = await fetchRecentMovements();
      setMovements(data);
    })();
  }, []);

  const renderMovementItem = ({ item }: { item: Movement }) => {
    const sign = item.type === 'expense' ? '-' : '+';
    const color = item.type === 'expense' ? '#e74c3c' : '#2ecc71';
    return (
      <View style={styles.movementItem}>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={[styles.amount, { color }]}>{sign} S/ {item.amount}</Text>
        <Text style={styles.category}>{item.category}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Movements</Text>
      <FlatList
        data={movements}
        keyExtractor={(item) => item.id}
        renderItem={renderMovementItem}
        contentContainerStyle={{ padding: 16 }}
      />

      <View style={styles.buttonsContainer}>
        <Button title="Go to Daily Budget" onPress={() => router.push('/budget-daily')} />
        <Button title="Go to Categories" onPress={() => router.push('/categories')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    margin: 16,
  },
  movementItem: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  amount: {
    marginTop: 4,
    fontSize: 16,
  },
  category: {
    color: '#999',
    fontSize: 14,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
});
