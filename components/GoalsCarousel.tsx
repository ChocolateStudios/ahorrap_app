import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming,
  Easing,
  runOnJS
} from 'react-native-reanimated';
import { FinancialGoal } from '../types/financialGoals';

interface GoalsCarouselProps {
  goals: FinancialGoal[];
  onGoalPress?: () => void;
}

const GoalsCarousel: React.FC<GoalsCarouselProps> = ({ goals, onGoalPress }) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const screenWidth = Dimensions.get('window').width;
  const isSmallDevice = screenWidth < 375; // Detectar dispositivos pequeños
  const translateX = useSharedValue(0);
  const startX = useSharedValue(0);
  const carouselInterval = useRef<NodeJS.Timeout | null>(null);
  const isSwiping = useRef(false);
  
  // Navegar al detalle de metas
  const goToGoals = () => {
    if (onGoalPress) {
      onGoalPress();
    } else {
      router.push('/goals');
    }
  };

  // Iniciar intervalo para cambio automático
  useEffect(() => {
    startAutoRotation();
    
    return () => {
      if (carouselInterval.current) {
        clearInterval(carouselInterval.current);
      }
    };
  }, [currentIndex, goals]);

  // Función para iniciar la rotación automática
  const startAutoRotation = () => {
    if (carouselInterval.current) {
      clearInterval(carouselInterval.current);
    }
    
    if (goals.length <= 1) return;
    
    carouselInterval.current = setInterval(() => {
      if (!isSwiping.current) {
        goToNextItem();
      }
    }, 5000);
  };

  // Navegar al siguiente elemento (con transición suave)
  const goToNextItem = () => {
    const nextIndex = (currentIndex + 1) % goals.length;
    animateToIndex(nextIndex);
  };

  // Navegar al elemento anterior (con transición suave)
  const goToPrevItem = () => {
    const prevIndex = (currentIndex - 1 + goals.length) % goals.length;
    animateToIndex(prevIndex);
  };

  // Animar a un índice específico
  const animateToIndex = (index: number) => {
    // Si estamos yendo del último al primero, o del primero al último,
    // la animación debe ser inmediata sin efecto de resorte
    const isWrapping = 
      (currentIndex === goals.length - 1 && index === 0) || 
      (currentIndex === 0 && index === goals.length - 1);
    
    if (isWrapping) {
      translateX.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.cubic)
      });
    } else {
      translateX.value = withSpring(0, {
        damping: 20,
        stiffness: 90,
        mass: 0.5
      });
    }
    
    setCurrentIndex(index);
  };

  // Manejador de gestos
  const handleGestureEvent = (event: any) => {
    // BEGIN
    if (event.state === 1) {
      isSwiping.current = true;
      startX.value = translateX.value;
      
      // Detener intervalo durante el gesto
      if (carouselInterval.current) {
        clearInterval(carouselInterval.current);
      }
    } 
    // ACTIVE
    else if (event.state === 2) {
      // Permitir deslizamiento con resistencia en los extremos
      translateX.value = startX.value + event.translationX;
    } 
    // END
    else if (event.state === 4) {
      isSwiping.current = false;
      
      // Determinar dirección del swipe
      if (event.translationX > 50 || event.velocityX > 500) {
        // Swipe derecha -> anterior
        goToPrevItem();
      } else if (event.translationX < -50 || event.velocityX < -500) {
        // Swipe izquierda -> siguiente
        goToNextItem();
      } else {
        // Volver a la posición actual
        translateX.value = withSpring(0);
      }
      
      // Reiniciar intervalo
      runOnJS(startAutoRotation)();
    }
  };

  // Animación para el contenedor
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }]
    };
  });

  // Si no hay metas, mostrar contenedor vacío
  if (goals.length === 0) {
    return <View style={styles.container} />;
  }

  // Meta actual para mostrar
  const currentGoal = goals[currentIndex];
  const progress = currentGoal.currentAmount / currentGoal.targetAmount;

  return (
    <View style={[styles.container, isSmallDevice && styles.containerSmall]}>
      <GestureHandlerRootView style={styles.gestureContainer}>
        <PanGestureHandler onGestureEvent={handleGestureEvent}>
          <Animated.View style={[styles.carouselItemContainer, animatedStyle]}>
            <TouchableOpacity 
              style={styles.goalItem}
              onPress={goToGoals}
            >
              <View style={styles.goalHeaderRow}>
                <View style={[
                  styles.goalIconContainer, 
                  { backgroundColor: currentGoal.color },
                  isSmallDevice && styles.goalIconContainerSmall
                ]}>
                  <MaterialCommunityIcons 
                    name={currentGoal.icon as any} 
                    size={isSmallDevice ? 12 : 14} 
                    color="#FFF" 
                  />
                </View>
                <Text style={[styles.goalName, isSmallDevice && styles.goalNameSmall]}>
                  {currentGoal.name}
                </Text>
              </View>
              
              <Progress.Bar
                progress={progress}
                width={screenWidth * (isSmallDevice ? 0.2 : 0.25)}
                color={currentGoal.color}
                unfilledColor="#E0E0E0"
                borderWidth={0}
                height={3}
                style={styles.progressBar}
              />
            </TouchableOpacity>
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    height: 35,
    width: '70%',
  },
  containerSmall: {
    height: 30,
    width: '65%',
  },
  gestureContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselItemContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    width: '100%',
  },
  goalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    justifyContent: 'center',
  },
  goalIconContainer: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  goalIconContainerSmall: {
    width: 18,
    height: 18,
    borderRadius: 9,
    marginRight: 4,
  },
  goalName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#444',
  },
  goalNameSmall: {
    fontSize: 11,
  },
  progressBar: {
    marginBottom: 4,
  }
});

export default GoalsCarousel; 