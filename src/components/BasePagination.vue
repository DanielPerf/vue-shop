<template>
    <ul class="catalog__pagination pagination">
      <li class="pagination__item">
        <a
          class="pagination__link pagination__link--arrow"
          :class="{'pagination__link--disabled':page == 1}"
          aria-label="Предыдущая страница"
          @click.prevent="$event => paginate(page-1)"
        >
          <svg width="8" height="14" fill="currentColor">
            <use xlink:href="#icon-arrow-left"></use>
          </svg>
        </a>
      </li>
      <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
        <a 
        href="#" 
        class="pagination__link" 
        :class="{'pagination__link--current': pageNumber === page}" 
        @click.prevent="paginate(pageNumber)">{{ pageNumber }}</a>
      </li>      
      <li class="pagination__item">
        <a
          class="pagination__link pagination__link--arrow"
          @click.prevent="$event => paginate(page+1)"
          aria-label="Следующая страница"
        >
          <svg width="8" height="14" fill="currentColor">
            <use xlink:href="#icon-arrow-right"></use>
          </svg>
        </a>
      </li>
    </ul>
</template>

<script>
export default {
    model: {
        prop: 'page',
        event: 'paginate'
    },
    props:['page','count','perPage'],
    computed: {
        pages() {
            return Math.ceil(this.count / this.perPage)
        }
    }
    ,
    methods:{
        paginate(page) {
            this.$emit('paginate', page)
        }
    },
    mounted() {
      console.log(this.pageNumber+1, this.count,this.perPage,this.page)
    },
}
</script>