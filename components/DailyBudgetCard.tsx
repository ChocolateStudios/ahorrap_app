import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';

interface DailyBudgetCardProps {
  currentAmount: number;
  totalAmount: number;
  onPress: () => void;
}

const DailyBudgetCard: React.FC<DailyBudgetCardProps> = ({ 
  currentAmount, 
  totalAmount, 
  onPress 
}) => {
  const screenWidth = Dimensions.get('window').width;
  const progress = currentAmount / totalAmount;
  
  return (
    <TouchableOpacity style={styles.dailyBudgetCard} onPress={onPress}>
      <Text style={styles.dailyBudgetTitle}>Presupuesto de hoy</Text>
      <Text style={styles.dailyBudgetValue}>S/ {currentAmount.toFixed(2)}</Text>
      <Text style={styles.dailyBudgetSubValue}>
        S/ {currentAmount.toFixed(2)} de S/ {totalAmount.toFixed(2)}
      </Text>
      <Progress.Bar
        progress={progress}
        width={screenWidth * 0.8}
        color="#3bceac"
        unfilledColor="#E0E0E0"
        borderWidth={0}
        height={8}
        style={{ marginTop: 10 }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dailyBudgetCard: {
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 36,
    alignSelf: 'center',
  },
  dailyBudgetTitle: {
    fontSize: 16,
    color: '#777',
  },
  dailyBudgetValue: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  dailyBudgetSubValue: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
});

export default DailyBudgetCard; 