<template>
  <div class="container">
      <div class="calender-changer">
        
        <font-awesome-icon icon="angle-left" class="icon-button" @click="goPrevMonth"/> 
        {{ yearMonth }}
        <font-awesome-icon icon="angle-right" class="icon-button" @click="goNextMonth"/> 

      </div>

    <table class="calender">
        <tr>
            <th>SUN</th>
            <th>MON</th>
            <th>TUE</th>
            <th>WED</th>
            <th>THR</th>
            <th>FRI</th>
            <th>SAT</th>
        </tr>
        <tr v-for="(week,index) in calendarData" :key="index">
            <td v-for="(day, index) in week" :key="index" @click="changeDate(day, yearMonth)">{{ day }}</td>
        </tr>
    </table>

    <div class="current-date">
        {{date}}
    </div>

  </div>
</template>

<script>
import moment from 'moment'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  data: () => ({
    current: 0,
  }),
  
  computed: {
    currentMoment() {
      return moment().add(this.current, 'months')
    },
    yearMonth() {
      return this.currentMoment.format('YYYY MM')
    },
    calendarData() {
      // この月に何日まであるかを算出
      const numOfMonth = this.currentMoment.endOf('month').date()
      // この月の1日〜最終日までの配列
      const daysOfMonth = [...Array(numOfMonth).keys()].map(i => ++i)
      // 1日の曜日（0~6の数値で取得）
      const firstWeekDay = this.currentMoment.startOf('month').weekday()
      // 週ごとの二次元配列を生成
      const data = [...Array(6)].map((empty, weekIndex) =>
        [...Array(7)].map((empty, dayIndex) => {
          const i = 7 * weekIndex + dayIndex - firstWeekDay
          if (i < 0 || daysOfMonth[i] === undefined) {
            return null
          }
          return daysOfMonth[i]
        })
      )
      // 全てnullの配列があれば除去する
      return data.filter(week => week.filter(day => day != null).length > 0)
    },

    ...mapGetters('accountings/detail', ['date']),
  },

  methods: {
    goNextMonth() {
      this.current++
    },
    goPrevMonth() {
      this.current--
    },
    
    async changeDate(day, yearMonth) {


        var [year, month] = yearMonth.split(' ')
        var date = `${year}/${month}/${day}`

        this.$store.commit("accountings/detail/setDate", date)

        var query = {date: date}

        try{

            await this.$store.dispatch("accountings/list/search", query)

        }catch(e){

        }
    }
  },
}
</script>

<style scoped>

.calender-changer {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    margin-bottom: 30px;

    font-weight: bold;
    color: #27ae60;
    font-size: 20px;
}

.icon-button{
    margin-left: 10px;
    margin-right: 10px;
    cursor: pointer;
}

.calender {
    margin: 0 auto 30px;
    text-align: center;
}

th {
    background-color: #27ae60;
    color: white;
    padding: 10px 40px;
}

td {
    height: 90px;
    padding-top: 10px;
    padding-left: 10px;
    color: #2c3e50;
    font-weight: 700;
    cursor: pointer;
    border:1px solid #ecf0f1;
}

td:hover{
    background-color: #ecf0f1;
    transition: .3s;
}

.current-date {
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 25px;
    color: #27ae60;
}


</style>

