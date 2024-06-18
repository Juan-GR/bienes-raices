<script setup>
  import { useForm, useField } from 'vee-validate';
  import { loginSchema as validationSchema } from '../validation/loginSchema';

  const { handleSubmit } = useForm({ validationSchema });
  const email = useField('email');
  const password = useField('password');

  const submit = handleSubmit(() => {

  });

</script>

<template>
  <v-card
    flat
    max-width="600"
    class="mx-auto"
  >
    <v-card-title
      class="text-center text-h4 font-weight-bold"
      tag="h3"
    >
      Iniciar Sesión
    </v-card-title>
    <v-card-subtitle
      class="text-h5 text-center"
    >
      Iniciar sesión con tu cuenta
    </v-card-subtitle>

    <v-form class="mt-5">
      <v-text-field
        class="mb-5"
        label="Email"
        type="email"
        bg-color="grey-darken-3"
        v-model="email.value.value"
        :error-messages="email.errorMessage.value"
      />
      <v-text-field
        class="mb-5"
        label="Contraseña"
        type="password"
        bg-color="grey-darken-3"
        v-model="password.value.value"
        :error-messages="password.errorMessage.value"
      />
      <v-btn
        block
        color="light-blue-accent-4"
        @click="submit"
      >
        Iniciar Sesión
      </v-btn>
    </v-form>
  </v-card>
</template>
