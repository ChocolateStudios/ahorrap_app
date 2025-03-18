import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BaseModal from './BaseModal';

interface DatePickerModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelectDate: (date: Date) => void;
  initialDate?: Date;
}

const DatePickerModal: React.FC<DatePickerModalProps> = ({
  isVisible,
  onClose,
  onSelectDate,
  initialDate = new Date(),
}) => {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth());
  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear());

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const daysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getDaysArray = () => {
    const days = [];
    const totalDays = daysInMonth(currentMonth, currentYear);
    
    // Calcular el día de la semana del primer día del mes (0-6, donde 0 es Domingo)
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    
    // Añadir espacios vacíos para alinear el primer día correctamente
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: 0, isCurrentMonth: false });
    }
    
    // Añadir los días del mes actual
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(currentYear, currentMonth, i);
      const today = new Date();
      const isToday = date.getDate() === today.getDate() && 
                     date.getMonth() === today.getMonth() && 
                     date.getFullYear() === today.getFullYear();
      
      const isSelected = date.getDate() === selectedDate.getDate() && 
                         date.getMonth() === selectedDate.getMonth() && 
                         date.getFullYear() === selectedDate.getFullYear();
      
      days.push({ 
        day: i, 
        isCurrentMonth: true,
        isToday,
        isSelected,
        date
      });
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
  };

  const handleConfirm = () => {
    onSelectDate(selectedDate);
    onClose();
  };

  const renderDay = ({ item }: { item: any }) => {
    if (!item.isCurrentMonth) {
      return <View style={styles.emptyDay} />;
    }

    return (
      <TouchableOpacity
        style={[
          styles.dayItem,
          item.isToday && styles.todayItem,
          item.isSelected && styles.selectedItem,
        ]}
        onPress={() => handleSelectDate(item.date)}
      >
        <Text 
          style={[
            styles.dayText,
            item.isToday && styles.todayText,
            item.isSelected && styles.selectedText,
          ]}
        >
          {item.day}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderFooter = () => (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <BaseModal
      isVisible={isVisible}
      onClose={onClose}
      title="Seleccionar fecha"
      footer={renderFooter()}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.navButton} 
            onPress={() => navigateMonth('prev')}
          >
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
          
          <Text style={styles.monthYearText}>
            {monthNames[currentMonth]} {currentYear}
          </Text>
          
          <TouchableOpacity 
            style={styles.navButton} 
            onPress={() => navigateMonth('next')}
          >
            <Ionicons name="chevron-forward" size={24} color="#333" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.daysOfWeek}>
          <Text style={styles.dayOfWeekText}>Dom</Text>
          <Text style={styles.dayOfWeekText}>Lun</Text>
          <Text style={styles.dayOfWeekText}>Mar</Text>
          <Text style={styles.dayOfWeekText}>Mié</Text>
          <Text style={styles.dayOfWeekText}>Jue</Text>
          <Text style={styles.dayOfWeekText}>Vie</Text>
          <Text style={styles.dayOfWeekText}>Sáb</Text>
        </View>
        
        <FlatList
          data={getDaysArray()}
          renderItem={renderDay}
          keyExtractor={(item, index) => index.toString()}
          numColumns={7}
          scrollEnabled={false}
        />
      </View>
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  navButton: {
    padding: 5,
  },
  monthYearText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  daysOfWeek: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  dayOfWeekText: {
    width: 40,
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
  },
  emptyDay: {
    width: 40,
    height: 40,
    margin: 2,
  },
  dayItem: {
    width: 40,
    height: 40,
    margin: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  todayItem: {
    backgroundColor: '#e0e0e0',
  },
  selectedItem: {
    backgroundColor: '#22A9A2',
  },
  dayText: {
    fontSize: 16,
    color: '#333',
  },
  todayText: {
    fontWeight: 'bold',
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  cancelButton: {
    padding: 10,
    marginRight: 10,
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#22A9A2',
    padding: 10,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default DatePickerModal; 