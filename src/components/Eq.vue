<template>
  <div>
    <table class="set">
      <tbody>
        <tr v-for="row in rows">
          <td v-for="place in row" :id="place">
            <item v-if="eqItems[place]" :stats="eqItems[place]" @rightClick="removeItemFromEq"></item>
          </td>
        </tr>
      </tbody>
    </table>

    <!--<v-btn v-if="forShowOnly" @click.native.stop="saveEqBtn" small round secondary>-->
      <!--Zapisz jako mój-->
    <!--</v-btn>-->

    <!--<v-btn v-else-if="stack.length - countItemReplacements" @click.native.stop="restorePreviousState" small round secondary>-->
      <!--Cofnij ({{ stack.length - countItemReplacements }})-->
    <!--</v-btn>-->

    <!--<template v-if="!forShowOnly && eqItemsSlugs.length">-->
      <!--<router-link :to="eqSetRoute">-->
        <!--<v-btn small round class="deep-purple lighten-2">Link do zestawu</v-btn>-->
      <!--</router-link>-->

      <!--<v-btn-->
        <!--small round secondary-->
        <!--v-clipboard:copy="eqSetLink"-->
        <!--v-clipboard:success="onCopy"-->
        <!--v-clipboard:error="onError"-->
      <!--&gt;-->
        <!--skopiuj link-->
      <!--</v-btn>-->
    <!--</template>-->

    <!-- EQ SET SUMMARY -->
      <!--<eq-set-summary v-if="!hideSummary" :rightOne="globalStats"></eq-set-summary>-->
  </div>
</template>

<script>
  import Item from './Item'
  import {ITEM_PLACE, ITEM_BONUS, CHARACTER_CLASSES_IN_ORDER} from '../utils/items'
  import { isInt, isItemWearable, calculateBonusWeakness, calculateHolyTouchAmount, getBaseUrl } from '../utils/helpers'

  export default {
    name: 'Eq',
    props: {
      // forShowOnly: {default: false},
      // hideSummary: {default: false},
      // preventAddingItem: {default: false}, // true when itemComparision is toggled
    },
    components: {
      Item
    },
    // watch: {
    //   '$route' (to, from) {
    //     if (this.forShowOnly) {
    //       // I forgot about it and items weren't rendered but they were added.
    //       // reseting object is not enough, keys must be present so they can be tracked
    //       this.eqItems = {
    //         primary: false, secondary: false, armor: false, helmet: false,
    //         boots: false, gloves: false, ring: false, necklace: false, blessing: false
    //       }
    //       this.initEqSet(true);
    //     }
    //   }
    // },
    // TODO EVENTS
    // created () {
    //   // listen for ItemList <item>'s rightClick
    //   if (!this.forShowOnly) {
    //     EventBus.$on('addItem', this.addItemToEq);
    //     EventBus.$on('saveEqAsMine', this.saveEqAsMine);
    //   }
    //   this.initEqSet();
    // },
    data () {
      return {
        rows: [['blessing', 'helmet', ''], ['ring', 'necklace', 'gloves'], ['primary', 'armor', 'secondary'], ['', 'boots', '']],
        showSummary: false,
        // if empty object is used, then if property in addItemToEq() is added
        // v-if is not triggered therefore item is not showed in EqSet
        eqItems: {
          primary: false, secondary: false, armor: false, helmet: false,
          boots: false, gloves: false, ring: false, necklace: false, blessing: false
        },
        requiredProfessions: [],
        allowedProfessions: [],
        activeBonuses: {},
        professionConflict: false,
        requiredLvl: 0,
        bonusesSummary: '',
        globalStats: {},
        stack: [],
        countItemReplacements: 0
      }
    },
    computed: {
      // eqItemsSlugs: function() {
      //   let slugs = [];
      //   for (var place in this.eqItems) {
      //     var item = this.eqItems[place];
      //     if (item) {
      //       slugs.push(item.slug);
      //     }
      //   }
      //   return slugs;
      // },
      // eqSetRoute: function() {
      //   return {
      //     name: 'eqSet',
      //     query: {
      //       i: this.eqItemsSlugs
      //     }
      //   }
      // },
      // eqSetLink: function () {
      //   return `${getBaseUrl()}${this.$router.resolve(this.eqSetRoute).href}`
      // }
    },
    methods: {
      addItemToEq: function (clickedItem, isStackOperation = false, initial = false) {
        // console.log('add')
        if (!initial && this.preventAddingItem) {
          // this is also for left set in EqSetsView because in listener is not created
          // because I dont want to add items using toolbarSearch
          return
        }

        let itemPlacement = ITEM_PLACE[clickedItem.type]
        if (!initial && !isItemWearable(clickedItem.type)) {
          // EventBus.$emit('showSnackbar', `Nie można założyć tego typu.`);
          return
        }

        let previousItemInThisPlace = this.eqItems[itemPlacement]
        if (!initial && previousItemInThisPlace.slug === clickedItem.slug) {
          // EventBus.$emit('showSnackbar', `Ten przedmiot jest już założony.`);
          return
        }

        if (!initial) {
          // EventBus.$emit('showSnackbar', `Założono ${clickedItem.name}`);
        }
        this.eqItems[itemPlacement] = clickedItem

        if (!isStackOperation) {
          if (previousItemInThisPlace) {
            this.stack.push({added: false, item: previousItemInThisPlace});
            this.countItemReplacements += 1;
          }
          this.stack.push({added: true, item: clickedItem});
        }
        // this.updateSetState()
        if (!this.forShowOnly) {
          // this set is only for display, cannot add items to it
          localStorage.setItem(itemPlacement, JSON.stringify(clickedItem))
        }
      },
      removeItemFromEq: function (clickedItem, isStackOperation = false) {
        if (this.forShowOnly) {
          // EventBus.$emit('showSnackbar', 'Nie możesz edytować odwiedzanego zestawu.');
          // this set is only for display, cannot delete items from it
          return
        }
        let itemType = ITEM_PLACE[clickedItem.type]

        this.eqItems[itemType] = false
        // EventBus.$emit('showSnackbar', `Zdjęto ${clickedItem.name}`);

        if (!isStackOperation) {
          this.stack.push({added: false, item: clickedItem})
        }
        // this.updateSetState()
        localStorage.removeItem(itemType)
      },
      // updateSetState: function() {
      //   this.globalStats = {};
      //   this.requiredProfessions = [];
      //   this.allowedProfessions = CHARACTER_CLASSES_IN_ORDER;
      //   this.activeBonuses = {};
      //   this.requiredLvl = 0;
      //   this.bonusesSummary = '';
      //   let isConflict = false;
      //
      //   for (let item in this.eqItems) {
      //     let eqItem = this.eqItems[item];
      //     if (!eqItem) {
      //       continue;
      //     }
      //
      //     if (eqItem.lvl > this.requiredLvl) {
      //       this.requiredLvl = eqItem.lvl;
      //     }
      //
      //     if (eqItem && eqItem.profession) {
      //       let itemRequiredProfessions = eqItem.profession.split('');
      //       if (this.requiredProfessions.length === 0) {
      //         // set requiredProfessions as first item's requiredProfessions
      //         this.requiredProfessions = itemRequiredProfessions;
      //       }
      //       if (!this.containsRequiredProfession(itemRequiredProfessions)) {
      //         isConflict = true;
      //         // cannot break here because requiredLvl must be updated so every item must be checked
      //       }
      //     }
      //   }
      //   this.updateBonuses();
      //   this.getEqSetStats();
      //
      //   this.globalStats.bonusesSummary = this.activeBonuses;
      //   this.globalStats.requiredLvl = this.requiredLvl;
      //   this.globalStats.professionConflict = isConflict;
      //   this.globalStats.allowedProfessions = this.allowedProfessions.length === 6 ? false : this.allowedProfessions;
      //
      //   this.$emit('eqSetStats', this.globalStats);
      // },
      // containsRequiredProfession: function (professions) {
      //   this.allowedProfessions = this.allowedProfessions.filter(function (prof) {
      //     // exclude every prof that is not required by this item's required professions
      //     return professions.indexOf(prof) > -1;
      //   })
      //
      //   for (let prof of professions) {
      //     if (this.allowedProfessions.indexOf(prof) !== -1) {
      //       return true
      //     }
      //   }
      //   return false
      // },
      // updateBonuses: function() {
      //   for (let item in this.eqItems) {
      //     let eqItem = this.eqItems[item]
      //     if (!eqItem) {
      //       continue
      //     }
      //     let legbon = eqItem.legbon;
      //     let itemLvl = eqItem.lvl;
      //     if (!legbon || !itemLvl) {
      //       // item is not legendary. do nothing
      //       continue
      //     }
      //
      //     // TODO is this possible: legendary item you can wear which doesnt have lvl requirement
      //     const bonus = ITEM_BONUS[legbon];
      //     if (this.activeBonuses.hasOwnProperty(legbon)) {
      //       this.activeBonuses[legbon].count += 1;
      //       if (this.activeBonuses[legbon].count === 2) {
      //         if (legbon !== 'lastheal') {
      //           let legbonVal = calculateBonusWeakness(this.requiredLvl, itemLvl, bonus.value);
      //           this.activeBonuses[legbon].value += legbonVal;
      //         }
      //         if (itemLvl > this.activeBonuses[legbon].maxItemLvl) {
      //           this.activeBonuses[legbon].maxItemLvl = itemLvl;
      //           this.activeBonuses[legbon].holyTouchAmount = calculateHolyTouchAmount(itemLvl);
      //         }
      //       } else {
      //         this.activeBonuses[legbon].limitReached = true;
      //         // get only for 2 highest items with this bonus
      //         // clear data and iterate over all data
      //         // is it worth? firstable: must have a set with 3 the same bonuses and with high lvl diff
      //       }
      //     } else {
      //       this.activeBonuses[legbon] = {
      //         count: 1,
      //         value: calculateBonusWeakness(this.requiredLvl, itemLvl, bonus.value),
      //         limitReached: false,
      //         maxItemLvl: itemLvl,
      //         lvl: itemLvl,
      //         holyTouchAmount: legbon === 'holytouch' ? calculateHolyTouchAmount(itemLvl) : null
      //       }
      //     }
      //   }
      // },
      // getEqSetStats: function () {
      //   for (let item in this.eqItems) {
      //     if (!item) {
      //       continue
      //     }
      //
      //     let stats = {};
      //     if (typeof this.eqItems[item].json_stats === 'string') {
      //       stats = JSON.parse(this.eqItems[item].json_stats)
      //     }
      //
      //     for (let attr in stats) {
      //       if (this.globalStats.hasOwnProperty(attr)) {
      //         if (attr === 'dmg') {
      //           let currentRange = this.globalStats[attr].split('-')
      //           let newRange = stats[attr].split('-')
      //           let newMin = parseInt(currentRange[0]) + parseInt(newRange[0])
      //           let newMax = parseInt(currentRange[1]) + parseInt(newRange[1])
      //           this.globalStats[attr] = `${newMin}-${newMax}`
      //         } else {
      //           this.globalStats[attr] = parseFloat(this.globalStats[attr]) + parseFloat(stats[attr])
      //           if (!isInt(this.globalStats[attr])) {
      //             this.globalStats[attr] = parseFloat(this.globalStats[attr].toFixed(15)) // remove trailing zeroes
      //           }
      //         }
      //       } else {
      //         this.globalStats[attr] = stats[attr];
      //       }
      //     }
      //   }
      // },
      // saveEqBtn: function () {
      //   // this comes from left eq-set and below is callback for this event. it is received in right one
      //   EventBus.$emit('showSnackbar', `Zapisano zestaw jako mój`);
      //   EventBus.$emit('saveEqAsMine', this.eqItems);
      // },
      // restorePreviousState: function () {
      //   let obj = this.stack.pop()
      //   if (!obj) {
      //     return
      //   }
      //   if (obj.added) {
      //     this.removeItemFromEq(obj.item, true);
      //     let currentTop = this.stack[this.stack.length - 1]
      //     if (currentTop) {
      //       if (currentTop.item.type === obj.item.type) {
      //         if (currentTop.added) {
      //           console.warn('current top was marked as added, it shouldn\'t be')
      //         }
      //         this.countItemReplacements -= 1
      //         this.restorePreviousState()
      //       }
      //     }
      //   } else {
      //     this.addItemToEq(obj.item, true);
      //   }
      //   EventBus.$emit('showSnackbar', `Przywrócono poprzedni stan zestawu`)
      // },
      // saveEqAsMine: function (newSet) {
      //   // this.eqItems = newSet;
      //   for (var savedItem in this.eqItems) {
      //     var savedItemInStorage = localStorage.getItem(savedItem)
      //     if (savedItemInStorage != null) {
      //       this.removeItemFromEq(savedItem, false, true)
      //     }
      //     if (savedItem in newSet) {
      //       this.addItemToEq(newSet[savedItem], false, true)
      //     }
      //   }
      // },
      // initEqSet: function() {
      //   // another option needed - get 2 sets from queryString TODO
      //   const itemSlugs = this.$route.query.i
      //   if (itemSlugs && this.forShowOnly) {
      //     let queryString = '?i=' + itemSlugs.join('&i=')  // TODO
      //     this.initSetFromQueryString(queryString)
      //   } else {
      //     this.initSetFromStorage();
      //   }
      //   this.stack = []
      // },
      // initSetFromStorage: function () {
      //   for (var savedItem in this.eqItems) {
      //     var savedItemInStorage = localStorage.getItem(savedItem)
      //     if (savedItemInStorage != null) {
      //       this.addItemToEq(JSON.parse(savedItemInStorage), false, true)
      //     }
      //   }
      // },
      // initSetFromQueryString: function(queryString) {
      //   Vue.http.get('/api/item' + queryString).then(response => {
      //     for (const item of response.body.results) {
      //       this.addItemToEq(item, false, true);
      //     }
      //   }, response => {});
      // },
      // onCopy: function (e) {
      //   EventBus.$emit('showSnackbar', `Skopiowano link do zestawu`);
      // },
      // onError: function (e) {
      //   EventBus.$emit('showSnackbar', `Nie udało się skopiować linku do zestawu`);
      // }
    },
  }
</script>

<style>
  .set td {
    width: 42px;
    height: 42px;
    border: 1px solid lightgrey;
  }

  .redcolor {
    color: red;
  }
  .redborder {
    border: 1px solid red;
    display: inline-block;
  }
</style>
