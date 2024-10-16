<template>
  <div class="q-pa-md">
    <q-table
      flat bordered
      title="주문 관리"
      :rows="rows"
      :columns="columns.filter(col => col.visible !== false)"
      row-key="id"
      selection="single"
      :selected-rows-label="getSelectedString"
      v-model:selected="selected"
      @row-dblclick="onDbRowClick"
      :pagination="initialPagination"
    >
      <template v-slot:top-right>
        <div class="q-pa-md q-gutter-sm">
          <q-btn color="red" @click="clickDeleteCheckOut()" label="삭제" />
        </div>
      </template>
    </q-table>
  </div>
  <ModalComponent 
    v-if="showModal"
    :formData ="formData"
    :modalTitle ="modalTitle"
    @closeModal="closeModal"
    @saveModal="saveModal"
  >
  </ModalComponent>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getCheckOutAPI, deleteCheckOutAPI } from '../api/index.js';
import ModalComponent from 'src/components/modal/ModalComponent.vue'

const selected = ref([]);

// 테이블 화면 관련 변수
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
    label: 'id',
    align: 'left',
    field: row => row.id,
    visible: false
  },
  { name: '주문 제목', align: 'left', label: '주문 제목', field: 'summaryTitle', sortable: true },
  { name: '총 가격', align: 'left', label: '총 가격', field: 'totalPrice', sortable: true },
  { name: '배송상태', align: 'left', label: '배송상태', field: 'deliveryStatus', sortable: true },
  { name: '유저id', align: 'left', label: '유저id', field: 'userId', sortable: true },
  { name: '배송요청사항', align: 'left', label: '배송요청사항', field: 'request', sortable: true },
  { name: '주소1', align: 'left', label: '주소1', field: 'address1', sortable: true  },
  { name: '주소2', align: 'left', label: '주소2', field: 'address2', sortable: true  }
]

// 모달 화면 관련 변수
const formData = ref([]);
const showModal = ref(false);
const modalTitle = ref('');
const modalFlag = ref('');


// 조회 api
const getCheckOutList = async () => {
  const { response, error } = await getCheckOutAPI();
  if (error) {
    console.log('에러 발생');
    return;
  }
  
  rows.value = response.data.map(order => {
    const { address, ...rest } = order;
        return {
            ...rest,
            recipientName: address.recipientName,
            recipientPhone: address.recipientPhone,
            postalCode: address.postalCode,
            address1: address.address1,
            address2: address.address2
        };
    });
  console.log("response.data : ", response.data);
  console.log("rows.value : ", rows.value);
};

// 삭제 api
const clickDeleteCheckOut = async () => {
  const checkOutId = selected.value.map(obj => obj.id);

  const { response, error } = await deleteCheckOutAPI(checkOutId);
  if (error) {
    console.log('에러 발생');
    return;
  }
  selected.value = [];
  getCheckOutList();
};

onMounted(() => {
  getCheckOutList();
});
</script>