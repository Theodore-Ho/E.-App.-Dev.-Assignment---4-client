<template>
  <div class="app">
    <div class="fixed-info">
      <div class="fixed-info-left">Server based in Hong Kong: <a href="https://product.yuhong.me">product.yuhong.me</a></div>
      <div class="fixed-info-right">Current response time: <span style="color: red" id="response-time">0</span> ms</div>
    </div>
    <div class="container">
      <div class="content">
        <Content></Content>
      </div>
      <div class="footer">
        <Footer></Footer>
      </div>
    </div>
  </div>
</template>

<script>
import Content from './Content.vue'
import Footer from './Footer.vue'
export default {
  components: {
    Content,
    Footer
  },
}
</script>

<style lang="less" scoped>
.app {
  width: 100%;
  height: 100vh;
  .container {
    min-height: 100%;
    padding-top: 3%;
    position: relative;
    box-sizing: border-box;
    padding-bottom: 50px;
    .content {
      margin-left: 5%;
      margin-right: 5%;
      min-height: 525px;
    }
    .footer {
      display:flex;
      align-items:center;
      justify-content:center;
      width: 100%;
      height: 50px;
      position: absolute;
      bottom: 0;
      border-top-style: groove;
      background-color: #f8f8f8;
    }
  }
  .fixed-info {
    position: fixed;
    top: 10px;
    font-size: 1.2em;
    z-index: 999;
    .fixed-info-left {
      position: fixed;
      left: 20px;
      display: block;
      background-color: #FFFFFF;
    }
    .fixed-info-right {
      position: fixed;
      right: 20px;
      display: block;
      background-color: #FFFFFF;
    }
  }
}
</style>