import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

type NotificationType = 'success' | 'error' | 'warning';

interface NotificationModalProps {
  isVisible: boolean;
  onClose: () => void;
  message: string;
  type: NotificationType;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  isVisible,
  onClose,
  message,
  type,
}) => {
  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return '#4CAF50';
      case 'error':
        return '#F44336';
      case 'warning':
        return '#FFC107';
      default:
        return '#333';
    }
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} animationIn="zoomIn" animationOut="zoomOut">
      <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
        <Text style={styles.message}>{message}</Text>
      </View>
    </Modal>
  );
};

export default NotificationModal;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  message: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
