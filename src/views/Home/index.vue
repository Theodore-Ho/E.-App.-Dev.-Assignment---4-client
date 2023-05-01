<template>
  <div class="home">
    <div class="btn-area">
      <div class="btn-left">
        <el-select
            v-model="filter"
            multiple
            filterable
            remote
            clearable
            style="width: 90%"
            placeholder="Filter by category"
            @change="getCategory"
            :remote-method="searchCategory"
            :loading="loading">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="btn-right">
        <el-button type="primary" size="small" @click="$router.push({ name: 'NewProduct' })">New Product</el-button>
      </div>
    </div>
    <div class="list-area">
      <div class="item" v-for="item in products" @click="$router.push({ name: 'ProductDetail', params: { id: item.id } })">
        <img class="image" :src="item.thumbnail" alt="Product Image"/>
        <div class="category">
          <el-tag type="success" size="small">{{ item.category }}</el-tag>
        </div>
        <div class="title">{{ item.title }}</div>
        <div class="price-area">
          <span class="price">€ {{ item.price }}</span>
          <span class="discount">{{ item.discountPercentage }} % <font-awesome-icon :icon="['fas', 'down-long']" /></span>
        </div>
        <div class="rating">
          <el-rate
              v-model="item.rating"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}">
          </el-rate>
        </div>
      </div>
    </div>
    <div class="pagination-area">
      <el-pagination
          v-if="!smallPagination"
          background
          :pager-count="5"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[6, 10, 12, 18, 20, 30, 50]"
          :page-size="currentLimit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="dataTotal">
      </el-pagination>
      <el-pagination
          v-if="smallPagination"
          background
          :pager-count="5"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="currentLimit"
          layout="prev, pager, next"
          :total="dataTotal">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: 'HomeView',
  data() {
    return {
      products: [],
      currentPage: 0,
      currentLimit: 0,
      pageTotal: 0,
      dataTotal: 0,
      loading: false,
      options: [],
      smallPagination: false
    }
  },
  computed: {
    ...mapState(['page', 'limit', 'filter'])
  },
  mounted() {
    this.generateProductList();
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    ...mapMutations(['setPage', 'setLimit', 'setFilter']),
    async generateProductList() {
      let res = await this.$api.getProducts(this.page, this.limit, Array.from(this.filter).toString());
      if(res.data.status === 200) {
        this.products = res.data.data.products;
        this.currentPage = res.data.data.page;
        this.currentLimit = res.data.data.limit;
        this.pageTotal = res.data.data.pageTotal;
        this.dataTotal = res.data.data.dataTotal;
      }
    },
    handleSizeChange(val) {
      this.setPage(1); // avoid passing over
      this.setLimit(val);
      this.generateProductList();
    },
    handleCurrentChange(val) {
      this.setPage(val);
      this.generateProductList();
    },
    searchCategory(str) {
      if (str !== '') {
        this.loading = true;
        this.doSearchCategory(str);
      } else {
        this.options = [];
      }
    },
    async doSearchCategory(query) {
      this.options = [];
      let res = await this.$api.getCategoryOption(query);
      if(res.data.status === 200) {
        this.loading = false;
        res.data.data.forEach(cat => {
          let catOption = {};
          catOption.value = cat;
          catOption.label = cat;
          this.options.push(catOption);
        });
      }
    },
    getCategory(val) {
      this.setPage(1); // avoid passing over
      this.setFilter(val);
      this.generateProductList();
    },
    handleResize() {
      this.smallPagination = window.innerWidth < 668;
    }
  }
}
</script>
<style lang="less" scoped>
.home {
  margin-bottom: 20px;
}
.btn-area {
  height: 60px;
  line-height: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  .btn-left {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .btn-right {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
@media (max-width: 768px) {
  .btn-area {
    height: 120px;
    grid-template-columns: 1fr;
  }
}

.list-area {
  margin-top: 20px;
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  .item {
    margin: 5px;
    width: 200px;
    min-height: 280px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    .image {
      margin-left: 10px;
      margin-top: 10px;
      width: 180px;
      height: 150px;
      object-fit: contain;
    }
    .category {
      margin-right: 10px;
      margin-top: 7px;
      text-align: right;
    }
    .title {
      margin-top: 6px;
      margin-left: 10px;
      margin-right: 10px;
      font-size: 1.7em;
      text-shadow: 1px 1px 1px #333;
    }
    .price-area {
      margin-top: 5px;
      text-align: center;
      .price {
        font-size: 2em;
        font-weight: bold;
        color: mediumblue;
      }
      .discount {
        padding-left: 5px;
        color: red;
      }
    }
    .rating {
      margin-top: 5px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
.item:hover {
  background-color: rgba(77, 144, 254, 0.2);
  box-shadow: 0 0 0 3px #1a73e8;
  border-radius: 10px;
}
/deep/ .el-rate__item {
  cursor: pointer !important;
}

.pagination-area {
  margin-top: 20px;
  height: 50px;
  border: 1px solid;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-pagination {
  margin: 0;
}
</style>