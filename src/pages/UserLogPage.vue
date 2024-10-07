<template>
  <div>
    <button @click="getUserList">Login</button>
  </div>
</template>

<script setup>
import { getUserLogAPI } from '../api/userLog/userLog';

const getUserList = async () => {
  const { response, error } = await getUserLogAPI();
  if (error) {
    console.log('에러 발생');
  }
  console.log(response);

  return response.data;
};

</script>