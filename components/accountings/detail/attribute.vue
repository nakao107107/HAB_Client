<template>
    <div class="form-container">
        <div class="field">
            <label class="label">タイプ</label>
            <select  class="select" v-model="input.payment_type">
                <option :value="'income'">収入</option>
                <option :value="'spending'">支出</option>
            </select>
        </div>
        <div class="field">
            <label class="label">商品</label>
            <input class="input" type="text" v-model="input.item">
        </div>
        <div class="field">
            <label class="label">金額</label>
            <input class="input" type="text" v-model="input.amount">
        </div>
        <div class="field">
            <label class="label">分類</label>
            <select  class="select" v-model="input.category_id">
                <option :value="null">-</option>
                <option v-for="v in categories" :key="v.id" :value="v.id">{{ v.name }}</option>
            </select>
        </div>
        <div class="field">
            <label class="label">備考</label>
            <textarea class="textarea" type="text" v-model="input.note"/>
        </div>
        
        <div class="button-container">
            <button class="primary-button" @click="saveAttribute">
                {{ accounting.id ? '収支情報の更新' : '収支情報の新規作成' }}
            </button>

            <button class="danger-button" v-if="accounting.id" @click="deleteAttribute">
                収支情報の削除
            </button>
        </div>


    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {

    data(){
        return {
            input: {}
        }
    },

    created(){

        // this.accountingだとcategoryでエラーが出るのでidがあるかで判別
        this.input = {
            payment_type: this.accounting.id ? this.accounting.payment_type : "spending",
            amount: this.accounting.id ? this.accounting.amount : null,
            category_id: this.accounting.id ? this.accounting.category.id : 1,
            item: this.accounting.id ? this.accounting.item : null,
            note: this.accounting.id ? this.accounting.note : null
        }

    },

    computed: {
        ...mapGetters('accountings/detail', ['accounting']),
        ...mapGetters('config', ['categories'])
    },

    methods: {

        async saveAttribute(){
            try {
                await this.$store.dispatch('accountings/detail/saveAttribute', this.input)
                //トップへ
                this.$router.push('/accountings/list');
            }
            catch(e) {
                throw e
            }
        },

        async deleteAttribute(){
            try {
                await this.$store.dispatch('accountings/detail/deleteAttribute')
                //トップへ
                this.$router.push('/accountings/list');
            }
            catch(e) {
                throw e
            }
        }
    }


    
}
</script>

<style scoped>

.form-container {
    padding: 50px 100px;
}

.button-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 50px;
}



.primary-button {
  padding: 10px 30px;
  background-color: #ffffff;
  border: 1px solid #27ae60;
  font-size: 16px;
  font-weight: 700;
  color: #27ae60;
  border-radius: 100px;
  cursor: pointer;
  width: 50%;
  transition: .3s;
}

.primary-button:hover {
  transition: .3s;
  background-color:#27ae60; 
  color: #ffffff;
}

.danger-button {
  padding: 10px 30px;
  background-color: #ffffff;
  border: 1px solid #e74c3c;
  font-size: 16px;
  font-weight: 700;
  color: #e74c3c;
  border-radius: 100px;
  cursor: pointer;
  width: 45%;
  transition: .3s;
}

.danger-button:hover {
  transition: .3s;
  background-color:#e74c3c; 
  color: #ffffff;
}


</style>
