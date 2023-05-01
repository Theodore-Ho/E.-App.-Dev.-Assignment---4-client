<template>
  <div class="new">
    <div class="header">
      <el-page-header @back="goBack" content="Add New Product"></el-page-header>
    </div>
    <div class="form-area">
      <div class="form">
        <el-form ref="form" :model="form" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="Title" prop="title" :rules="{required: true, message: 'Please enter title', trigger: 'blur'}">
                <el-input v-model="form.title" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Brand" prop="brand" :rules="{required: true, message: 'Please enter brand', trigger: 'blur'}">
                <el-input v-model="form.brand" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="Description" prop="description" :rules="{required: true, message: 'Please enter description', trigger: 'blur'}">
            <el-input type="textarea" :rows="3" v-model="form.description"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="8">
              <el-form-item label="Price" prop="price" :rules="{required: true, message: 'Please enter price', trigger: 'blur'}">
                <el-input v-model="form.price" oninput="value=value.replace(/[^0-9.]/g,'')" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Discount" prop="discountPercentage" :rules="{required: true, message: 'Please enter discount', trigger: 'blur'}">
                <el-input v-model="form.discountPercentage" oninput="value=value.replace(/[^0-9.]/g,'')" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Stock" prop="stock" :rules="{required: true, message: 'Please enter stock', trigger: 'blur'}">
                <el-input v-model="form.stock" oninput="value=value.replace(/\D/g,'')" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="Rating" prop="rating" :rules="{required: true, validator: validateRating, trigger: 'blur'}">
                <el-input v-model="form.rating" oninput="value=value.replace(/[^0-9.]/g,'')" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Category" prop="category" :rules="{required: true, message: 'Please enter category', trigger: 'blur'}">
                <el-select
                    v-model="category"
                    filterable
                    allow-create
                    remote
                    clearable
                    style="width: 100%"
                    placeholder=""
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
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="Thumbnail" prop="thumbnail" :rules="{required: true, message: 'Please enter thumbnail url', trigger: 'blur'}">
            <el-input v-model="form.thumbnail" clearable></el-input>
            <div v-if="form.thumbnail && form.thumbnail.length > 0">
              <img class="image" :src="form.thumbnail" alt="Image Preview"/>
            </div>
          </el-form-item>
          <el-form-item
              v-for="(image, index) in form.images"
              :label="'Image ' + index"
              :key="image.key"
              :prop="'images.' + index + '.value'"
              :rules="{ required: true, message: 'Please enter image url', trigger: 'blur' }"
          >
            <div class="image-delete">
              <el-input v-model="image.value"></el-input><el-button @click.prevent="removeImage(image)">Delete</el-button>
            </div>
            <div v-if="image.value && image.value.length > 0">
              <img class="image" :src="image.value" alt="Image Preview"/>
            </div>
          </el-form-item>
          <el-form-item class="center">
            <el-button @click="addImage">Add Image</el-button>
            <el-button type="primary" @click="submitForm('form')">Save</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "NewProduct",
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
      },
      category: "",
      loading: false,
      options: [],
      load_thumbnail_preview: false,
      show_thumbnail_preview: false,
    }
  },
  methods: {
    goBack() {
      this.$router.push({ name: "Home" });
    },
    getCategory(val) {
      this.form.category = val;
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
    validateRating(rule, value, callback) {
      if (value === '') {
        callback(new Error('Please enter rating'));
      } else {
        if (value > 5) {
          callback(new Error('Max 5'));
        } else {
          this.$refs.form.validateField('checkPass');
        }
        callback();
      }
    },
    addImage() {
      this.form.images.push({
        value: '',
        key: Date.now()
      });
    },
    removeImage(item) {
      const index = this.form.images.indexOf(item);
      if (index !== -1) {
        this.form.images.splice(index, 1);
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let product = _.cloneDeep(this.form);
          let imgArr = [];
          for(let item of this.form.images) {
            imgArr.push(item.value);
          }
          product.images = imgArr;
          this.saveProduct(product);
        }
      });
    },
    async saveProduct(product) {
      const timestampStart = Date.now();
      let res = await this.$api.insertNewProduct(product);
      if(res.data.status === 200) {
        const timestampEnd = Date.now();
        const response_time = Math.abs(timestampEnd - timestampStart);
        this.$message({
          showClose: true,
          duration: 10000,
          message: "Add success, response time " + response_time + " MS",
          type: 'success'
        });
        const newProduct = res.data.data;
        await this.$router.push({name: 'ProductDetail', params: {id: newProduct.id}});
      } else if(res.data.status === 201) {
        this.$message.error("Invalid Parameter Exists");
      }
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
    .form {
      width: 600px;
      .image {
        margin-top: 10px;
        border: 1px solid;
        width: 100px;
        height: 100px;
        object-fit: contain;
      }
      .image-delete {
        display: inline-flex;
        width: 100%;
      }
    }
  }
}
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>