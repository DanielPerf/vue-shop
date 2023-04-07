<template>
  <li class="catalog__item">
    <!-- Переключение при помощи самописного @click.prevent="goToPage('product', {id:productItem.id})" -->
    <router-link class="catalog_pic" :to="{name: 'product', params: {id: productItem.id}}">
      <img :src="productItem.image" :alt="productItem.title" />
    </router-link>

    <h3 class="catalog__title">
      <a href="#">
        {{ productItem.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ productItem.price | numberFormat}}
    </span>

    <ul class="colors colors--black">
      <li class="colors__item">
        <label class="colors__label">
          <input
            class="colors__radio sr-only"
            type="radio"
            
            value="#73B6EA"
            v-model="color"
          />
          <span class="colors__value" style="background-color: #73b6ea"> </span>
        </label>
      </li>
      <li class="colors__item">
        <label class="colors__label">
          <input
            class="colors__radio sr-only"
            type="radio"
            
            value="#8BE000"
            v-model="color"
          />
          <span class="colors__value" style="background-color: #8be000">  </span>
        </label>
      </li>
      <li class="colors__item">
        <label class="colors__label">
          <input
            class="colors__radio sr-only"
            type="radio"
            
            value="#222"
            v-model="color"
          />
          <span class="colors__value" style="background-color: #222"> </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import goToPage from '@/helpers/goToPage'
import numberFormat from '@/helpers/numberFormat'

export default {
  props: ['productItem'],
  data() {
    return {
      color: '#73B6EA',
    };
  },
  filters: {
    numberFormat
  },
  methods: {
    goToPage
  },
};
</script>
