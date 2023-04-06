<template>
  <component :is="currentPageComponent" :page-params="currentPageParams" />
</template>

<script>
import MainPage from '@/pages/MainPage.vue'
import ProductPage from '@/pages/ProductPage.vue'
import ErrorPage from '@/pages/ErrorPage.vue'
import eventBus from './eventBus'

const routes = {
  main: 'MainPage',
  product: 'ProductPage'
}

export default {
  components: {
    MainPage,
    ProductPage,
    ErrorPage
  },
  data() {
    return {
      currentPage: 'main',
      currentPageParams: {}
    } 
  },
  methods: {
    goToPage(pageName, pageParams) {
      this.currentPage = pageName
      this.currentPageParams = pageParams || {}
    },
  },
  computed: {
    currentPageComponent() {
      return routes[this.currentPage] || 'ErrorPage'
    },
  },
  created() {
    eventBus.$on('goToPage', (pageName, pageParams) => this.goToPage(pageName, pageParams))
  }
  
}
</script>

<style></style>
