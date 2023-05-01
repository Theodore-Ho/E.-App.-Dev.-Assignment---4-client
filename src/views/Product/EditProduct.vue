<template>
  <div class="edit">
    <div class="header">
      <el-page-header @back="goBack" content="Edit Product"></el-page-header>
    </div>
    <div class="form-area">
      <ProductForm :form="form" :action="'edit'"></ProductForm>
    </div>
  </div>
</template>

<script>
import ProductForm from "@/components/ProductForm.vue";

export default {
  name: "EditProduct",
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
        images: []
      },
      productId: ''
    }
  },
  mounted() {
    this.echoProductDetails();
  },
  methods: {
    goBack() {
      this.$router.push({name: 'ProductDetail', params: {id: this.productId}});
    },
    echoProductDetails() {
      this.productId = this.$route.params.id;
      const reg = /^[1-9]\d*$/;
      if(!reg.test(this.productId)) {
        this.$message.error("Invalid Product ID");
        this.$router.push({ name: "Home" });
      }
      this.getProductDetail();
    },
    async getProductDetail() {
      let res = await this.$api.getProductById(this.productId);
      if(res.data.status === 200) {
        this.form = res.data.data;
        let newImgs = [];
        let i = 0;
        this.form.images.forEach(img => {
          newImgs.push({key: Date.now() + i, value: img});
          i++;
        });
        this.form.images = newImgs;
      }
    }
  }
}
</script>

<style lang="less" scoped>
.edit {
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