import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface BalanceCardProps {
  balance: string;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ balance }) => {
  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceText}>Saldo disponible</Text>
      <Text style={styles.balanceAmount}>{balance}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  balanceCard: {
    // backgroundColor: '#fff',
    backgroundColor: 'transparent',
    width: '90%',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 8,
    // elevation: 3,
    marginBottom: 24,
    alignSelf: 'center',
  },
  balanceText: {
    fontSize: 16,
    color: '#777',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 40,
    fontWeight: '800',
  },
});

export default BalanceCard; 