import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import IconButton from './IconButton';

interface HeaderWithNavigationProps {
  title: string;
  showNotifications?: boolean;
  centerIcon?: {
    name: string;
    color: string;
    backgroundColor: string;
  };
  badgeCount?: number;
  onNotificationsPress?: () => void;
}

const HeaderWithNavigation: React.FC<HeaderWithNavigationProps> = ({
  title,
  showNotifications = false,
  centerIcon,
  badgeCount = 0,
  onNotificationsPress
}) => {
  const router = useRouter();

  const goBack = () => router.back();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        <Ionicons name="chevron-back" size={24} color="#333" />
      </TouchableOpacity>
      
      <View style={styles.titleContainer}>
        {centerIcon ? (
          <View style={[styles.centerIcon, { backgroundColor: centerIcon.backgroundColor }]}>
            <Ionicons name={centerIcon.name as any} size={18} color={centerIcon.color} />
          </View>
        ) : null}
        <Text style={styles.title}>{title}</Text>
      </View>
      
      {showNotifications ? (
        <IconButton 
          iconName="notifications-outline"
          badgeCount={badgeCount}
          onPress={onNotificationsPress || (() => {})}
        />
      ) : <View style={styles.emptySpace} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 60,
    width: '100%',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  emptySpace: {
    width: 40,
  }
});

export default HeaderWithNavigation; 