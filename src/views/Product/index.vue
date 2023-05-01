<template>
  <div class="detail">
    <div class="header">
      <el-page-header @back="goBack" content="Product Detail"></el-page-header>
    </div>
    <div class="container">
      <div class="image-area">
        <div class="image-area-upper">
          <div class="thumbnail-area">
            <img class="thumbnail" :src="product.thumbnail" alt="Product Image"/>
          </div>
          <div class="image-area-lower">
            <div class="images-area">
              <div class="item" v-for="item in this.product.images">
                <img class="item-image" :src="item" alt="Product Image"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="info-area">
        <el-descriptions :title="product.title" :column="2">
          <template slot="extra">
            <el-button type="primary" size="small" @click="$router.push({ name: 'EditProduct', params: { id: product.id } })">Edit</el-button>
            <el-button type="danger" size="small">Delete</el-button>
          </template>
          <el-descriptions-item label="Brand">{{ product.brand }}</el-descriptions-item>
          <el-descriptions-item label="Price">{{ product.price }}</el-descriptions-item>
          <el-descriptions-item label="Discount">{{ product.discountPercentage }} %</el-descriptions-item>
          <el-descriptions-item label="Stock">{{ product.stock }}</el-descriptions-item>
          <el-descriptions-item label="Rating">
            <el-rate
                v-model="product.rating"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}">
            </el-rate>
          </el-descriptions-item>
          <el-descriptions-item label="Category">
            <el-tag type="success" size="small" @click="filterCategory">{{ product.category }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="Description">{{ product.description }}</el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
  </div>
</template>

<script>

import {mapMutations} from "vuex";

export default {
  name: 'ProductDetail',
  data() {
    return {
      productId: '',
      product: {}
    }
  },
  created() {
    this.generateProductDetails();
  },
  methods: {
    ...mapMutations(['setPage', 'setFilter']),
    goBack() {
      this.$router.push({ name: "Home" });
    },
    generateProductDetails() {
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
        this.product = res.data.data;
      }
    },
    filterCategory() {
      this.setPage(1); // avoid passing over
      this.setFilter(Array.of(this.product.category));
      this.$router.push({ name: "Home" });
    }
  }
}
</script>

<style lang="less" scoped>
.detail {
  margin-bottom: 40px;
  .header {
    margin-left: 10px;
  }
  .container {
    min-height: 580px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-row-gap: 20px;
    .image-area {
      display: flex;
      align-items: center;
      justify-content: center;
      .image-area-upper {
        width: 100%;
        .thumbnail-area {
          display: flex;
          align-items: center;
          justify-content: center;
          .thumbnail {
            height: 300px;
            width: 400px;
            object-fit: contain;
          }
          @media (max-width: 450px) {
            .thumbnail {
              width: 300px;
            }
          }
        }
      }
      .image-area-lower {
        margin-top: 20px;
        .images-area {
          min-height: 150px;
          width: 100%;
          display: inline-flex;
          flex-wrap: wrap;
          justify-content: center;
          .item {
            margin: 5px;
            display: flex;
            flex-direction: column;
            .item-image {
              border: 1px solid;
              width: 100px;
              height: 100px;
              object-fit: contain;
            }
          }
        }
      }
    }
    .info-area {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 20px;
      margin-right: 20px;
    }
  }
  @media (max-width: 998px) {
    .container {
      margin-top: 12px;
      grid-template-columns: 1fr;
    }
  }
}
/deep/ .el-descriptions__body {
  background-color: inherit;
}
/deep/ .el-descriptions__title {
  font-size: 1.5em;
}
/deep/ .el-descriptions-item__label {
  font-weight: bold;
  font-size: 1.2em;
}
/deep/ .el-descriptions-item__content {
  font-size: 1.2em;
}
/deep/ .el-rate {
  line-height: inherit;
}
/deep/ .el-tag {
  cursor: pointer;
}
/deep/ .el-tag:hover {
  background-color: #67c23a;
  color: #f0f9eb;
}
</style>