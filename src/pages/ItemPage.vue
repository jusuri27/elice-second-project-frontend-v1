<template>
  <div class="q-pa-md">
    <q-table
      flat bordered
      title="상품 관리"
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
          <q-btn color="primary" @click="clickCreateItem()" label="추가" />
          <q-btn color="red" @click="clickDeleteItem()" label="삭제" />
        </div>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getItemAPI, deleteItemAPI } from '../api/index.js';

// 테이블 화면 관련 변수
const selected = ref([]); // 체크박스
const rows = ref([]); // rows를 ref로 변경하여 반응형 데이터로 만듭니다.
const initialPagination = {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 10
      }
const columns = [
  {
    name: 'id',
    required: false,
    label: 'itemId',
    align: 'left',
    field: row => row.id,
    visible: false
  },
  { name: 'title', align: 'left', label: '상품명', field: 'title', sortable: true },
  { name: 'manufacturer', align: 'left', label: '제조사', field: 'manufacturer', sortable: true },
  { name: 'shortDescription', align: 'left', label: '요약설명', field: 'shortDescription', sortable: true },
  { name: 'detailDescription', align: 'left', label: '상세설명', field: 'detailDescription', sortable: true },
  { name: 'imageKey', align: 'left', label: '사진경로', field: 'imageKey', sortable: true },
  { name: 'inventory', align: 'left', label: '재고', field: 'inventory', sortable: true  },
  { name: 'price', align: 'left', label: '가격', field: 'price', sortable: true  }
];

const clickCreateItem = () => {
  const createUrl = 'http://localhost:8080/item/item-add';
  window.open(createUrl, 'popupWindow', 'width=1000,height=1200');
};

const onDbRowClick = (evt, row) => {
  const updateUrl = 'http://localhost:8080/item/edit/' + row.id;
  window.open(updateUrl, 'popupWindow', 'width=1000,height=1200');
};


// 조회 api
const getItemList = async () => {
  const { response, error } = await getItemAPI();
  if (error) {
    console.log('에러 발생');
    return;
  }

  // API로부터 받은 데이터를 rows에 반영
  rows.value = response.data;
};

// 삭제 api
const clickDeleteItem = async () => {
  const itemId = selected.value.map(obj => obj.id);

  const { response, error } = await deleteItemAPI(itemId);
  if (error) {
    console.log('에러 발생');
    return;
  }
  selected.value = [];
  getItemList();
};

// 컴포넌트가 마운트될 때 getUserList를 호출
onMounted(() => {
  getItemList();
});
</script>
