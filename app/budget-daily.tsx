import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Components
import HeaderWithNavigation from '../components/HeaderWithNavigation';
import DailyLimitCard from '../components/DailyLimitCard';
import SmartSuggestionCard from '../components/SmartSuggestionCard';
import BudgetConsiderationItem from '../components/BudgetConsiderationItem';

export default function BudgetDailyScreen() {
  const [dailyBudget, setDailyBudget] = useState(103.13);
  const [suggestion] = useState(69.0);
  const [savingsAmount] = useState(230.0);

  const handleSaveBudget = () => {
    // Lógica para guardar el presupuesto en el backend (simulado)
    console.log('Daily Budget saved:', dailyBudget);
  };

  const handleUseSuggestion = () => {
    setDailyBudget(suggestion);
  };

  return (
    <View style={styles.container}>
      <HeaderWithNavigation 
        title="Presupuesto Diario"
        showNotifications={true}
        badgeCount={2}
        centerIcon={{
          name: "wallet-outline",
          color: "#FFF",
          backgroundColor: "#22A9A2"
        }}
      />

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <DailyLimitCard
          value={dailyBudget}
          onChange={setDailyBudget}
          onSave={handleSaveBudget}
          onInfoPress={() => console.log('Info pressed')}
        />

        <SmartSuggestionCard
          amount={suggestion}
          savingsAmount={savingsAmount}
          onUse={handleUseSuggestion}
        />

        <Text style={styles.sectionTitle}>Datos para considerar</Text>
        
        <View style={styles.considerationsContainer}>
          <BudgetConsiderationItem
            icon="calendar-outline"
            iconBgColor="#4b7bec"
            label="Gasto diario promedio"
            value="S/ 76.67"
          />

          <BudgetConsiderationItem
            icon="home-outline"
            iconBgColor="#ff9f43"
            label="Mayor categoría de gasto"
            value="Vivienda"
          />

          <BudgetConsiderationItem
            icon="trending-up-outline"
            iconBgColor="#20bf6b"
            label="Ahorro potencial mensual"
            value="S/ 230.00"
          />
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.floatingButton}>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
    marginBottom: 16,
  },
  considerationsContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
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
