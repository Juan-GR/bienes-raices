<script setup>
  import { RouterView } from 'vue-router';
  import { useAuthStore } from './stores/auth';

  const authStore = useAuthStore();
</script>

<template>
  <v-card
    elevation="4"
    max-width="1200"
    class="mx-auto"
  >
    <v-layout>
      <v-app-bar color="grey-darken-4">
        <template v-slot:prepend>
          <v-btn
            :to="{ name: 'home' }"
          >
            Bienes Raices - VUEFIRE
          </v-btn>
        </template>
        <template v-slot:append>
          <div v-if="authStore.isAuthenticated">
            <v-btn :to="{ name: 'admin-properties' }">Admin</v-btn>
            <v-btn @click="authStore.logout()">Cerrar Sesión</v-btn>
          </div>
          <div v-else>
            <v-btn :to="{ name: 'home' }">Inicio</v-btn>
            <v-btn :to="{ name: 'login' }">Iniciar Sesión</v-btn>
          </div>
        </template>
      </v-app-bar>
      <v-main>
        <v-container>
          <RouterView />
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>
