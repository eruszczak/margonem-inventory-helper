<template>
  <section class="section">
    <div class="container">
      <div class="message is-info">
        <div class="message-body">
          <p>W tej strefie itemy po kliknięciu na nie PPM zostaną dodane do porównywarki</p>
        </div>
      </div>
      <div class="message is-info">
        <div class="message-body">
          <p>Aby szybko porównać przedmioty, znajdź je za pomocą wyszukiwarki powyżej oraz dodaj klikając na nie PPM.</p>
        </div>
      </div>

      <!--<h4 v-if="queryStringSlugs" class="text-xs-center">Link do porównania.-->
        <!--Możesz edytować, ale zmiany nie zostaną zapisane.</h4>-->
      <!--<h4 v-else class="text-xs-center">Moje porównanie</h4>-->
      <!--<v-btn @click.native="removeAllItems" small round secondary>Usuń przedmioty</v-btn>-->
      <!--<template v-if="eqItemsSlugs">-->
        <!--&lt;!&ndash; <router-link :to="{name: 'comparedItems', query: {i: eqItemsSlugs} }"> &ndash;&gt;-->
        <!--<router-link :to="comparedItemsRoute">-->
          <!--<v-btn small round class="deep-purple lighten-2">Link do porównania</v-btn>-->
        <!--</router-link>-->

        <!--<v-btn-->
          <!--small round secondary-->
          <!--v-clipboard:copy="comparedItemsLink"-->
          <!--v-clipboard:success="onCopy"-->
          <!--v-clipboard:error="onError"-->
        <!--&gt;-->
          <!--skopiuj link-->
        <!--</v-btn>-->
      <!--</template>-->
    </div>

  </section>
</template>

<script>
  export default {
    name: 'item-compare-view'
  }
</script>

<style scoped>

</style>
