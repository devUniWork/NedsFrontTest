<template>
  <div>
    <label for="raceTypes">Choose Race type:</label>
<!--  I debated looping an array of racetypes here -
      and centralizing in the app.vue,
      I would if there was more options or I was likely to change the data model-->
    <select name="raceTypes" @change="setSelected($event.target.value)" id="raceTypes">
      <option value="Greyhound">Greyhound racing</option>
      <option value="Harness">Harness racing</option>
      <option value="Horse">Horse racing</option>
    </select>
  </div>
</template>

<script>

export default {
  name: 'RaceTypeFilter',
  mounted() {
    this.setSelected('Greyhound');
  },
  methods: {
    // ideally I would use an enum here - was having issues with linter.
    setSelected(raceType) {
      this.$emit('updatedFilter', raceType);
    },
  },
};
</script>

<style lang="scss">
  label {
    margin-right: 15px;
  }
</style>
