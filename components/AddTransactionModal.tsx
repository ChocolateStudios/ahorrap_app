import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BaseModal from './BaseModal';
import CategorySelectionModal from './CategorySelectionModal';
import DatePickerModal from './DatePickerModal';
import { Category } from '../services/api';

interface AddTransactionModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (transaction: {
    type: 'ingreso' | 'gasto';
    amount: number;
    description: string;
    category: string;
    date: string;
  }) => void;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  isVisible,
  onClose,
  onSave,
}) => {
  const [transactionType, setTransactionType] = useState<'ingreso' | 'gasto'>('gasto');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);

  // Formato de fecha para mostrar al usuario (DD/MM/YYYY)
  const formattedDate = `${selectedDate.getDate().toString().padStart(2, '0')}/${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}/${selectedDate.getFullYear()}`;

  const handleSave = () => {
    // Validación básica
    if (!amount || parseFloat(amount) <= 0) {
      // Mostrar error
      return;
    }

    if (!selectedCategory) {
      // Mostrar error
      return;
    }

    onSave({
      type: transactionType,
      amount: parseFloat(amount),
      description,
      category: selectedCategory.name,
      date: formattedDate,
    });

    // Limpiar formulario
    resetForm();
    onClose();
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setTransactionType('gasto');
    setAmount('');
    setDescription('');
    setSelectedCategory(null);
    setSelectedDate(new Date());
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
  };

  const renderFooter = () => (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[
          styles.saveButton,
          (!amount || !selectedCategory) && styles.saveButtonDisabled
        ]} 
        onPress={handleSave}
        disabled={!amount || !selectedCategory}
      >
        <Text style={styles.saveButtonText}>Crear Transacción</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <BaseModal
        isVisible={isVisible}
        onClose={onClose}
        title="Registrar movimiento"
        footer={renderFooter()}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView>
            {/* Tipo de transacción */}
            <Text style={styles.label}>Tipo</Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  { borderTopLeftRadius: 8, borderBottomLeftRadius: 8 },
                  transactionType === 'ingreso' && styles.ingresoButtonActive,
                ]}
                onPress={() => setTransactionType('ingreso')}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    transactionType === 'ingreso' && styles.typeButtonTextActive,
                  ]}
                >
                  Ingreso
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  { borderTopRightRadius: 8, borderBottomRightRadius: 8 },
                  transactionType === 'gasto' && styles.gastoButtonActive,
                ]}
                onPress={() => setTransactionType('gasto')}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    transactionType === 'gasto' && styles.typeButtonTextActive,
                  ]}
                >
                  Gasto
                </Text>
              </TouchableOpacity>
            </View>

            {/* Monto */}
            <Text style={styles.label}>Monto</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="0.00"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
              />
            </View>

            {/* Descripción */}
            <Text style={styles.label}>Descripción</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Descripción de la transacción"
                value={description}
                onChangeText={setDescription}
              />
            </View>

            {/* Categoría */}
            <Text style={styles.label}>Categoría</Text>
            <TouchableOpacity 
              style={styles.selector}
              onPress={() => setIsCategoryModalVisible(true)}
            >
              {selectedCategory ? (
                <View style={styles.selectedCategoryContainer}>
                  <View 
                    style={[
                      styles.categoryIcon, 
                      { 
                        backgroundColor: transactionType === 'ingreso' 
                          ? '#118AB2' 
                          : '#FF6B6B' 
                      }
                    ]}
                  >
                    <Ionicons 
                      name={transactionType === 'ingreso' ? 'arrow-up-outline' : 'arrow-down-outline'} 
                      size={18} 
                      color="#fff" 
                    />
                  </View>
                  <Text style={styles.selectorText}>{selectedCategory.name}</Text>
                </View>
              ) : (
                <Text style={styles.selectorPlaceholder}>Seleccionar categoría</Text>
              )}
              <Ionicons name="chevron-down" size={20} color="#666" />
            </TouchableOpacity>

            {/* Fecha */}
            <Text style={styles.label}>Fecha</Text>
            <TouchableOpacity 
              style={styles.selector} 
              onPress={() => setIsDatePickerVisible(true)}
            >
              <Text style={styles.selectorText}>{formattedDate}</Text>
              <Ionicons name="calendar-outline" size={20} color="#666" />
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </BaseModal>

      {/* Modal para seleccionar categoría */}
      <CategorySelectionModal
        isVisible={isCategoryModalVisible}
        onClose={() => setIsCategoryModalVisible(false)}
        onSelectCategory={handleSelectCategory}
        transactionType={transactionType}
      />

      {/* Modal para seleccionar fecha */}
      <DatePickerModal
        isVisible={isDatePickerVisible}
        onClose={() => setIsDatePickerVisible(false)}
        onSelectDate={handleDateSelect}
        initialDate={selectedDate}
      />
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  buttonGroup: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  typeButtonActive: {
    borderColor: 'transparent',
  },
  ingresoButtonActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  gastoButtonActive: {
    backgroundColor: '#F44336',
    borderColor: '#F44336',
  },
  typeButtonText: {
    color: '#666',
    fontWeight: '600',
    fontSize: 16,
  },
  typeButtonTextActive: {
    color: '#fff',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  input: {
    padding: 12,
    fontSize: 16,
  },
  selector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  selectorText: {
    fontSize: 16,
    color: '#333',
  },
  selectorPlaceholder: {
    fontSize: 16,
    color: '#999',
  },
  selectedCategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cancelButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#22A9A2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 12,
  },
  saveButtonDisabled: {
    backgroundColor: '#ccc',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddTransactionModal; 