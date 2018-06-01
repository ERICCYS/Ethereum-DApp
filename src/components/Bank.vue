<template>
  <div>
    <operations/>
    <metamask/>
  </div>
</template>

<script>
import metaMask from '@/components/metaMask.vue'
import operations from '@/components/operations.vue'

export default {
  name: 'Bank',
  beforeCreate () {
    console.log('registerWeb3 Action dispatched from Bank.vue')
    this.$store.dispatch('registerWeb3')
  },
  components:{
    'metamask': metaMask,
    'operations': operations
  }
}
</script>


<style scoped>

</style>
