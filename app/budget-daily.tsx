import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Slider from "@react-native-community/slider";

export default function BudgetDailyScreen() {
  const [dailyBudget, setDailyBudget] = useState(103.13);
  const [suggestion] = useState(69.0);

  const handleSaveBudget = () => {
    // Lógica para guardar el presupuesto en el backend (simulado)
    console.log('Daily Budget saved:', dailyBudget);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Presupuesto Diario</Text>
      <Text style={styles.currentValue}>$ {dailyBudget.toFixed(2)}</Text>
      <Slider
        minimumValue={50}
        maximumValue={200}
        step={1}
        value={dailyBudget}
        onValueChange={(value) => setDailyBudget(value)}
        style={styles.slider}
      />
      <Button title="Guardar presupuesto" onPress={handleSaveBudget} />

      <View style={styles.suggestionContainer}>
        <Text style={styles.suggestionTitle}>Sugerencia inteligente</Text>
        <Text style={styles.suggestionValue}>S/ {suggestion.toFixed(2)}</Text>
        <Text style={styles.suggestionText}>
          Este presupuesto te permitiría ahorrar aproximadamente S/ 230.00 al mes.
        </Text>
        <Button title="Usar sugerencia" onPress={() => setDailyBudget(suggestion)} />
      </View>

      <View style={styles.dataContainer}>
        <Text style={styles.dataTitle}>Datos para considerar</Text>
        <Text style={styles.dataItem}>Gasto diario promedio: S/ 76.67</Text>
        <Text style={styles.dataItem}>Mayor categoría de gasto: Vivienda</Text>
        <Text style={styles.dataItem}>Ahorro potencial mensual: S/ 230.00</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  currentValue: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  slider: {
    marginVertical: 16,
  },
  suggestionContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginVertical: 16,
  },
  suggestionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  suggestionValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
    color: '#2ecc71',
  },
  suggestionText: {
    fontSize: 14,
    marginBottom: 8,
  },
  dataContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
  },
  dataTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dataItem: {
    fontSize: 14,
    marginVertical: 2,
  },
});
