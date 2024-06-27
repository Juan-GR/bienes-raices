<script setup>
  import { useForm, useField } from 'vee-validate';
  import { validationSchema, imageSchema } from '@/validation/propertySchema.js';
  import router from '@/router/index.js';
  import { collection, addDoc } from "firebase/firestore";
  import { useFirestore } from 'vuefire';

  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const db = useFirestore();

  const { handleSubmit } = useForm({
    validationSchema: {
      ...validationSchema,
      ...imageSchema
    }
  });

  const title = useField('title');
  const price = useField('price');
  const image = useField('image');
  const rooms = useField('rooms');
  const wc = useField('wc');
  const parking = useField('parking');
  const description = useField('description');
  const pool = useField('pool', null, { initialValue: false });

  const onSubmit = handleSubmit(async values => {
    const { image, ...property } = values;
    const docRef = await addDoc(collection(db, "properties"), {
      ...property
    });

    if (docRef.id) {
      router.push({ name: 'admin-properties' });
    }
  });
</script>

<template>
  <v-card max-width="800" class="mx-auto my-10" flat>
    <v-card-title
        class="text-h4 font-weight-bold"
        tag="h3"
    >
      Nueva Propiedad
    </v-card-title>
    <v-card-subtitle
        class="text-h5"
    >
      Crea una nueva propiedad en el sistema
    </v-card-subtitle>

    <v-form class="mt-10">
      <v-text-field
        class="mb-5"
        label="Título de la propiedad"
        v-model="title.value.value"
        :error-messages="title.errorMessage.value"
      />
      <v-file-input
        accept="image/*"
        class="mb-5"
        label="Imagen de la propiedad"
        prepend-icon="mdi-camera"
        v-model="image.value.value"
        :error-messages="image.errorMessage.value"
      />
      <v-text-field
        class="mb-5"
        label="Precio"
        v-model="price.value.value"
        :error-messages="price.errorMessage.value"
      />
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-select
            class="mb-5"
            label="Habitaciones"
            :items="items"
            v-model="rooms.value.value"
            :error-messages="rooms.errorMessage.value"
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-select
            class="mb-5"
            label="Cuartos de baño"
            :items="items"
            v-model="wc.value.value"
            :error-messages="wc.errorMessage.value"
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-select
            class="mb-5"
            label="Plazas de garaje"
            :items="items"
            v-model="parking.value.value"
            :error-messages="parking.errorMessage.value"
          />
        </v-col>
      </v-row>
      <v-textarea
          class="mb-5"
          label="Descripción de la propiedad"
          v-model="description.value.value"
          :error-messages="description.errorMessage.value"
      />
      <v-checkbox label="Dispone de piscina" v-model="pool.value.value"/>
      <v-btn color="primary" block @click="onSubmit">Agregar propiedad</v-btn>
    </v-form>
  </v-card>
</template>