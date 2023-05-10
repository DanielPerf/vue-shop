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
      <li class="colors__item" v-for="color in colors" :key="color.id">
        <label class="colors__label">
          <input
            class="colors__radio sr-only"
            type="radio"
            
            :value="color"
            
          />
          <span class="colors__value" :style="{color: color.code}"></span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import { API_BASE_URL } from '@/config';
import goToPage from '@/helpers/goToPage'
import numberFormat from '@/helpers/numberFormat'
import axios from 'axios';

export default {
  props: ['productItem'],
  data() {
    return {
      colorsData: null
    };
  },
  filters: {
    numberFormat
  },
  computed: {
    colors() {
      return this.colorsData ? this.colorsData.items : []
    }
  },
  created() {
    this.loadColors()     
  },
  methods: {
    goToPage,
    loadColors() {
      axios.get(API_BASE_URL + '/api/colors')
        .then(response => this.colorsData = response.data)
    }
  },
};
</script>
