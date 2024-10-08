<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">??? 수정 </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
                filled
                v-model="name"
                label="Your name *"
                hint="Name and surname"
                lazy-rules
            />

            <q-input
                filled
                type="number"
                v-model="age"
                label="Your age *"
            />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" @click="$emit('closeModal')" v-close-popup />
          <q-btn flat label="Save" @click="$emit('closeModal')" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue'

const emit = defineEmits([
  'closeModal'
]);

const prompt = ref(true);

</script>
