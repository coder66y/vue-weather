<template>
  <div class="home" :style="{ backgroundImage: 'url(' + bgi + ')' }">
    <!-- <img :src="bgi" alt=""> -->
    <div class="contaier">
      <el-cascader
        size="small"
        :options="options"
        :props="cascaderProps"
        placeholder="请选择查询城市"
        @change="handleChange">
      </el-cascader>
      <h1>选择城市开始查询吧</h1>
    </div>
  </div>
</template>

<script>
import { regionData } from 'element-china-area-data'
import bgi from '@/assets/bg.jpg'
export default {
  name: 'Home',
  data() {
    return {
      // 三级联动数据
      options: regionData,
      cascaderProps: {
        expandTrigger: 'hover',
         checkStrictly: true 
      },
      bgi: bgi
    }
  },
  methods: {
    handleChange (value) {
      this.$router.push({ name: 'About', params: { value: value }})
    }
  }
}
</script>
<style scoped lang="less">
.home{
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  // img{
  //   width: 100%;
  //   height: 100%;
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  // }
  h1{
    font-size: 40px;
    color: #fff;
    text-shadow: 5px 5px 10px #000;
    margin-top: 30px;
    letter-spacing: 5px;
  }
}
.contaier{
  width: 50%;
  padding: 100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>

