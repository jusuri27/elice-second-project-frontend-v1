<template>
    <q-select 
        filled 
        v-model="data.value"
        :label="data.label"
        :options="data.options"
        :disable="data.isDisable"
    />
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  item: Object
});

const data = ref(props.item);
</script>