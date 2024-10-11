<template>
  <q-layout view="lHh Lpr lFf">
    <!-- TODO : 시간남으면 header 분리 -->
    <q-header elevated style="width: 100%; left: 0px;">
      <q-toolbar>
        <!-- <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        /> -->

        <q-toolbar-title>
          Shoux Kream
        </q-toolbar-title>
        
      </q-toolbar>
    </q-header>

    <!-- TODO : 시간남으면 sidebar 분리 -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      style="margin-top: 50px;"
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
          @click="changeMainView(link)"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <component :is="currentView" />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

import UserLog from 'pages/UserLogPage.vue'
import Category from 'pages/Category.vue'
import Item from 'pages/Item.vue'

defineOptions({
  name: 'MainLayout'
})

const linksList = [
  {
    title: '주문관리',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'    
  },
  {
    title: '회원관리',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: '카테고리 추가',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev',
    component: Category
  },
  {
    title: '상품 추가',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev',
    component: Item
  },
  {
    title: '사용자 로그',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev',
    component: UserLog
  }
]

const leftDrawerOpen = ref(false)
const currentView = ref(linksList[4].component) // 기본값을 첫 번째 컴포넌트로 설정

function toggleLeftDrawer () {
  // leftDrawerOpen.value = !leftDrawerOpen.value
}

function changeMainView(link) {
  currentView.value = link.component
  leftDrawerOpen.value = true
}

// localhost:8080에서 관리자 버튼 클릭시 토큰값 넘겨받고 url에 남아있는 토큰 내용 삭제
// url에 토큰 내용을 삭제했기 때문에 새로고침시 url에 토큰값이 있을때만 세션스토리지에 저장
const urlParams = new URLSearchParams(window.location.search);
const tokenFromUrl = urlParams.get('token');
const tokenFromSession = sessionStorage.getItem('accessToken');

if (tokenFromUrl) {
  sessionStorage.setItem('accessToken', tokenFromUrl);
}

urlParams.delete('token');
const newUrl = window.location.pathname + '?' + urlParams.toString();
window.history.replaceState({}, document.title, newUrl);

</script>
