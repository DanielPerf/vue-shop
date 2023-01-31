<template>
    <ul class="catalog__list">
      <productItem   v-for="(product, index) in products"  :productItem="product" :key="'product_'+index"/>
    </ul>
</template>

<script>
import productItem from '@/components/ProductItem';


export default {
  props: ['products'],
  components: {
        productItem
    },
   
}
</script>