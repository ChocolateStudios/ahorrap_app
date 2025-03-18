import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SwipeHintProps {
  text?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  iconSize?: number;
  iconColor?: string;
}

const SwipeHint: React.FC<SwipeHintProps> = ({
  text = "Desliza para ver más",
  iconName = "chevron-down",
  iconSize = 20,
  iconColor = "#999",
}) => {
  return (
    <View style={styles.container}>
      <Ionicons name={iconName} size={iconSize} color={iconColor} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
});

export default SwipeHint; 