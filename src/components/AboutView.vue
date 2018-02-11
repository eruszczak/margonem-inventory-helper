<template>
  <section class="section">
    <div class="container">
      <msg header="O stronie">
        <ul>
          <li>można przeglądać i wyszukiwać przedmioty z gry Margonem</li>
          <li>można budować swój ekwipunek</li>
          <li>można udostępniać swój ekwipunek poprzez link</li>
          <li>można porównać swój ekwipunek z odwiedzanym</li>
        </ul>
      </msg>
      <msg header="Nadchodzące zmiany">
        <ul>
          <li>porównywarka przedmiotów</li>
          <li>podgląd ostatnio oglądanych ekwipunków</li>
          <li>uzupełnienie brakujących przedmiotów</li>
          <li>formularz, w którym można zgłaszać błędy i uwagi</li>
        </ul>
      </msg>
      <msg header="Pomoc">
        <p>W razie powtarzających się problemów, może pomóc wyczyszczenie danych lokalnych zapisanych przez aplikację (np. twój ekwipunek albo ostatnio odwiedzane przedmioty).</p>
        <button class="button" @click="clearStorage">Wyczyść localStorage</button>
      </msg>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'about-view',
    created () {
      this.$Progress.finish()
    },
    methods: {
      clearStorage () {
        window.localStorage.clear()
        this.$toast.info('Wyczyszczono localStorage')
      }
    }
  }
</script>

<style scoped>

</style>
