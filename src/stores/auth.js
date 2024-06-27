import { defineStore } from 'pinia';
import { ref, computed, onMounted } from 'vue';
import { useFirebaseAuth } from 'vuefire';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
    const auth = useFirebaseAuth();
    const authUser = ref(null);

    const router = useRouter();

    const errorMessage = ref('');
    const errorCodes = {
        'auth/invalid-credential': 'Credenciales inválidas',
        'auth/too-many-requests': 'Denegado por límite de intentos',
    }

    const hasError = computed(() => errorMessage.value !== '');
    const isAuthenticated = computed(() => authUser.value !== null);

    onMounted(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                authUser.value = user;
            }
        })
    })

    const login = ({ email, password }) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const { user } = userCredential;
                authUser.value = user;
                router.push({ name: 'admin-properties' });
            })
            .catch((error) => {
                errorMessage.value = errorCodes[error.code];
            });
    }

    const logout = () => {
        signOut(auth)
            .then(() => {
                authUser.value = null;
                router.push({ name: 'home' });
            })
            .catch((error) => {
                errorMessage.value = errorCodes[error.code];
            });
    }

    return {
        hasError,
        errorMessage,
        isAuthenticated,
        login,
        logout
    }
})