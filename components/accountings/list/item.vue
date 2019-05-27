<template>
    <table class="data-table">
        <thead>
            <tr class="header-list">
                <td class="short-item">商品</td>
                <td class="short-item">金額</td>
                <td class="short-item">カテゴリー</td>
                <td class="long-item">備考</td>
            </tr>
        </thead>

        <tbody>
            <itemRow
            v-for="(v,k) in accountings"
            :key="`item-${v.id}`"
            :item="v"
            @click="goEditPage(v.id)"
            class="data-list"
            ></itemRow>
        </tbody>
    
        
    </table>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import itemRow from '~/components/accountings/list/item_row.vue'

export default {

    components: {
        itemRow
    },

    computed: {
        ...mapGetters('accountings/list', ['accountings']),
    },

    methods: {
        goEditPage(id){
            console.log("aa")
            this.$router.push(`accountings/detail/${id}`)
        }
    }
}
</script>

<style>

.data-table {
    margin: 0 auto 30px;
    box-shadow: 3px 3px 3px -3px solid rgba(0,0,0,0.6);
    min-width: 800px;
}

tr{
    border: 1px solid #ecf0f1;
}

.header-list {
    background-color: #2c3e50;
    color: #ffffff;
    font-weight: 700;
}

.data-list:hover{
    transition: .3s;
    cursor: pointer;
    background-color: #ecf0f1;
}

td{
    padding-top:10px;
    padding-bottom: 10px;
    padding-left: 10px;
    text-align: center;
}

.short-item {
    width: 15%;
}

.long-item {
    width: 55%;
}



</style>
