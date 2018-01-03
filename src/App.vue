<template>
  <div id="app">
    
    <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
        </a>
<a class="navbar-item " href="https://bulma.io/love/">
        <span class="bd-emoji">❤️</span>
        Love
      </a>
        <button class="button navbar-burger">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>

    <section class="hero is-info">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Primary title
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
                <li>
                  <a href="/documentation/overview/start/">Bronie</a>
                </li>
                <li>
                  <a href="https://bulma.io/documentation/modifiers/syntax">Biżuteria </a>
                </li>
                <li>
                  <a href="https://bulma.io/documentation/columns/basics">Columns</a>
                </li>
                <li class="is-active">
                  <a href="https://bulma.io/documentation/layout/container/">Layout</a>
                </li>
                <li>
                  <a href="https://bulma.io/documentation/form/general">Form</a>
                </li>
                <li>
                  <a href="https://bulma.io/documentation/elements/box/">Elements</a>
                </li>
                <li>
                  <a href="https://bulma.io/documentation/components/breadcrumb/">Components</a>
                </li>
              </ul>
            </nav></div>
          </div>
    </section>
    <nav class="navbar has-shadow">
      <div class="container">
        <div class="navbar-tabs">
          <a class="navbar-item is-tab is-active" href="https://bulma.io/documentation/layout/container/">
            Container
          </a>
          <a class="navbar-item is-tab " href="https://bulma.io/documentation/layout/level/">
            Level
          </a>
          <a class="navbar-item is-tab " href="https://bulma.io/documentation/layout/media-object/">
            Media Object
          </a>
          <a class="navbar-item is-tab " href="https://bulma.io/documentation/layout/hero/">
            Hero
          </a>
          <a class="navbar-item is-tab " href="https://bulma.io/documentation/layout/section/">
            Section
          </a>
          <a class="navbar-item is-tab " href="https://bulma.io/documentation/layout/footer/">
            Footer
          </a>
          <a class="navbar-item is-tab " href="https://bulma.io/documentation/layout/tiles/">
            Tiles
          </a>
        </div>
      </div>
    </nav>



    <section class="section">
      <div class="container">
        <h1 class="title">Section</h1>
        <h2 class="subtitle">
          A simple container to divide your page into <strong>sections</strong>, like the one you're currently reading
        </h2>
      </div>
    </section>

      <b-switch v-model="switchState">{{ switchState }}</b-switch>
      <hr>

      <b-checkbox v-model="checkboxState">{{ checkboxState }}</b-checkbox>
      <hr>

      <button class="button is-primary" @click="$toast.open('This is a Toast')">
          Show Toast
      </button>
      <button class="button is-primary" @click="$snackbar.open('This is a Snackbar')">
          Show Snackbar
      </button>
      <hr>

      <b-field>
          <b-input maxlength="25" placeholder="Your name"></b-input>
      </b-field>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
