<template>
  <div class="b-tabs" :class="{ 'is-fullwidth': expanded }">
    <nav class="tabs" :class="navClasses">
      <ul>
        <li
          v-for="(tabItem, index) in tabItems"
          :key="index"
          :class="{ 'is-active': newValue === index, 'is-disabled': tabItem.disabled }">
          <a @click="tabClick(index)">
            <span v-if="tabItem.label" style="margin-right:4px">{{ tabItem.label }}</span><item :data="tabItem.item" :action="tabItem.itemAction" :noLink="tabItem.noLink"/>
          </a>
        </li>
      </ul>
    </nav>
    <section class="tab-content">
      <slot name="content"/>
    </section>
  </div>
</template>

<script>
  import Item from '../../item/Item'
  import { RIGHT_CLICK_MAPPER } from '../../../utils/constants'

  export default {
    name: 'Tabs',
    components: {Item},
    props: {
      value: [String, Number],
      expanded: Boolean,
      type: String,
      size: String,
      position: String,
      animated: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        newValue: this.value || 0,
        tabItems: [],
        rmbActions: RIGHT_CLICK_MAPPER,
        contentHeight: 0,
        _isTabs: true // Used internally by TabItem
      }
    },
    computed: {
      navClasses () {
        return [
          this.type,
          this.size,
          this.position,
          {
            'is-fullwidth': this.expanded,
            'is-toggle-rounded is-toggle': this.type === 'is-toggle-rounded'
          }
        ]
      }
    },
    watch: {
      value (value) {
        this.changeTab(this.newValue, value)
        this.newValue = value
      },
      tabItems () {
        if (this.tabItems.length) {
          this.tabItems[this.newValue].isActive = true
        }
      }
    },
    methods: {
      changeTab (oldIndex, newIndex) {
        if (oldIndex === newIndex) return
        this.tabItems[oldIndex].deactivate(oldIndex, newIndex)
        this.tabItems[newIndex].activate(oldIndex, newIndex)
      },
      tabClick (value) {
        this.changeTab(this.newValue, value)
        this.newValue = value
      }
    },
    mounted () {
      if (this.tabItems.length) {
        this.tabItems[this.newValue].isActive = true
      }
    }
  }
</script>
