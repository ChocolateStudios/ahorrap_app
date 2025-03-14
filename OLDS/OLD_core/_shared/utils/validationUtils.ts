import { ValidationResponse } from "../responses/ValidationResponse";

export const validateUsername = (username: string): ValidationResponse => {
    const re = /\S+@\S+\.\S+/;
    let errorMessage = '';
    let isValid = true;

    if (!re.test(username)) {
        errorMessage = 'Por favor, ingresa un correo electrónico válido';
        isValid = false;
    }
    
    return { isValid, errorMessage }
};

export const validatePassword = (password: string): ValidationResponse => {
    let errorMessage = '';
    let isValid = true;

    if (password.length < 8) {
        errorMessage = 'La contraseña debe tener al menos 8 caracteres';
        isValid = false;
    }
    if (!/[A-Z]/.test(password)) {
        errorMessage = 'La contraseña debe contener al menos una letra mayúscula';
        isValid = false;
    }
    if (!/[a-z]/.test(password)) {
        errorMessage = 'La contraseña debe contener al menos una letra minúscula';
        isValid = false;
    }
    if (!/[0-9]/.test(password)) {
        errorMessage = 'La contraseña debe contener al menos un número';
        isValid = false;
    }
    
    return { isValid, errorMessage }
};