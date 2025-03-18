import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSpring, 
  interpolate,
  Extrapolation,
  useAnimatedGestureHandler,
  runOnJS
} from 'react-native-reanimated';

// Components
import IconButton from '../components/IconButton';
import GoalsCarousel from '../components/GoalsCarousel';
import BalanceCard from '../components/BalanceCard';
import DailyBudgetCard from '../components/DailyBudgetCard';
import SwipeHint from '../components/SwipeHint';
import AddTransactionModal from '../components/AddTransactionModal';

// Services and utils
import { fetchGoals, Goal, saveMovement } from '../services/api';
import { mockFinancialGoals } from '../services/mockData';
import { fetchRecentMovements, Movement } from '../services/api';

export default function HomeScreen() {
  const router = useRouter();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [recentMovements, setRecentMovements] = useState<Movement[]>([]);
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  
  // Animated values
  const translateY = useSharedValue(0);
  const homeCardZIndex = useSharedValue(2);
  
  const [isAddTransactionModalVisible, setIsAddTransactionModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    (async () => {
      // Cargar datos en paralelo
      const [goalsData, movementsData] = await Promise.all([
        fetchGoals(),
        fetchRecentMovements()
      ]);
      
      setGoals(goalsData);
      setRecentMovements(movementsData);
    })();
  }, []);

  // Navigation functions
  const handlePressDailyBudget = () => router.push('/budget-daily');
  const goToGoals = () => router.push('/goals');
  const goToCategories = () => router.push('/categories');
  const goToRecentMovements = () => router.push('/recent-movements');
  const handleAddTransaction = async (transaction: {
    type: 'ingreso' | 'gasto';
    amount: number;
    description: string;
    category: string;
    date: string;
  }) => {
    try {
      setIsLoading(true);
      
      // Convertir tipo de transacción al formato de la API
      const apiType = transaction.type === 'ingreso' ? 'income' : 'expense';
      
      // Llamar a la API para guardar la transacción
      const newMovement = await saveMovement({
        description: transaction.description,
        category: transaction.category,
        amount: transaction.amount,
        type: apiType,
        date: transaction.date.split('/').reverse().join('-'), // Convertir DD/MM/YYYY a YYYY-MM-DD
      });
      
      console.log('Transacción guardada:', newMovement);
      // Aquí podrías actualizar algún estado local o mostrar una notificación de éxito
      
    } catch (error) {
      console.error('Error al guardar la transacción:', error);
      // Aquí podrías mostrar una notificación de error
    } finally {
      setIsLoading(false);
      setIsAddTransactionModalVisible(false);
    }
  };

  const openAddTransactionModal = () => {
    setIsAddTransactionModalVisible(true);
  };

  // Reemplazar la implementación de onGestureEvent con useAnimatedGestureHandler
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context: any) => {
      // Guardar el valor inicial de translateY al comenzar el gesto
      context.startY = translateY.value;
    },
    onActive: (event, context) => {
      // Hacer el gesto más responsivo aplicando un factor de amplificación
      const amplifiedTranslation = event.translationY * 1.2;
      
      if (amplifiedTranslation < 0) {
        // Calcular el nuevo valor de translateY
        const newTranslateY = context.startY + amplifiedTranslation;
        // Limitar el arrastre para que no vaya más allá de cierto punto
        const maxTranslation = -screenHeight * 0.8;
        translateY.value = Math.max(newTranslateY, maxTranslation);
      }
    },
    onEnd: (event) => {
      // Hacer el umbral más pequeño para que sea más fácil navegar
      if (event.translationY < -screenHeight * 0.2 || event.velocityY < -800) {
        // Navegar a la pantalla de movimientos recientes
        runOnJS(goToRecentMovements)();
      } 
      // Si no, volver a la posición inicial
      else {
        translateY.value = withSpring(0, {
          damping: 18,
          stiffness: 150,
          mass: 1,
          overshootClamping: false,
        });
      }
    }
  });

  // Estilo animado para la tarjeta principal (Home)
  const homeCardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY.value },
      ],
      borderRadius: interpolate(
        Math.abs(translateY.value),
        [0, 50],
        [0, 20],
        { extrapolateRight: Extrapolation.CLAMP }
      ),
      shadowOpacity: interpolate(
        Math.abs(translateY.value),
        [0, 50],
        [0.1, 0.5],
        { extrapolateRight: Extrapolation.CLAMP }
      ),
      shadowRadius: interpolate(
        Math.abs(translateY.value),
        [0, 50],
        [5, 15],
        { extrapolateRight: Extrapolation.CLAMP }
      ),
      zIndex: homeCardZIndex.value
    };
  });

  // Estilo para la tarjeta inferior (Recent Movements)
  const lowerCardStyle = useAnimatedStyle(() => {
    // La opacidad aumenta a medida que la tarjeta superior se desliza
    const opacity = interpolate(
      Math.abs(translateY.value),
      [0, 100],
      [0.8, 1],
      { extrapolateRight: Extrapolation.CLAMP }
    );
    
    // Añadir un poco de escala inversa para dar sensación de profundidad
    // La tarjeta inferior parece "crecer" ligeramente conforme se revela
    return {
      opacity,
      transform: [
        { scale: interpolate(
          Math.abs(translateY.value),
          [0, 100],
          [0.95, 1],
          { extrapolateRight: Extrapolation.CLAMP }
        )},
        // Añadir un poco de desplazamiento para un efecto 3D
        { translateY: interpolate(
          Math.abs(translateY.value),
          [0, 100],
          [20, 0],
          { extrapolateRight: Extrapolation.CLAMP }
        )}
      ],
      zIndex: 1
    };
  });

  return (
    <GestureHandlerRootView style={styles.root}>
      {/* Tarjeta inferior (Recent Movements) */}
      <Animated.View style={[styles.lowerCard, lowerCardStyle]}>
        <View style={styles.lowerCardContent}>
          <Text style={styles.lowerCardTitle}>Movimientos Recientes</Text>
          {recentMovements.slice(0, 3).map((movement, index) => (
            <View key={movement.id} style={styles.movementItem}>
              <View style={styles.movementInfo}>
                <Text style={styles.movementDescription}>{movement.description}</Text>
                <Text style={styles.movementCategory}>{movement.category}</Text>
              </View>
              <Text 
                style={[
                  styles.movementAmount, 
                  { color: movement.type === 'income' ? '#4CAF50' : '#F44336' }
                ]}
              >
                {movement.type === 'income' ? '+' : '-'} S/ {movement.amount.toFixed(2)}
              </Text>
            </View>
          ))}
          <View style={styles.viewMoreContainer}>
            <Text style={styles.viewMoreText}>Ver todos los movimientos...</Text>
          </View>
        </View>
      </Animated.View>
      
      {/* Tarjeta principal (Home) - Cambiar onGestureEvent a gestureHandler */}
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.homeCard, homeCardStyle]}>
          <View style={styles.dragIndicator} />
          <View style={styles.header}>
            <IconButton 
              iconName="person-outline" 
              onPress={() => {}}
            />
                      
            <GoalsCarousel goals={mockFinancialGoals} onGoalPress={goToGoals} />
                      
            <IconButton 
              iconName="notifications-outline" 
              badgeCount={2}
              onPress={() => {}}
            />
          </View>
          
          <BalanceCard balance="S/ 2,100.00" />
          
          <DailyBudgetCard
            currentAmount={31.5}
            totalAmount={103.13}
            onPress={handlePressDailyBudget}
          />
          
          <SwipeHint />
          
          <TouchableOpacity 
            style={styles.floatingButton}
            onPress={openAddTransactionModal}
          >
            <Ionicons name="add" size={28} color="white" />
          </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>
      
      <AddTransactionModal
        isVisible={isAddTransactionModalVisible}
        onClose={() => setIsAddTransactionModalVisible(false)}
        onSave={handleAddTransaction}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#e8ecef',
  },
  homeCard: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    paddingTop: 30,
    paddingHorizontal: 5,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowRadius: 10,
    elevation: 3,
  },
  lowerCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  lowerCardContent: {
    flex: 1,
    paddingTop: 40,
  },
  lowerCardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  movementItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  movementInfo: {
    flex: 1,
  },
  movementDescription: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  movementCategory: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
  movementAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  viewMoreContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  viewMoreText: {
    fontSize: 16,
    color: '#22A9A2',
    fontWeight: '500',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 15,
    marginBottom: 30,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#22A9A2',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  dragIndicator: {
    width: 40,
    height: 5,
    backgroundColor: '#ddd',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
});
