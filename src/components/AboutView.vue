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
    </div>
  </section>
</template>

<script>
  export default {
    name: 'about-view',
    created () {
      this.$Progress.finish()
    }
  }
</script>

<style scoped>

</style>
