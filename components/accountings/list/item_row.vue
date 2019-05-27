<template>
    <tr @click = "goEditPage()">
        <td>{{item.item}}</td>
        <td class="price" :class="{ negative: item.amount<0 }">{{item.amount}}</td>
        <td>{{item.category.name}}</td>
        <td>{{item.note}}</td>
    </tr>
</template>

<script>
import VueTypes from 'vue-types'

export default {
    props: {
        item: VueTypes.object.isRequired
    },

    methods: {
        goEditPage(id){
            this.$router.push(`/accountings/detail/${this.item.id}`)
        }
    }


}
</script>

<style scoped>

.price {
    font-weight: 700;
    color: #2c3e50;
}


</style>
