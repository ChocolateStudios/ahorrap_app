import { LogoutUserUseCase } from "@/core/users/usecases/LogoutUserUseCase";
import { SimpleAlert } from "../_shared/SimpleAlert";
import { router } from "expo-router";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function LogoutBtn() {
    const logoutUserUseCase = new LogoutUserUseCase();

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

    return (
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#4CAF50" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    logoutButton: {
      position: 'absolute',
      top: 20,
      right: 20,
    },
  });