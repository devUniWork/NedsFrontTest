<template>
  <main>
    <div>
      <h2>Next to go races:</h2>
    </div>
    <div class="toggle-button-container">
      <RaceTypeFilter @updatedFilter="updateFilter($event)"/>
    </div>
    <div class="race-list-container">
      <RaceList :raceList="races" />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import RaceTypeFilter from '@/components/RaceTypeFilter.vue';
import RaceList, { RaceListData } from '@/components/RaceList.vue';
import TimeHelper from '@/helpers/TimeHelper';

export default defineComponent({
  name: 'App',
  components: {
    RaceTypeFilter,
    RaceList,
  },
  data() {
    return {
      filters: {
        Greyhound: '9daef0d7-bf3c-4f50-921d-8e818c60fe61',
        Harness: '161d9be2-e909-4326-8c2c-35ed71fb460b',
        Horse: '4a2788f8-e825-4d36-9894-efd4baf1cfae',
      },
      selectedFilter: '',
      races: [] as RaceListData[],
      timerId: 0,
    };
  },
  setup() {
    return {
      raceCount: '100',
      requestedCount: 5,
      raceData: [] as any,
    };
  },
  mounted() {
    this.getRaceData();
  },
  unmounted() {
    // always remove interval or timeout subscriptions to avoid memory leaks.
    if (this.timerId !== 0) {
      window.clearInterval(this.timerId);
    }
  },
  methods: {
    async getRaceData() {
      this.raceData = await this.getRawRaceData(this.raceCount);
      this.dataRefresher();
    },
    async getRawRaceData(raceCount: string) {
      // I set the raceCount to 100 because empirical testing showed,
      // that I would consistently have enough data to always display 5 of any race type
      // in reality that is unnecessarily expensive -
      // I would pass the filter as params in rest api or as query in graphl body.
      const rawData = await axios.get(`https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=${raceCount}`,
        {
          headers: { 'Content-type': 'application/json' },
        });
      return Object.values(rawData.data.data.race_summaries);
    },
    filterData() {
      return this.raceData.reduce((accumulator: RaceListData[], race: RaceListData) => {
        // the spec is: "A user should see 5 races at all times"
        // the below statements will limit 5 or requested count but also filter by category Id
        if (accumulator.length < this.requestedCount) {
          if (race.category_id === this.selectedFilter) {
            accumulator.push(race);
          }
        }
        return accumulator;
      }, []);
    },
    filteredSortedData() {
      // just sorting the data by race time ascending - as per spec.
      return this.filterData()
        .sort((firstRace: RaceListData, lastRace: RaceListData) => firstRace
          .advertised_start.seconds
        - lastRace.advertised_start.seconds);
    },
    dataRefresher() {
      // list is filtered and sorted, first element will be the nearest to expire;
      this.races = this.filteredSortedData();
      // vue 3 uses proxy objects (learnt something new)
      // - this is why we use spread operator to make a new object.
      const timeUntilNextRace = { ...this.races[0]?.advertised_start };
      const interval = TimeHelper.timeUntilNextRace((timeUntilNextRace.seconds + 60) * 1000);
      window.clearInterval(this.timerId);
      console.log(interval);
      if (interval > 0) {
        this.timerId = window.setInterval(() => {
          // this.getRaceData();
          this.getRaceData();
          // remove timer subscription after
          // getting new race data to avoid memory leaks - this is a recursive process.
          window.clearInterval(this.timerId);
        }, interval);
      }
    },
    // this should by typed by an enum - but I couldn't get it to work with the linter. soz.
    updateFilter(filter: 'Greyhound' | 'Harness' | 'Horse') {
      // update the filter
      this.selectedFilter = this.filters[filter];
      // get some new data on dropdown change
      this.dataRefresher();
    },
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.toggle-button-container {
  display: flex;
  justify-content: center;
  align-content: center;
}

.race-list-container {
  display: flex;
  justify-content: center;
}

</style>
