import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AddGoalButtonProps {
  onPress: () => void;
  label?: string;
}

const AddGoalButton: React.FC<AddGoalButtonProps> = ({
  onPress,
  label = 'Agregar meta'
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Ionicons name="add-circle-outline" size={24} color="#22A9A2" />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#22A9A2',
    marginLeft: 8,
  }
});

export default AddGoalButton; 