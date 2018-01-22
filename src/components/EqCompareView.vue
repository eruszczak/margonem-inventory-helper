<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-6">
        <div class="tile is-parent">
          <article class="tile is-child notification is-success has-text-centered">
            <div class="content">
              <p class="title">Twój zestaw</p>
              <div class="content">
                <eq :source="eqItems"></eq>
              </div>
            </div>
          </article>
        </div>
      </div>
      <div class="tile is-parent is-6">
        <div class="tile is-parent">
          <article class="tile is-child notification is-warning has-text-centered">
            <div class="content">
              <p class="title">Odwiedzany zestaw</p>
              <div class="content">
                <eq :source="eqItems" :readOnly="true"></eq>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child notification is-success has-text-centered">
        <div class="content">
          <p class="title">Statystyki</p>
          <div class="content">
            <eq-stats :source="eqItemsStats"></eq-stats>
          </div>
        </div>
      </article>
    </div>
    <!--TODO MAYBE-->
    <!--<article class="tile is-child notification is-primary has-text-centered">-->
      <!--<div class="content">-->
        <!--<p class="title">Ostatnio przeglądane zestawy</p>-->
        <!--<div class="content">-->
          <!--<p>TYLKO DO ODCZYTU. :</p>-->
          <!--<div class="columns">-->
            <!--<div class="column" v-for="eqItems in eqHistory">-->
              <!--<eq :source="eqItems" :readOnly="true"></eq>-->
              <!--<span>kopiuj link</span>-->
              <!--<router-link :to="getEqLink(eqItems)">Przejdź do zestawu</router-link>-->
              <!--<button class="button is-dark" @click="saveAsMine(eqItems)">Zapisz jako moje</button>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</article>-->
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import Eq from './Eq'
  import RestoreEq from './includes/RestoreEq'
  import EqStats from './includes/EqStats'
  import EqBonuses from './includes/EqBonuses'
  import EqOverview from './includes/EqOverview'

  export default {
    name: 'eq-compare-view',
    components: {Eq, RestoreEq, EqStats, EqBonuses, EqOverview},
    computed: {
      ...mapGetters([
        'eqItems', 'readOnlyEqItems', 'eqItemsStats', 'readOnlyEqItemsStats', 'realStackLength'
      ])
    },
    methods: {
      ...mapActions(['fetchReadOnlyEqItems', 'saveEqAsMine']),

    }
  }
</script>

<style scoped>

</style>
