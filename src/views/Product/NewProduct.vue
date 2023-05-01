<template>
  <div class="new">
    <div class="header">
      <el-page-header @back="goBack" content="Add New Product"></el-page-header>
    </div>
    <div class="form-area">
      <ProductForm :form="form" :action="'add'"></ProductForm>
    </div>
  </div>
</template>

<script>
import ProductForm from "@/components/ProductForm.vue";

export default {
  name: "NewProduct",
  components: {
    ProductForm
  },
  data() {
    return {
      form: {
        title: '',
        brand: '',
        description: '',
        price: '',
        discountPercentage: '',
        stock: '',
        rating: '',
        category: '',
        thumbnail: '',
        images: [{
          value: ''
        }]
      }
    }
  },
  methods: {
    goBack() {
      this.$router.push({ name: "Home" });
    }
  }
}
</script>

<style lang="less" scoped>
.new {
  margin-bottom: 30px;
  .header {
    margin-left: 10px;
  }
  .form-area {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>