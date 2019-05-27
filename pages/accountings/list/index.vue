<template>
  <section class="container">
    <div>
        <calender/>
        <item v-if="accountings"></item>
        <nuxt-link to="/accountings/detail" class="register-new-button">収支の新規登録</nuxt-link>
    </div>
  </section>
</template>

<script>
import Item from '~/components/accountings/list/item.vue'
import Calender from '~/components/accountings/detail/calender.vue'
import { mapGetters} from 'vuex'

export default {

    async fetch({error, store}){

        //今日の日付でデータを初期化
        var today = new Date()
        var date = `${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()}`

        store.commit('accountings/detail/setDate',date)

        try{

            await store.dispatch("accountings/list/init", date)

        }catch(e){

        }

    },

    components: {
        Item,
        Calender
    },

    computed: {
        ...mapGetters('accountings/list', ['accountings']),
    }
}
</script>

<style>

.register-new-button {
    display: block;
    text-align: center;
    padding: 10px 30px;
    background-color: #ffffff;
    border: 1px solid #27ae60;
    font-size: 16px;
    font-weight: 700;
    color: #27ae60;
    border-radius: 100px;
    cursor: pointer;
    transition: .3s;
    width: 800px;
    margin: 0 auto 50px;
}

.register-new-button:hover {
  transition: .3s;
  background-color:#27ae60; 
  color: #ffffff;
}

</style>
