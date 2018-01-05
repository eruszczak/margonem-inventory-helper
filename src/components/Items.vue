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
              <!--<li v-for="item in itemTypes" @mouseover="mouseOver(item, $event)"-->
                  <!--v-bind:class="{ active: item.isActive }"><a>das</a></li>-->
            </ul>
          </nav>
        </div>
      </div>
    </section>

    <nav class="navbar has-shadow">
      <div class="container">
        <div class="navbar-tabs">
          <router-link class="navbar-item is-tab is-active" :to="{name: 'items', params: {'type': 1}}">
            Jednoręczne
          </router-link>
          <router-link class="navbar-item is-tab" :to="{name: 'items', params: {'type': 2}}">
            Dwuręczne
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'items',
    watch: {
      '$route' (to, from) {
        console.log(to, from)
      }
    }
  }
</script>

<style scoped>

</style>
