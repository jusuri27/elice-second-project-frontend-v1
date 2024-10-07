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
import About from 'pages/AboutPage.vue'

defineOptions({
  name: 'MainLayout'
})

const linksList = [
  {
    title: '주문관리',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
    component: UserLog
  },
  {
    title: '회원관리',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework',
    component: About
  },
  {
    title: '카테고리 추가',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: '제품 추가',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: '사용자 로그',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  }
]

// const leftDrawerOpen = ref(false)
const currentView = ref(linksList[0].component) // 기본값을 첫 번째 컴포넌트로 설정

function toggleLeftDrawer () {
  // leftDrawerOpen.value = !leftDrawerOpen.value
}

function changeMainView(link) {
  currentView.value = link.component // 클릭한 링크의 컴포넌트로 변경
  leftDrawerOpen.value = false // 사이드바를 닫습니다.
}
</script>
