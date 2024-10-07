<template>
  <div>
    <button @click="getContentAList">Login</button>
  </div>
</template>

<script setup>
import { getAdminLogAPI } from '../api/adminLog/adminLog';

const getContentAList = async () => {
  const { response, error } = await getAdminLogAPI();
  if (error) {
    console.log('에러 발생');
  }
  console.log(response);

  return response.data;
};

</script>