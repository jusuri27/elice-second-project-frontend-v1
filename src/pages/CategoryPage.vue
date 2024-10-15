<template>
  <div class="q-pa-md">
    <q-table
      flat bordered
      title="카테고리 관리"
      :rows="rows"
      :columns="columns.filter(col => col.visible !== false)"
      row-key="id"
      :selected-rows-label="getSelectedString"
      selection="single"
      v-model:selected="selected"
      @row-dblclick="onDbRowClick"
      :pagination="initialPagination"
    >
      <template v-slot:top-right>
        <div class="q-pa-md q-gutter-sm">
          <q-btn color="primary" @click="clickCreateCategory()" label="추가" />
          <q-btn color="red" @click="clickDeleteCategory()" label="삭제" />
        </div>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getCategoryAPI } from '../api/index.js';

const selected = ref([]); // 체크박스
const rows = ref([]); // rows를 ref로 변경하여 반응형 데이터로 만듭니다.
const initialPagination = {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 10
};
const columns = [
  {
    name: 'id',
    required: false,
    label: 'categoryId',
    align: 'left',
    field: row => row.id,
    visible: false
  },
  { name: 'name', align: 'left', label: '카테고리명', field: 'name', sortable: true }
];

// TODO 경로 정해지면 수정해야됌
const clickCreateCategory = () => {
  const createUrl = 'http://localhost:8080/categorie-add';
  window.open(createUrl, 'popupWindow', 'width=1000,height=1200');
};

// TODO 경로 정해지면 수정해야됌
const onDbRowClick = (evt, row) => {
  const updateUrl = 'http://localhost:8080/categorie/' + row.id;
  console.log('updateUrl : ', updateUrl);
  window.open(updateUrl, 'popupWindow', 'width=1000,height=1200');
};

// TODO 삭제 어떻게 해야될지 확인 필요

// 조회 api
const getCategoryList = async () => {
  const { response, error } = await getCategoryAPI();
  if (error) {
    console.log('에러 발생');
    return;
  }
  console.log('response.data : ', response.data);
  rows.value = response.data;
};

onMounted(() => {
  getCategoryList();
});
</script>
