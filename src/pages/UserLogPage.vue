<template>
  <div class="q-pa-md">
    <div>
     <q-btn color="primary" label="Primary" />
    </div>
    <q-table
      flat bordered
      title="사용자 로그"
      :rows="rows"
      :columns="columns.filter(col => col.visible !== false)"
      row-key="adminLogId"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      v-model:selected="selected"
      @row-click="onRowClick"
      :pagination="initialPagination"
    >
      <template v-slot:top-right>
        <div class="q-pa-md q-gutter-sm">
          <q-btn color="primary" label="추가" />
          <q-btn color="red" @click="changeMainView(link)" label="삭제" />
        </div>
      </template>
    </q-table>
    <div class="q-mt-md">
      Selected: {{ JSON.stringify(selected) }}
    </div>
  </div>
  <ModalComponent 
    v-if="showModal"
    :formData ="formData"
    @closeModal="closeModal"
    @saveModal="saveModal"
  >
  </ModalComponent>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getUserLogAPI } from '../api/index.js';
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
    name: 'adminLogId',
    required: false,
    label: 'adminLogId',
    align: 'left',
    field: row => row.adminLogId,
    visible: false
  },
  { name: '유저명',     align: 'left',  label: '유저명',        field: 'userName', sortable: true },
  { name: '유저IP',     align: 'left',  label: '사용자IP',      field: 'clientIp', sortable: true },
  { name: '요청경로',   align: 'left',  label: '요청경로',      field: 'requestUrl', sortable: true },
  { name: '요청메서드', align: 'left',  label: '요청메서드',    field: 'requestMethod', sortable: true },
  { name: '요청시간',   align: 'left',  label: '요청시간',      field: 'requestTime', sortable: true },
  { name: '응답상태',   align: 'left',  label: '응답상태',      field: 'responseStatus', sortable: true  },
  { name: '응답시간',   align: 'left',  label: '응답시간',      field: 'responseTime', sortable: true  }
]

// 모달 화면 관련 변수
const formData = ref([]);
const showModal = ref(false);

const onRowClick = (evt, row) => {
  console.log('clicked on', row);
  formData.value = [
      { key: 'adminLogId', value: row.adminLogId, type: 0},
      { key: 'clientIp', value: row.clientIp, label: 'Client IP', type: 'input', isDisable: false},
      { key: 'requestMethod', value: row.requestMethod, label: 'Request Method', type: 'select', options: [ '11', '22', '33', '44', '55' ], isDisable: false},
      { key: 'requestUrl', value: row.requestUrl, label: 'Request URI', type: 'input', isDisable: false},
      { key: 'responseStatus', value: row.responseStatus, label: 'Response Status', type: 'file', isDisable: false}
  ]
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const saveModal = () => {
  showModal.value = false;
  console.log("formData.value : ", formData.value);
};

const getSelectedString = () => {
  return selected.value.length === 0 ? '' : `${selected.value.length} record${selected.value.length > 1 ? 's' : ''} selected of ${rows.value.length}`
}


const getUserList = async () => {
  const { response, error } = await getUserLogAPI();
  if (error) {
    console.log('에러 발생');
    return;
  }
  // API로부터 받은 데이터를 rows에 반영
  rows.value = response.data;
};

// 컴포넌트가 마운트될 때 getUserList를 호출
onMounted(() => {
  getUserList();
});


</script>