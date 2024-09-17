import { format } from "date-fns";
import React, { useState } from "react";
import { Modal, Platform, TextInput, TouchableOpacity, View, Text, StyleSheet, ActivityIndicator } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { es } from "date-fns/locale";
import { Ionicons } from "@expo/vector-icons";
import { SimpleAlert } from "../_shared/SimpleAlert";
import { SaveExpenseResource } from "@/core/expenses/resources/SaveExpenseResource";
import { CreateExpenseUseCase } from "@/core/expenses/usecases/CreateExpenseUseCase";

export default function CreateExpenseModal({ isVisible, setIsVisible, setExpenses, setTotalExpenses }: any) {
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const createExpenseUseCase = new CreateExpenseUseCase();

    const handleCreateExpense = async () => {
        if (!amount || !description) {
            SimpleAlert('Error', 'Por favor, completa todos los campos');
            return;
        }

        const newExpense: SaveExpenseResource = {
            amount: parseFloat(amount),
            description,
            dateTime: date,
        };

        console.log(newExpense);
        setLoading(true);

        const response = await createExpenseUseCase.createExpense(newExpense);
        
        if (!response.success) {
            SimpleAlert('Error', response.alertErrorMessage);
            return;
        }

        setExpenses((prevExpenses: any) => [response.expense, ...prevExpenses]);
        setTotalExpenses((prevTotal: number) => prevTotal + response.expense!.amount);
        setIsVisible(false);
        setAmount('');
        setDescription('');
        setDate(new Date());
        setLoading(false);
    };

    const onChangeDatePicker = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const onChangeTimePicker = (event: any, selectedTime?: Date) => {
        const currentTime = selectedTime || date;
        setShowTimePicker(Platform.OS === 'ios');
        setDate(currentTime);
    };


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => setIsVisible(false)}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Agregar Gasto</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Monto"
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={setAmount}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Descripción"
                        value={description}
                        onChangeText={setDescription}
                    />
                    <TouchableOpacity style={styles.dateTimeButton} onPress={() => setShowDatePicker(true)}>
                        <Text>{format(date, "d 'de' MMMM, yyyy", { locale: es })}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dateTimeButton} onPress={() => setShowTimePicker(true)}>
                        <Text>{format(date, "HH:mm", { locale: es })}</Text>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={onChangeDatePicker}
                        />
                    )}
                    {showTimePicker && (
                        <DateTimePicker
                            value={date}
                            mode="time"
                            display="default"
                            onChange={onChangeTimePicker}
                        />
                    )}
                    <TouchableOpacity style={styles.createButton} onPress={handleCreateExpense}>
                        <Text style={styles.createButtonText}>Crear</Text>
                    </TouchableOpacity>

                    {loading && <ActivityIndicator size="large" style={styles.loadingIndicator} />}

                    <TouchableOpacity style={styles.closeButton} onPress={() => setIsVisible(false)}>
                        <Ionicons name="close" size={24} color="#4CAF50" />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#4CAF50',
    },
    input: {
        height: 40,
        borderColor: '#4CAF50',
        borderWidth: 1,
        borderRadius: 5,
        width: '100%',
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    dateTimeButton: {
        height: 40,
        borderColor: '#4CAF50',
        borderWidth: 1,
        borderRadius: 5,
        width: '100%',
        marginBottom: 15,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    createButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        marginTop: 10,
    },
    createButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    closeButton: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    loadingIndicator: {
      marginTop: 20,
    },
});