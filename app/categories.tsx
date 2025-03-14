import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { fetchCategories, Category } from '../services/api';

export default function CategoriesScreen() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    (async () => {
      const data = await fetchCategories();
      setCategories(data);
    })();
  }, []);

  const renderCategoryItem = ({ item }: { item: Category }) => {
    return (
      <View style={styles.categoryItem}>
        <Text style={styles.categoryName}>{item.name}</Text>
        <Text style={styles.categoryType}>{item.type}</Text>
        <Text style={styles.categoryAmount}>S/ {item.amount}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryItem}
        contentContainerStyle={{ padding: 16 }}
      />
      <Button title="Add New Category" onPress={() => { /* TODO */ }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    margin: 16,
  },
  categoryItem: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryType: {
    marginVertical: 4,
  },
  categoryAmount: {
    color: '#333',
  },
});
