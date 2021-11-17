<template>
  <main>
    <div class="data-container">
        <div>
          <div class="data-output-box">
            Meeting Name:
          </div>
          <div class="data-output-box">
            Race Number:
          </div>
          <div class="data-output-box">
            Start Time:
          </div>
        </div>
    </div>
    <div class="data-container">
      <ul v-for="race in raceList" :key="race.race_id">
        <li>
          <div class="data-output-box">{{ race.meeting_name }}</div>
          <div class="data-output-box">{{ race.race_number }}</div>
          <div class="data-output-box">
            <CountTimer :timeValue="race.advertised_start.seconds"/>
          </div>
        </li>
      </ul>
    </div>
  </main>
</template>

<script lang="ts">
import CountTimer from '@/components/CountTimer.vue';
// would put these interfaces into a model folder
export interface AdvertisedStart {
  seconds: number;
}
/* eslint-disable camelcase */
export interface RaceListData {
  meeting_name: string;
  category_id: string;
  race_id: string;
  race_number: number;
  advertised_start: AdvertisedStart;
}
/* eslint-enable camelcase */

export default {
  name: 'RaceList',
  components: { CountTimer },
  props: {
    raceList: {
      type: Object as () => RaceListData[],
    },
  },
};
</script>

<style scoped>
main {
  display: flex;
  justify-content: center;
}
li {
  list-style: none;
}
ul {
  margin: unset;
}
.data-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 15px;
}
.data-output-box {
  border: 1px solid #675b5b;
  padding: 10px;
}
</style>
