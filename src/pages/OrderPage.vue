<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html"> Каталог </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="cart.html"> Корзина </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> Оформление заказа </a>
        </li>
      </ul>

      <h1 class="content__title">Корзина</h1>
      <span class="content__info"> 3 товара </span>
    </div>

    <section class="cart">
      <div class="loader" v-if="loading"></div>
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormOneStringInput
              v-model="formData.name"
              :error="formError.name"
              title="ФИО"
              placeholder="Введите ваше полное имя"
            />
            <BaseFormOneStringInput
              v-model="formData.address"
              :error="formError.address"
              title="Адрес"
              placeholder="Введите ваш адрес"
            />
            <BaseFormOneStringInput
              v-model="formData.phone"
              :error="formError.phone"
              title="Номер"
              placeholder="Введите ваш телефон"
            />
            <BaseFormOneStringInput
              v-model="formData.email"
              :error="formError.email"
              title="Email"
              placeholder="Введите ваш email"
            />

            <BaseFormMoreStringInput
              title="Комментарий к заказу"
              placeholder="Ваши пожелания"
              v-model="formData.comment"
            />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="delivery"
                    value="0"
                    checked=""
                  />
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="delivery"
                    value="500"
                  />
                  <span class="options__value"> Курьером <b>500 ₽</b> </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="pay"
                    value="card"
                  />
                  <span class="options__value"> Картой при получении </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="pay"
                    value="cash"
                  />
                  <span class="options__value"> Наличными при получении </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <cart-order v-for="item in products" :key="item.productId" :name="item.product.title" :price="item.product.price"/>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{products.length}}</b> товара на сумму <b>{{totalPrice | numberFormat}}</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div v-if="formErrorMessage" class="cart__error form__error-block">
          <h4>{{ formErrorMessage }}</h4>
          <p>
            Похоже произошла ошибка. Попробуйте отправить снова или
            перезагрузите страницу.
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import BaseFormOneStringInput from "@/components/BaseFormOneStringInput.vue";
import BaseFormMoreStringInput from "@/components/BaseFormMoreStringInput.vue";
import axios from "axios";
import { API_BASE_URL } from '@/config'
import CartOrder from '@/components/CartOrder'
import {mapGetters} from "vuex";
import numberFormat from "@/helpers/numberFormat";

export default {
  components: {
    BaseFormOneStringInput,
    BaseFormMoreStringInput,
    CartOrder
  },
  data() {
    return {
      amountProducts: '',
      formData: {},
      formError: {},
      formErrorMessage: '',
      loading: false
    };
  },
  filters: {
    numberFormat
  },
  computed: {
    ...mapGetters({
      totalPrice: "cartTotalPrice",
      products: "cartDetailProducts"
    }),

  },
  mounted() {
    console.log(this.products)
  },
  methods: {
    order() {
      this.formError = {}
      this.formErrorMessage = ''
      clearTimeout(this.orderTimer)
      this.loading = true
      this.orderTimer = setTimeout(() => {
        axios
            .post(API_BASE_URL + '/api/orders', {
              ...this.formData
            }, {
              params: {
                userAccessKey: this.$store.state.userAccessKey
              }
            })
            .then((response) => {
              this.$store.commit('resetCart')
              this.$store.commit('updateOrderInfo', response.data)
              this.$router.push({name: 'orderInfo', params: {id: response.data.id}})
            })
            .catch(error => {
              this.formError = error.response.data.error.request || {}
              this.formErrorMessage = error.response.data.error.message
            })
            .then(() => (this.loading = false))
      }, 2000)
    }
  },
};
</script>
