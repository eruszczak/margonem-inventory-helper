<template>
  <div>
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {{ $route.params.type }}
          </h1>
          <h2 class="subtitle">
            Primary subtitle
          </h2>
        </div>
      </div>
      <div class="hero-foot">
        <div class="container">
          <nav class="tabs is-boxed">
            <ul>
              <li v-for="item in itemTypes" @mouseover="mouseOver(item, $event)" v-bind:class="{ active: item.isActive }"><a>{{ item.name }}</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </section>

    <nav class="navbar has-shadow">
      <div class="container">
        <div class="navbar-tabs">
          <router-link class="navbar-item is-tab" v-for="item in subTypes" :to="{name: 'items', params: {type: item.href}}">
            {{ item.name }}
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'items',
    data: function () {
      return {
        subTypes: [],
        itemTypes: [
          {
            name: 'Bronie',
            isActive: false,
            href: '',
            subTypes: [
              {name: 'Jednoręczne', isActive: false, href: '1'},
              {name: 'Dwuręczne', isActive: false, href: '2'}
            ]
          },
          {
            name: 'Ekwipunek',
            isActive: false,
            href: '',
            subTypes: [
              {name: 'Zbroje', isActive: false, href: '10'},
              {name: 'Tarcze', isActive: false, href: '20'}
            ]
          }
        ]
      }
    },
    // watch: {
    //   '$route' (to, from) {
    //     console.log(to, from)
    //   }
    // }
    methods: {
      mouseOver: function (item, event) {
        // console.log('hehe', item, event);
        this.itemTypes.map((el) => {
          el.active = false
        })
        item.isActive = true
        this.subTypes = item.subTypes
        // console.log(this.subTypes)
      },
      // mouseOver2: function (item, event) {
      //   // console.log('hehe', item, event);
      //   this.subTypes.map((el) => {
      //     el.active = false
      //   })
      //   item.isActive = true
      //   // this.subTypes = item.subTypes
      //   // console.log(this.subTypes)
      // }
    }
  }
</script>

<style scoped>

</style>
