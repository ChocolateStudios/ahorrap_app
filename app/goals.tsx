import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Components
import HeaderWithNavigation from '../components/HeaderWithNavigation';
import FinancialGoalItem from '../components/FinancialGoalItem';
import AddGoalButton from '../components/AddGoalButton';

// Services and data
import { mockFinancialGoalsDetailed } from '../services/mockData';

export default function GoalsScreen() {
  const [goals, setGoals] = useState(mockFinancialGoalsDetailed);

  // Se podría cargar los datos desde una API real
  useEffect(() => {
    // Simulación de carga de datos
    setGoals(mockFinancialGoalsDetailed);
  }, []);

  const handleAddGoal = () => {
    // TODO: Implementar funcionalidad para agregar nueva meta
    console.log('Add new financial goal');
  };

  return (
    <View style={styles.container}>
      <HeaderWithNavigation 
        title="Metas Financieras"
        showNotifications={true}
        badgeCount={2}
      />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.subtitle}>
          Establece y sigue tus metas financieras para alcanzar tus objetivos económicos.
        </Text>

        {goals.map((goal) => (
          <FinancialGoalItem
            key={goal.id}
            title={goal.title}
            targetAmount={goal.targetAmount}
            currentAmount={goal.currentAmount}
            deadline={goal.deadline}
            icon={goal.icon}
            iconBgColor={goal.iconBgColor}
          />
        ))}

        <AddGoalButton onPress={handleAddGoal} />
      </ScrollView>

      <TouchableOpacity style={styles.floatingButton} onPress={handleAddGoal}>
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    lineHeight: 22,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#22A9A2',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
});
