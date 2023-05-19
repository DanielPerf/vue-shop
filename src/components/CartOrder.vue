<template>
  <li class="cart__order">
    <h3>{{name}}</h3>
    <b>{{price | numberFormat}}</b>
    <span>Артикул: 150030</span>
  </li>
</template>

<script>
import numberFormat from "@/helpers/numberFormat";

export default {
props:['name', 'price'],
  filters: {
    numberFormat
  }
}
</script>