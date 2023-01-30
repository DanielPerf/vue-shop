<template>
    <ul class="catalog__list">
      <productItem  :productsItem="productsItem" v-for="(product, index) in productsItem" :key="index"/>
    </ul>
</template>

<script>
import productItem from '@/components/ProductItem.vue';

export default {
  components: {
        productItem
    },
}
</script>