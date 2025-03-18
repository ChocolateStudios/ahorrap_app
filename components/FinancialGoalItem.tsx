import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';

interface FinancialGoalItemProps {
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  icon: string;
  iconBgColor: string;
}

const FinancialGoalItem: React.FC<FinancialGoalItemProps> = ({
  title,
  targetAmount,
  currentAmount,
  deadline,
  icon,
  iconBgColor
}) => {
  const progress = currentAmount / targetAmount;
  const percentComplete = Math.round(progress * 100);
  const formattedCurrentAmount = currentAmount.toLocaleString('es-PE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  const formattedTargetAmount = targetAmount.toLocaleString('es-PE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  // Determinar qué tipo de icono usar basado en el nombre del icono
  const renderIcon = () => {
    // Usar MaterialCommunityIcons para todos estos iconos específicos
    const materialIcons = ['home', 'airplane', 'car', 'notebook', 'shield-half-full', 'school'];
    
    // Comprobar si el icono debe usar MaterialCommunityIcons
    if (icon.includes('outline') || materialIcons.includes(icon)) {
      return <MaterialCommunityIcons name={icon as any} size={24} color="#FFF" />;
    } else {
      return <Ionicons name={icon as any} size={24} color="#FFF" />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
          {renderIcon()}
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>Meta: S/ {formattedTargetAmount}</Text>
        </View>
      </View>

      <Progress.Bar
        progress={progress}
        width={null}
        height={8}
        color={iconBgColor}
        unfilledColor="#E0E0E0"
        borderWidth={0}
        style={styles.progressBar}
      />

      <View style={styles.footer}>
        <Text style={styles.percentComplete}>{percentComplete}% completado</Text>
        <Text style={styles.currentAmount}>S/ {formattedCurrentAmount}</Text>
      </View>

      <Text style={styles.deadline}>Fecha límite: {deadline}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  progressBar: {
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  percentComplete: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  currentAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  deadline: {
    fontSize: 13,
    color: '#666',
  },
});

export default FinancialGoalItem; 