import { ListFooter } from "@/components/_shared/ListFooter";
import { SimpleAlert } from "@/components/_shared/SimpleAlert";
import CreateExpenseModal from "@/components/expenses/CreateExpenseModal";
import { ExpenseListItem } from "@/components/expenses/ExpenseListItem";
import { Expense } from "@/core/expenses/models/Expense";
import { GetAllExpensesUseCase } from "@/core/expenses/usecases/GetAllExpensesUseCase";
import { LogoutUserUseCase } from "@/core/users/usecases/LogoutUserUseCase";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [isAddExpenseVisible, setIsAddExpenseVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const getAllExpensesUseCase = new GetAllExpensesUseCase();
  const logoutUserUseCase = new LogoutUserUseCase();

  // Simular la carga de datos
  const loadMoreExpenses = useCallback(async () => {
    setLoading(true);
    const response = await getAllExpensesUseCase.getAllExpenses();
    setLoading(false);

    if (!response.success) {
      SimpleAlert('Error', response.alertErrorMessage);
      return;
    }

    setExpenses(prevExpenses => {
      const allExpenses = [...prevExpenses, ...response.expenses]
      return allExpenses.sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime());
    });
    setTotalExpenses(prevTotal => prevTotal + response.expenses.reduce((sum, expense) => sum + expense.amount, 0));
  }, [expenses.length]);


  React.useEffect(() => {
    loadMoreExpenses();
  }, []);

  const handleLogout = () => {
    SimpleAlert(
      "Cerrar Sesión",
      "¿Estás seguro que deseas cerrar sesión?",
      [
        {
          text: "Sí, cerrar sesión",
          onPress: () => {
            const response = logoutUserUseCase.logoutUser();

            if (!response.success) {
              SimpleAlert('Error', response.alertErrorMessage);
            }

            router.push('/login');
          }
        },
        {
          text: "Cancelar",
          style: "cancel"
        }
      ]
    );
  };

  const handleAddExpense = () => {
    setIsAddExpenseVisible(true);
  };


  return (
    <LinearGradient colors={['#ffffff', '#e6f7e6']} style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Total de Gastos</Text>
        <Text style={styles.headerAmount}>S/. {totalExpenses.toFixed(2)}</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={expenses}
        renderItem={({ item }) => <ExpenseListItem item={item} />}
        keyExtractor={item => item.id.toString()}
        //   onEndReached={loadMoreExpenses}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() => <ListFooter loading={loading} />}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddExpense}>
        <Ionicons name="add" size={30} color="#FFFFFF" />
      </TouchableOpacity>

      <CreateExpenseModal 
        isVisible={isAddExpenseVisible} 
        setIsVisible={setIsAddExpenseVisible} 
        setExpenses={setExpenses} 
        setTotalExpenses={setTotalExpenses} 
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  headerAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 10,
  },
  logoutButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  expenseDetails: {
    flex: 1,
  },
  expenseDescription: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  expenseDate: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  loaderContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#4CAF50',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});