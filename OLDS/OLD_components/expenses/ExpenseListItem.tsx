import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Expense } from "@/core/expenses/models/Expense";

// Tipo para los items de gasto
// export type ExpenseItem = {
//     id: string;
//     amount: number;
//     description: string;
//     date: Date;
// };

// Componente para renderizar cada item de gasto
export const ExpenseListItem = React.memo(({ item }: { item: Expense }) => (
    <View style={styles.expenseItem}>
        <View style={styles.expenseDetails}>
            <Text style={styles.expenseDescription}>{item.description}</Text>
            <Text style={styles.expenseDate}>
                {format(item.dateTime, "d 'de' MMMM, yyyy hh:mm a", { locale: es })}
            </Text>
        </View>
        <Text style={styles.expenseAmount}>S/. {item.amount.toFixed(2)}</Text>
    </View>
));

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
});