<template>
  <div>
    <attribute/>
  </div>
</template>


<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Attribute from '~/components/accountings/detail/attribute.vue'

export default {
  /*
  初回データの読み込み
  */

  components: {
    Attribute
  },

  async fetch ({ params, error, store })
  {
    try {
      await store.dispatch('accountings/detail/init', params.code)
    }
    catch(e) {
      error({ statusCode: 404 });
    }
  },

  computed: {
    ...mapGetters('accountings/detail', ['accounting'])
  }
}
</script>