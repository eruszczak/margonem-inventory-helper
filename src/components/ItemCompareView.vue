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
      <!--<v-expansion-panel expand>-->
        <!--<template v-for="(pair, index) in pairs">-->
          <!--<v-expansion-panel-content class="pt-2 pb-2">-->
            <!--<div slot="header">-->
              <!--<item :stats="pair.left" @rightClick="removePairsWithThisItem"></item> vs <item :stats="pair.right" @rightClick="removePairsWithThisItem"></item>-->
            <!--</div>-->
            <!--<v-card>-->
              <!--<v-row>-->
                <!--<v-col md6 offset-md3>-->
                  <!--<div class="text-xs-center">-->
                    <!--&lt;!&ndash; <b>{{ pair.left.name }}</b> vs <b>{{ pair.right.name }}</b> &ndash;&gt;-->
                    <!--&lt;!&ndash; <item :stats="pair.left" @rightClick="removePairsWithThisItem"></item> &ndash;&gt;-->
                    <!--&lt;!&ndash; <item :stats="pair.right" @rightClick="removePairsWithThisItem"></item> &ndash;&gt;-->
                    <!--&lt;!&ndash; <button @click="pair.show = !pair.show">{{ pair.show ? 'Ukryj szczegóły' : 'Pokaż szczegóły' }}</button> &ndash;&gt;-->
                    <!--&lt;!&ndash; <v-btn @click.native="pairs.splice(index, 1)" small round error dark>-->
                      <!--Usuń parę-->
                    <!--</v-btn> &ndash;&gt;-->

                    <!--<eq-set-summary-->
                      <!--v-show="!pair.show"-->
                      <!--:leftOne="pair.left"-->
                      <!--:rightOne="pair.right"-->
                      <!--:displayBothValues="true"-->
                      <!--:hideSummary="true"-->
                    <!--&gt;-->
                    <!--</eq-set-summary>-->
                  <!--</div>-->
                <!--</v-col>-->
              <!--</v-row>-->
            <!--</v-card>-->
          <!--</v-expansion-panel-content>-->
        <!--</template>-->
      <!--</v-expansion-panel>-->
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
