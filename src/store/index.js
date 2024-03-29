import Vue from 'vue';
import Vuex from 'vuex';
// import products from '@/data/products'
import axios from 'axios'
import { API_BASE_URL } from '@/config';


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cartProducts: [],
        userAccessKey: null,
        cartProductsData: [],
        orderInfo: null
    },
    mutations: {
        updateOrderInfo(state, orderInfo) {
            state.orderInfo = orderInfo
        },
        resetCart(state) {
            state.cartProducts = [],
            state.cartProductsData = []
        },
        updateCartProductAmount(state, {productId, amount}) {
            const item = state.cartProducts.find(item => item.productId === productId)
            if (item) {
                item.amount = amount
            }
        },
        deleteCartProduct(state, productId) {
            state.cartProducts = state.cartProducts.filter(item => item.productId !== productId)
        },
        updateUserAccessKey(state, accessKey) {
            state.userAccessKey = accessKey
        },
        updateCartProductsData(state, items) {
            state.cartProductsData = items
        },
        syncCartProducts(state) {
            state.cartProducts = state.cartProductsData.map(item => {
                return {
                    productId: item.product.id,
                    amount: item.quantity
                }
            })
        }
    },
    getters: {
        // cartDetailProducts(state) {
        //     return state.cartProducts.map(item => {
        //         let product = products.find(p => p.id === item.productId)                
        //         return {  
        //             ...item,       
        //             ...product
        //         }
        //     })
        // }
        cartDetailProducts(state) {
            return state.cartProducts.map(item => {
                const product = state.cartProductsData.find(p => p.product.id === item.productId).product           
                return {
                    ...item,
                    product
                }
            })
            
        },
        cartTotalPrice(state, getters) {
            return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0)
        }
    },
    actions: {
         loadOrderInfo(context, orderId) {
            axios
                .get(API_BASE_URL + '/api/orders' + orderId, {
                    params: {
                        userAccessKey: context.state.userAccessKey
                    }
                })
                .then(res => {
                    context.commit('updateOrderInfo', res.data)
                })
         },
         loadCart(context) { 
            console.log(context)
            
            return axios
                .get(API_BASE_URL + '/api/baskets', {
                    params: {
                    userAccessKey: context.state.userAccessKey
                }
                
                })
                .then(response => {
                    console.log(context.state.userAccessKey)
                    if(!context.state.userAccessKey) {
                        localStorage.setItem('userAccessKey', response.data.user.accessKey)
                        context.commit('updateUserAccessKey', response.data.user.accessKey)
                    }
                    context.commit('updateCartProductsData', response.data.items)     
                    context.commit('syncCartProducts')                         
                })
                
         },
         addProductToCart(context, {productId, amount}) {
            return (new Promise(resolve => setTimeout(resolve, 2000)))
            .then(() => {
                return axios
                    .post(API_BASE_URL + '/api/baskets/products', {
                        productId: productId,
                        quantity: amount
                    }, 
                    {
                        params: {
                            userAccessKey: context.state.userAccessKey
                        }
                    })
                    .then(response => {
                        context.commit('updateCartProductsData', response.data.items)     
                        context.commit('syncCartProducts')
                    })
            })
         },
         updateCartProductAmount(context, {productId, amount}) {
            context.commit('updateCartProductAmount', {productId, amount})
            if (amount < 1) {
                return
            }
            return axios
                    .put(API_BASE_URL + '/api/baskets/products', {
                        productId: productId,
                        quantity: amount
                    }, 
                    {
                        params: {
                            userAccessKey: context.state.userAccessKey
                        }
                    })
                    .then(response => {
                        context.commit('updateCartProductsData', response.data.items)                             
                    })
                    .catch(() => {
                        context.commit('syncCartProducts')
                    })
         }
    }
});

