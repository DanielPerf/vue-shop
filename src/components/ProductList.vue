<template>
    <ul class="catalog__list">
      
        <productItem v-for="product in products" :productItem="product" :key="product.title"/>
      
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