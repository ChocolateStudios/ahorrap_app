import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

import { fetchGoals, Goal } from '../services/api';
import * as Progress from 'react-native-progress';

export default function HomeScreen() {
  const router = useRouter();
  const [goals, setGoals] = useState<Goal[]>([]);
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    (async () => {
      const data = await fetchGoals();
      setGoals(data);
    })();
  }, []);

  const handlePressDailyBudget = () => {
    router.push('/budget-daily');
  };

  const goToCategories = () => router.push('/categories');
  const goToRecentMovements = () => router.push('/recent-movements');
  
  const renderGoalItem = ({ item }: { item: Goal }) => {
    const progress = item.currentAmount / item.targetAmount;
    return (
      <View style={styles.goalCard}>
        <Text style={styles.goalTitle}>{item.title}</Text>
        <Text style={styles.goalAmount}>
          {item.currentAmount} / {item.targetAmount}
        </Text>
        <Progress.Bar
         progress={progress}
          width={screenWidth * 0.7}
          color="#3bceac"
          unfilledColor="#d3d3d3"
          borderWidth={0}
          height={8}
          style={{ marginTop: 10 }}
        />
        <Text style={styles.deadline}>Deadline: {item.deadline}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.balanceCard}>
        <Text style={styles.balanceText}>Saldo disponible</Text>
        <Text style={styles.balanceAmount}>S/ 2,100.00</Text>
        <TouchableOpacity style={styles.dailyBudgetCard} onPress={handlePressDailyBudget}>
          <Text style={styles.dailyBudgetTitle}>Presupuesto de hoy</Text>
          <Text style={styles.dailyBudgetValue}>S/ 71.63</Text>
        </TouchableOpacity>
      </View>

        <View>
          {goals.map((goal, index) => (
                <View key={index} style={styles.goalCard}>
                    <Text style={styles.goalTitle}>{goal.title}</Text>
                    <Text style={styles.goalAmount}>{goal.currentAmount} / {goal.targetAmount}</Text>
                    <Progress.Bar progress={goal.currentAmount / goal.targetAmount} width={screenWidth * 0.7} color="#3bceac" unfilledColor="#d3d3d3" borderWidth={0} height={8} style={{ marginTop: 10 }} />
                    <Text style={styles.deadline}>Deadline: {goal.deadline}</Text>
                </View>
            ))}
      </View>
      
      <TouchableOpacity onPress={goToCategories}><Text>Categories</Text></TouchableOpacity>
      <TouchableOpacity onPress={goToRecentMovements}><Text>Recent movements</Text></TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    paddingTop: 60,
  },
  balanceCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 10,
    padding: 16,
    elevation: 2,
  },
  balanceText: {
    fontSize: 16,
    color: '#777',
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  dailyBudgetCard: {
    backgroundColor: '#3bceac',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  dailyBudgetTitle: {
    fontSize: 16,
    color: '#fff',
  },
  dailyBudgetValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  goalCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    elevation: 2,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  goalAmount: {
    marginTop: 4,
    fontSize: 16,
  },
  deadline: {
    marginTop: 8,
    fontSize: 12,
    color: '#666',
  },
});
