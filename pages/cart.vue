<template>
  <div class="flex flex-col w-full">
    <div class="top-0 sticky w-full bg-red-500 shadow-lg z-10">
      <div class="flex w-full p-4">
        <div class="w-full text-center cursor-default">
          <span class="text-base text-white font-semibold">Keranjang Belanja</span>
        </div>
      </div>
    </div>
    <div v-if="getCart.length > 0"
         class="flex flex-col w-full mb-4 mt-4">
      <div class="border-b bg-white mb-3"
           v-for="(i, index) in getCart"
           :key="index">
        <div class="flex w-full h-12 border-b">
          <img width="47px"
               class="mr-2"
               src="https://cdn4.iconfinder.com/data/icons/shopping-113/24/store_local_shop_building-512.png"
               alt="">
          <span class="mt-3">{{i.store.name}}</span>
        </div>
        <div class="flex pl-1 flex-row mb-1">
          <div class="flex flex-col w-5/6">
            <div class="mt-3">
              {{i.name}}
            </div>
            <div class="m-1">
                Qty: {{qty}}
            </div>
            <div>
              Rp {{i.price * qty | formatNumber }}
            </div>
          </div>
          <div class="w-1/6">
            <img width="100%"
                 :src="i.stuff.image_url"
                 alt="">
          </div>
        </div>
        <div class="flex rounded w-2/5">
          <!-- {{ item['quantity'] }} -->
          <!-- <pre>{{qty}}</pre> -->
          <InputNumber v-model="qty" :min="1" :max="i.stuff.stock" />
        </div>
        <div class="flex w-full p-2">
          <div class="w-full flex justify-end"
               @click="removeCart(i)">
            <div>
              <img width="25px"
                   class="mr-2"
                   src="https://icon-library.net/images/delete-icon-transparent-background/delete-icon-transparent-background-2.jpg"
                   alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-col w-full bg-white">
      <div class="text-gray-700 text-sm">
        Total
      </div>
      <div class="flex flex-row font-bold text-md ">
        <div class="w-1/2"> Rp {{getTotal | formatNumber}}</div>
        <div class="w-1/2 text-right">
          <button class="bg-red-700 p-2 rounded text-white">Bayar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputNumber from "@/components/InputNumber";

export default {
  components: {
    InputNumber
  },
  computed: {
    getCart() {
      return this.$store.getters.cart
    },
    totalCart() {
      var wadah = []
      var total = 0
      for (let i in this.getCart) {
        total = this.getCart[i].price
        wadah.push(total)
      }
      return wadah
    },
    getTotal() {
      var totals = 0
      for (let i = 0; i < this.totalCart.length; i++) {
        totals += this.totalCart[i];
      }
      return totals
    },
  },
  data() {
    return {
      temp: this.getCart,
      qty: 1
    }
  },
  mounted() {
    console.log(this.totalCart)

    console.log('qty', this.qty)
  },
  methods: {
    // removeCart(item) {
    //   alert('Something problem in store')
    // }
    removeCart(item) {

      this.$store.commit('removeFromCart', item);
    }

  }
}
</script>