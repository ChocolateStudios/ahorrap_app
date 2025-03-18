import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BaseModal from './BaseModal';
import { Category, fetchCategories } from '../services/api';

interface CategorySelectionModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelectCategory: (category: Category) => void;
  transactionType: 'ingreso' | 'gasto';
}

const CategorySelectionModal: React.FC<CategorySelectionModalProps> = ({
  isVisible,
  onClose,
  onSelectCategory,
  transactionType,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const allCategories = await fetchCategories();
        // Filtrar categorías según el tipo de transacción
        const filteredCategories = allCategories.filter(cat => 
          (transactionType === 'ingreso' && cat.type === 'income') || 
          (transactionType === 'gasto' && cat.type === 'expense')
        );
        setCategories(filteredCategories);
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isVisible) {
      loadCategories();
    }
  }, [isVisible, transactionType]);

  const renderCategory = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => {
        onSelectCategory(item);
        onClose();
      }}
    >
      <View style={[styles.categoryIcon, { backgroundColor: getCategoryColor(item.name) }]}>
        <Ionicons name={getCategoryIcon(item.name)} size={18} color="#fff" />
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
      <Ionicons name="chevron-forward" size={18} color="#aaa" />
    </TouchableOpacity>
  );

  const getCategoryColor = (name: string): string => {
    // Asignar colores según la categoría
    const colors: Record<string, string> = {
      'Alimentos': '#FF6B6B',
      'Transporte': '#4D96FF',
      'Vivienda': '#6665DD',
      'Entretenimiento': '#FFD166',
      'Salud': '#06D6A0',
      'Inversiones': '#118AB2',
      'Freelance': '#073B4C',
      // Colores por defecto para otras categorías
      'default_income': '#118AB2',
      'default_expense': '#FF6B6B',
    };

    return colors[name] || (transactionType === 'ingreso' ? colors.default_income : colors.default_expense);
  };

  const getCategoryIcon = (name: string): string => {
    // Asignar iconos según la categoría
    const icons: Record<string, string> = {
      'Alimentos': 'fast-food-outline',
      'Transporte': 'car-outline',
      'Vivienda': 'home-outline',
      'Entretenimiento': 'film-outline',
      'Salud': 'medkit-outline',
      'Inversiones': 'trending-up-outline',
      'Freelance': 'briefcase-outline',
      // Iconos por defecto
      'default_income': 'arrow-up-circle-outline',
      'default_expense': 'arrow-down-circle-outline',
    };

    return icons[name] || (transactionType === 'ingreso' ? icons.default_income : icons.default_expense);
  };

  return (
    <BaseModal
      isVisible={isVisible}
      onClose={onClose}
      title="Seleccionar categoría"
    >
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text>Cargando categorías...</Text>
        </View>
      ) : (
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 20,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  categoryIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  categoryName: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
});

export default CategorySelectionModal; 