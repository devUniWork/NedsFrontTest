<template>
  <main>
    <div>
      {{countDownTimer.length ? countDownTimer : 'loading'}}
    </div>
  </main>
</template>

<script>
import TimeHelper from '@/helpers/TimeHelper';

export default {
  name: 'countTimer',
  props: {
    timeValue: Number,
  },
  data() {
    return {
      countDownTimer: {
        type: String,
      },
      refreshTimerId: {
        type: Number,
        default: null,
      },
    };
  },
  mounted() {
    this.refreshTimerId = window.setInterval(() => {
      // this is how we animate the count down in the template.
      this.refreshData();
    }, 1000);
  },
  unmounted() {
    // always clean up intervals and timeouts - just removing on component destruction.
    if (this.refreshTimerId) {
      clearInterval(this.refreshTimerId);
    }
  },
  methods: {
    refreshData() {
      this.countDownTimer = TimeHelper.convertTime(this.timeValue * 1000);
    },
  },
};
</script>

<style scoped>
</style>
