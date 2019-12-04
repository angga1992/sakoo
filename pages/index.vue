<template>
  <div class="flex flex-col bg-white w-full">
    <div class="top-0 sticky w-full bg-red-500 shadow-lg z-10">
      <div class="flex w-full p-4">
        <div class="w-full text-center cursor-default">
          <span class="text-base text-white font-semibold">List Produk </span>
        </div>
      </div>
    </div>
    <div class="flex flex-col w-full mt-4">
      <div 
        class="border-b mb-3"
        v-for="(i, index) in dataCart.items" :key="index">
        <div class="flex w-full h-12 border-b">
          <img width="47px"
               class="mr-2"
               src="https://cdn4.iconfinder.com/data/icons/shopping-113/24/store_local_shop_building-512.png"
               alt="">
         <span class="mt-3">{{i.store.name}}</span>
        </div>
        <div class="flex flex-row mb-1">
          <div class="flex flex-col w-5/6">
            <div class="mt-3">
              {{i.name}}
            </div>
            <div>
              Stok tersisa {{i.stuff.stock}}
            </div>
             <div v-if="i.sale">
              <span class="line-through text-gray-700 text-sm">{{i.sale}}</span>
            </div>
            <div>
             Rp {{ i.price | formatNumber }}
            </div>
          </div>
          <div class="w-1/6">
            <img width="100%" :src="i.stuff.image_url" alt="">
          </div>
        </div>
        <button
          v-if="i.stuff.stock > 0"
          @click="addCart(i)" 
          class="w-1/2 rounded mb-2 bg-blue-600 text-white border-b">Tambah Keranjang</button>
        <button
          v-else
          class="w-1/2 rounded mb-2 bg-gray-600 text-white border-b">Stok Habis</button>
      </div>
    </div>
    <div
      @click="goCart()" 
      class="flex w-full h-16 bg-red-500 text-white justify-start items-start" style="align-items: center;">
        <div class="w-full text-center">
          <span >Lihat keranjang belanja</span>
        </div> 
    </div>
  </div>
</template>

<script>
import json from '@/data.json'

export default {
  data() {
    return {
      dataCart: json
    }
  },
  mounted(){
    console.log(this.dataCart)
  },
  methods: {
    getData(){
      let data = json
      this.dataCart = data
      console.log(this.dataCart)
    },
    addCart(item){
      this.$store.commit('cart', item)
      alert('Berhasil Menambahkan cart')
    },
    goCart(){
      this.$router.push({
        path: '/cart'
      })
    }
  }
}
</script>

