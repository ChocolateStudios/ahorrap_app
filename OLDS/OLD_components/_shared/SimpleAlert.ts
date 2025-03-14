import { Platform, Alert as NativeAlert } from 'react-native';

// export const SimpleAlert = (title: string, message: string) => {
//   if (Platform.OS === 'web') {
//     alert(`${title}\n${message}`);
//   } else {
//     NativeAlert.alert(title, message);
//   }
// };



interface AlertButton {
  text: string;
  onPress?: () => void;
  style?: "default" | "cancel" | "destructive";
}

export const SimpleAlert = (
  title: string,
  message: string,
  buttons?: AlertButton[] // Hacemos que los botones sean opcionales
) => {
  if (Platform.OS === 'web') {
    if (!buttons || buttons.length === 0) {
      // Si no se proporcionan botones, simplemente mostramos un alert simple
      alert(`${title}\n${message}`);
    } else if (buttons.length === 1) {
      // Si hay un solo botón, usamos window.confirm para emular un botón "OK"
      alert(`${title}\n${message}`);
      buttons[0].onPress?.();
    } else if (buttons.length > 1) {
      // Si hay más de un botón, usamos confirm para emular un botón "Sí" y "Cancelar"
      const result = window.confirm(`${title}\n${message}`);
      if (result) {
        buttons[0].onPress?.(); // Primer botón (por ejemplo, "Sí")
      } else {
        buttons[1].onPress?.(); // Segundo botón (por ejemplo, "Cancelar")
      }
    }
  } else {
    // Para mobile, usamos el NativeAlert de React Native
    NativeAlert.alert(
      title,
      message,
      buttons && buttons.length > 0
        ? buttons.map(button => ({
            text: button.text,
            onPress: button.onPress,
            style: button.style,
          }))
        : undefined // Si no hay botones, pasamos undefined para que use el botón por defecto "OK"
    );
  }
};
