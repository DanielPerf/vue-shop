<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info"> {{ products.length }} </span>
    </div>

    <div class="content__catalog">
      <ProductFilter :price-from.sync="filterPriceFrom" :price-to.sync="filterPriceTo" :category-id.sync ="filterCategoryId" :filter-color.sync="filterProductColor"/>
      <section class="catalog">
        <div class="" v-if="loadProducts">Загрузка товаров...</div>
        <div class="" v-if="productsLoadingError">Ошибка загрузки товаров<button @click.prevent="loadProducts">Попробовать еще раз</button></div>
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
// import products from "@/data/products";
import ProductList from "@/components/ProductList";
import variable from "@/data/variable";
import BasePagination from "@/components/BasePagination";
import ProductFilter from '@/components/ProductFilter.vue'
import axios from 'axios'
import {API_BASE_URL} from '@/config'

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
      filterProductColor: null,
      variable,
      page: 1,
      productsPerPage: 6,
      productsData: null,
      loading: false,
      productsLoadingError: false
    };
  },
  computed: {
    // filteredProducts() {
    //   let filteredProducts = products
    //   if (this.filterPriceFrom > 0) {
    //     filteredProducts = filteredProducts.filter(product => product.price > this.filterPriceFrom)
    //   }
    //   if (this.filterPriceTo > 0) {
    //     filteredProducts = filteredProducts.filter(product => product.price < this.filterPriceTo)
    //   }
    //   if (this.filterCategoryId) {
    //     filteredProducts = filteredProducts.filter(product => product.categoryId === this.filterCategoryId)
    //   }
    //   if(this.filterProductColor) {
    //     filteredProducts = filteredProducts.filter(product => product.colors.includes(this.filterProductColor))
    //   }
    //   return filteredProducts
    products() {
      // const offset = (this.page - 1) * this.productsPerPage;
      // return this.filteredProducts.slice(offset, offset + this.productsPerPage);
      return this.productsData ? this.productsData.items.map(product => {
        return {
          ...product,
          image: product.image.file.url
        }
      }) : []
    },
    countProducts() {
      // return this.filteredProducts.length;
      return this.productsData ? this.productsData.pagination.total : 0
    },
  },
  
  watch: {
    page() {
      this.loadProducts()
    },
    filterPriceFrom() {
      this.loadProducts()
    },
    filterPriceTo() {
      this.loadProducts()
    },
    filterCategoryId() {
      this.loadProducts()
    },
    filterProductColor() {
      this.loadProducts()
    }
  },
  methods: {
    // hello() {
    //   // for (mes in variable) {
    //   //   alert(mes)
    //   // }
    //   alert(variable.message)
    // }
    loadProducts() {
      this.loading = true
      clearTimeout(this.loadProductsTimer)
      this.loadProductsTimer = setTimeout(() => {
       axios.get(API_BASE_URL + '/api/products', {
        params: {
          page: this.page,
          limit: this.productsPerPage,
          categoryId: this.filterCategoryId,
          minPrice: this.filterPriceFrom,
          maxPrice: this.filterPriceTo,
          colorId: this.filterProductColor
        }
      })
      .then(response => this.productsData = response.data)
      .catch(() => this.productsLoadingError = true)
      .then(() => this.loading = false)
    }, 3000)
    }
  },
  created() {
    this.loadProducts()
  },
  mounted() {
    // console.log(products[0].colors.includes('#73b6ea'))
  },
};

</script>
