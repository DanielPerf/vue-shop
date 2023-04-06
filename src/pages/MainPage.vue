<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info"> {{ products.length }} </span>
    </div>

    <div class="content__catalog">
      <ProductFilter :price-from.sync="filterPriceFrom" :price-to.sync="filterPriceTo" :category-id.sync ="filterCategoryId" :filter-color.sync="filterProductColor"/>
      <section class="catalog">
        <ProductList :products="products" />
        <BasePagination
          v-model="page"
          :count="countProducts"
          :per-page="productsPerPage"
        />
      </section>
    </div>
  </main>
</template>

<script>
import products from "@/data/products";
import ProductList from "@/components/ProductList";
import variable from "@/data/variable";
import BasePagination from "@/components/BasePagination";
import ProductFilter from '@/components/ProductFilter.vue'

export default {

  
  components: {
    ProductList,
    BasePagination,
    ProductFilter,
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterProductColor: '',
      variable,
      page: 1,
      productsPerPage: 3,
    };
  },
  computed: {
    filteredProducts() {
      let filteredProducts = products
      if (this.filterPriceFrom > 0) {
        filteredProducts = filteredProducts.filter(product => product.price > this.filterPriceFrom)
      }
      if (this.filterPriceTo > 0) {
        filteredProducts = filteredProducts.filter(product => product.price < this.filterPriceTo)
      }
      if (this.filterCategoryId) {
        filteredProducts = filteredProducts.filter(product => product.categoryId === this.filterCategoryId)
      }
      if(this.filterProductColor) {
        filteredProducts = filteredProducts.filter(product => product.colors.includes(this.filterProductColor))
      }
      return filteredProducts
    },
    products() {
      const offset = (this.page - 1) * this.productsPerPage;
      return this.filteredProducts.slice(offset, offset + this.productsPerPage);
    },
    countProducts() {
      return this.filteredProducts.length;
    },
  },
  methods: {
    // hello() {
    //   // for (mes in variable) {
    //   //   alert(mes)
    //   // }
    //   alert(variable.message)
    // }
  },
  mounted() {
    console.log(products[0].colors.includes('#73b6ea'))
  },
};

</script>
