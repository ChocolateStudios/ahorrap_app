import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { fetchGoals, Goal } from '../services/api';
import * as Progress from 'react-native-progress';

export default function GoalsScreen() {
  const router = useRouter();
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    (async () => {
      const data = await fetchGoals();
      setGoals(data);
    })();
  }, []);

  const renderGoalItem = ({ item }: { item: Goal }) => {
    const progress = item.currentAmount / item.targetAmount;
    return (
      <View style={styles.goalItem}>
        <Text style={styles.goalTitle}>{item.title}</Text>
        <Text style={styles.goalSubtitle}>
          {item.currentAmount} / {item.targetAmount}
        </Text>
        <Progress.Bar progress={progress} width={200} color="#3bceac" />
        <Text style={styles.goalDeadline}>Deadline: {item.deadline}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Financial Goals</Text>
      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        renderItem={renderGoalItem}
        contentContainerStyle={{ padding: 16 }}
      />
      <Button title="Add New Goal" onPress={() => { /* TODO: add new goal */ }} />
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
  goalItem: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  goalSubtitle: {
    marginVertical: 4,
  },
  goalDeadline: {
    marginTop: 4,
    fontSize: 12,
    color: '#666',
  },
});
