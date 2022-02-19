<template>
  <div class="about" :style="{ backgroundImage: 'url(' + bgi + ')' }">
    <!-- <img :src="bgi" alt=""> -->
    <div class="contaier">
      <el-cascader
        size="small"
        :options="options"
        v-model="selectedOptions"
        :props="cascaderProps"
        @change="handleChange">
      </el-cascader>
      <h3>{{livesWeatherData.city}}</h3>
      <p class="time">{{new Date() | dateFormat}}</p>
      <p class="weather">{{livesWeatherData.weather}}<span>    {{livesWeatherData.temperature}}℃</span></p>
      <p class="windDir">{{livesWeatherData.winddirection}}风</p>
      <p class="cast">未来四天天气预报</p>
      <!-- <el-card align-center class="box-card">
        <p>实况温度:  <span>{{livesWeatherData.temperature}} ℃</span></p>
        <p>风向:  <span>{{livesWeatherData.winddirection}} </span></p>
        <p>风力:  <span>{{livesWeatherData.windpower}} 级</span></p>
        <p>空气湿度:  <span>{{livesWeatherData.humidity}}%</span></p>
        <p>更新时间:  <span>{{livesWeatherData.reporttime}}</span></p>
      </el-card> -->
        <el-table
          :data="forecastData"
          stripe
          border
          size="small"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="100px"
            fixed>
          </el-table-column>
          <el-table-column
            prop="daytemp"
            label="白天温度(℃)"
            width="100px">
          </el-table-column>
          <el-table-column
            prop="nighttemp"
            label="晚上温度(℃)"
            width="100px">
          </el-table-column>
          <el-table-column
            prop="nightweather"
            label="晚上天气">
          </el-table-column>
          <el-table-column
            prop="nightweather"
            label="晚上天气">
          </el-table-column>
          <el-table-column
            prop="daywind"
            label="白天风向">
          </el-table-column>
          <el-table-column
            prop="nightwind"
            label="晚上风向">
          </el-table-column>
          <el-table-column
            prop="daypower"
            label="白天风力(级)"
            width="100px">
          </el-table-column>
          <el-table-column
            prop="nightpower"
            label="晚上风力(级)"
            width="100px">
          </el-table-column>
        </el-table>
    </div>
  </div>
</template>

<script>
import { regionData } from 'element-china-area-data'
// import bgi from '@/assets/bg.jpg'
export default {
  name: 'About',
  created() {
    this.selectedOptions = this.$route.params.value
    this.getdata()
    // console.log(this.livesWeatherData)
    // console.log(this.selectedOptions)
  },
  data() {
    return {
      livesWeatherData: {},
      forecastData: [],
      // castReporttime: '',
      // 三级联动数据
      options: regionData,
      selectedOptions: [],
      cascaderProps: {
        expandTrigger: 'hover',
        checkStrictly: true
      },
      bgi: require('@/assets/bg.jpg')
    }
  },
  computed: {
    addId() {
      return this.selectedOptions.length - 1
    }
  },
  methods: {
    handleChange(value) {
      this.selectedOptions = value
      this.getdata()
      // this.bgChange()
    },
    async getdata() {
      if (!this.selectedOptions) {
        return this.$notify.error('请选择城市')
      }
      const res1 = await this.$getLivesWeatherData(this.selectedOptions[this.addId])
      const res2 = await this.$getForecastData(this.selectedOptions[this.addId])
      // console.log(res1)
      // console.log(res2);
      if (res1.status !== '1' && res2.status !== '1') {
        return this.$notify.error('获取天气数据失败')
      }
      // console.log(res1.lives )
      if (res1.lives[0].length < 3) return this.$notify.error('此地区暂无数据，可换相近地区查询')
      this.$notify.success('查询天气成功')
      this.livesWeatherData = res1.lives
      this.livesWeatherData = { ...this.livesWeatherData[0] }
      // console.log(res1);
      // console.log(this.livesWeatherData)
      this.forecastData = res2.forecasts[0].casts
      this.bgChange()
      // this.castReporttime = res2.forecasts.reporttime
    },
    // 背景图片切换
    bgChange() {
      const weather = this.livesWeatherData.weather
      if (!weather) {
        this.bgi = require('@/assets/bg.jpg')
        return
      }
      this.bgi = require(`@/assets/${weather}.jpg`)
    }
  }
}
</script>
<style scoped lang="less">
.about{
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
}
.contaier{
  width: 50%;
  padding: 20px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // h3, .el-card {
  //   margin: 20px;
  //   width: 250px;
  //   text-align: center;
  //   p{
  //     margin: 10px;
  //   }
  // }
  h3{
    margin-top: 10px;
    color: #fff;
    text-shadow: 5px 5px 5px #000;
  }
  p{
    margin: 5px;
  }
  .time{
    color: #fff;
  }
  .weather{
    color: #fff;
    text-shadow: 5px 5px 5px #ddd;
    font-size: 7vw;
    font-weight: 700;
    font-style: italic;
  }
  span{
    font-size: 22px;
    color: #000c1f;
    text-shadow: 3px 3px 5px #ddd;
    font-style: normal;
  }
  .cast{
    color: #fff;
    letter-spacing: 2px;
    font-size: 1.5vw;
    font-weight: 700;
  }
  .el-table{
    margin-top: 10px;
    border-radius: 5px;
    opacity: .8;
  }
  .windDir{
    color: #000c1f;
    font-size: 1.5vw;
    font-weight: 700;
    text-shadow: 3px 3px 5px #ddd;
  }
}
</style>
