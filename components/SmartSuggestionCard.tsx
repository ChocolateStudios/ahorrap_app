import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SmartSuggestionCardProps {
  amount: number;
  savingsAmount: number;
  onUse: () => void;
  description?: string;
}

const SmartSuggestionCard: React.FC<SmartSuggestionCardProps> = ({
  amount,
  savingsAmount,
  onUse,
  description = "Basado en tus gastos recientes, te sugerimos un presupuesto diario de:",
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="bulb-outline" size={20} color="#22A9A2" style={styles.icon} />
        <Text style={styles.title}>Sugerencia inteligente</Text>
      </View>
      
      <Text style={styles.description}>{description}</Text>
      
      <View style={styles.amountRow}>
        <Text style={styles.amount}>S/ {amount.toFixed(2)}</Text>
        <TouchableOpacity style={styles.useButton} onPress={onUse}>
          <Text style={styles.useButtonText}>Usar sugerencia</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.savingsText}>
        Este presupuesto te permitiría ahorrar aproximadamente S/ {savingsAmount.toFixed(2)} al mes.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 14,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  amount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#22A9A2',
  },
  useButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  useButtonText: {
    fontSize: 14,
    color: '#333',
  },
  savingsText: {
    fontSize: 13,
    color: '#666',
    fontStyle: 'italic',
  },
});

export default SmartSuggestionCard; 