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
          <q-btn color="secondary" @click="clickExcelDownload()" label="엑셀" />
          <q-btn color="primary" @click="clickCreateCategory()" label="추가" />
          <q-btn color="red" @click="clickDeleteCategory()" label="삭제" />
        </div>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getCategoryAPI, deleteCategoryAPI, categoryExcelDownloadAPI } from '../api/index.js';

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
  { name: 'title', align: 'left', label: '카테고리 제목', field: 'title', sortable: true },
  { name: 'description', align: 'left', label: '카테고리 설명', field: 'description', sortable: true },
  { name: 'imageUrl', align: 'left', label: '이미지', field: 'imageUrl', sortable: true },
  { name: 'themeClass', align: 'left', label: '테마', field: 'themeClass', sortable: true },
];

const clickCreateCategory = () => {
  const createUrl = 'http://localhost:8080/category/add';
  window.open(createUrl, 'popupWindow', 'width=1000,height=1200');
};

const onDbRowClick = (evt, row) => {
  const updateUrl = 'http://localhost:8080/categorie/' + row.id;
  console.log('updateUrl : ', updateUrl);
  window.open(updateUrl, 'popupWindow', 'width=1000,height=1200');
};


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

// 삭제 api
const clickDeleteCategory = async () => {
  const categoryId = selected.value.map(obj => obj.id);

  const { response, error } = await deleteCategoryAPI(categoryId);
  if (error) {
    console.log('에러 발생');
    return;
  }
  selected.value = [];
  getCategoryList();
};

// 엑셀 저장
const clickExcelDownload = async () => {
  const params = rows.value;

  const { response, error } = await categoryExcelDownloadAPI(params);
  if (error) {
    console.log('에러 발생');
    return;
  }

  // Blob을 사용하여 파일 다운로드
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'shoux-kream.xlsx'); // 다운로드할 파일 이름
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link); // 링크 요소 제거
  
  getCategoryList();
};

onMounted(() => {
  getCategoryList();
});
</script>
