import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';

interface DailyLimitCardProps {
  value: number;
  minValue?: number;
  maxValue?: number;
  onChange: (value: number) => void;
  onSave: () => void;
  onInfoPress?: () => void;
}

const DailyLimitCard: React.FC<DailyLimitCardProps> = ({
  value,
  minValue = 50,
  maxValue = 200,
  onChange,
  onSave,
  onInfoPress
}) => {
  const handleDecrease = () => {
    if (value > minValue) {
      onChange(Math.max(value - 1, minValue));
    }
  };

  const handleIncrease = () => {
    if (value < maxValue) {
      onChange(Math.min(value + 1, maxValue));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Configura tu límite diario</Text>
        <TouchableOpacity onPress={onInfoPress}>
          <Ionicons name="information-circle-outline" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <Text style={styles.amountValue}>$ {value.toFixed(2)}</Text>
      <Text style={styles.description}>Tu presupuesto diario actual</Text>

      <View style={styles.sliderContainer}>
        <Text style={styles.rangeLabel}>s/{minValue}</Text>
        <Slider
          style={styles.slider}
          minimumValue={minValue}
          maximumValue={maxValue}
          step={1}
          value={value}
          onValueChange={onChange}
          minimumTrackTintColor="#22A9A2"
          maximumTrackTintColor="#E0E0E0"
          thumbTintColor="#22A9A2"
        />
        <Text style={styles.rangeLabel}>s/{maxValue}</Text>
      </View>

      <View style={styles.buttonsRow}>
        <TouchableOpacity 
          style={styles.adjustButton} 
          onPress={handleDecrease}
        >
          <Ionicons name="chevron-down" size={24} color="#666" />
        </TouchableOpacity>
        <View style={styles.spacer} />
        <TouchableOpacity 
          style={styles.adjustButton} 
          onPress={handleIncrease}
        >
          <Ionicons name="chevron-up" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={onSave}>
        <Text style={styles.saveButtonText}>Guardar presupuesto</Text>
      </TouchableOpacity>
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  amountValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#22A9A2',
    textAlign: 'center',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
  },
  slider: {
    flex: 1,
    height: 40,
    marginHorizontal: 10,
  },
  rangeLabel: {
    fontSize: 12,
    color: '#666',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  adjustButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacer: {
    flex: 1,
  },
  saveButton: {
    backgroundColor: '#22A9A2',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DailyLimitCard; 