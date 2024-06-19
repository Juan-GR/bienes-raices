import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useFirebaseAuth } from 'vuefire';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const useAuthStore = defineStore('auth', () => {
    const auth = useFirebaseAuth();
    const authUser = ref({})

    const errorMessage = ref('');
    const errorCodes = {
        'auth/invalid-credential': 'Credenciales inválidas',
        'auth/too-many-requests': 'Denegado por límite de intentos',
    }

    const hasError = computed(() => errorMessage.value !== '');

    const login = ({ email, password }) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const { user } = userCredential;
                authUser.value = user;
            })
            .catch((error) => {
                errorMessage.value = errorCodes[error.code];
            });
    }

    return {
        login,
        hasError,
        errorMessage
    }
})