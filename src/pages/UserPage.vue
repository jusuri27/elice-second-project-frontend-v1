<template>
  <div class="q-pa-md">
    <q-table
      flat bordered
      title="회원 관리"
      :rows="rows"
      :columns="columns.filter(col => col.visible !== false)"
      row-key="userId"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      v-model:selected="selected"
      @row-click="onRowClick"
      :pagination="initialPagination"
    >
      <template v-slot:top-right>
        <div class="q-pa-md q-gutter-sm">
          <q-btn color="red" @click="deleteUserLog()" label="삭제" />
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
import { getUserAPI } from '../api/index.js';
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
    name: 'userId',
    required: false,
    label: 'userId',
    align: 'left',
    field: row => row.userId,
    visible: false
  },
  { name: '이름', align: 'left', label: '이름', field: 'userName', sortable: true },
  { name: '아이디', align: 'left', label: '아이디', field: 'userEmail', sortable: true },
  { name: '권한', align: 'left', label: '권한', field: 'userRole', sortable: true },
  { name: '닉네임', align: 'left', label: '닉네임', field: 'userNickName', sortable: true },
  { name: '생성시간', align: 'left', label: '생성시간', field: 'createAt', sortable: true },
  { name: '수정시간', align: 'left', label: '수정시간', field: 'updateAt', sortable: true  }
]

// 모달 화면 관련 변수
const formData = ref([]);
const showModal = ref(false);
const modalTitle = ref('');
const modalFlag = ref('');

const getSelectedString = () => {
  return selected.value.length === 0 ? '' : `${selected.value.length} record${selected.value.length > 1 ? 's' : ''} selected of ${rows.value.length}`
}

const onRowClick = (evt, row) => {
  console.log('clicked on', row);
  formData.value = [
      { key: 'userId', value: row.userId, type: 0},
      { key: 'clientIp', value: row.clientIp, label: 'Client IP', type: 'input', isDisable: false},
      { key: 'requestMethod', value: row.requestMethod, label: 'Request Method', type: 'select', options: [ '11', '22', '33', '44', '55' ], isDisable: false},
      { key: 'requestUrl', value: row.requestUrl, label: 'Request URI', type: 'input', isDisable: false},
      { key: 'responseStatus', value: row.responseStatus, label: 'Response Status', type: 'file', isDisable: false}
  ];
  modalTitle.value = '사용자 로그 수정';
  showModal.value = true;
  modalFlag.value = 'update';
};

const closeModal = () => {
  showModal.value = false;
};

// 조회 api
const getUserList = async () => {
  const { response, error } = await getUserAPI();
  if (error) {
    console.log('에러 발생');
    return;
  }
  console.log("response.data : ", response.data);
  // API로부터 받은 데이터를 rows에 반영
  rows.value = response.data;
};

// 수정 api
const saveModal = async () => {
  const params = {};

  // dto에 맞게 데이터 가공
  formData.value.forEach(item => {
    params[item.key] = item.value;
  });

  console.log('params : ', params);

  if (modalFlag.value == 'update') {
    const { response, error } = await updateUserLogAPI(params);
    if (error) {
      console.log('수정 에러 발생');
      return;
    }
  }

  selected.value = [];
  getUserList();
  showModal.value = false;
};

// 삭제 api
const deleteUserLog = async () => {
  const userIds = selected.value.map(obj => obj.userId);
  console.log("selected.value : ", selected.value);
  console.log("userIds : ", userIds);

  const { response, error } = await deleteUserLogAPI(userIds);
  if (error) {
    console.log('에러 발생');
    return;
  }
  selected.value = [];
  getUserList();
};

onMounted(() => {
  getUserList();
});


</script>