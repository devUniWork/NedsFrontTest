import dayjs from 'dayjs';

class TimeHelper {
  static convertTime(time: number): string {
    // get current time to compare with race time.
    const timeNow = dayjs();
    // find the difference in time between now and race time
    const diff = dayjs(time).diff(timeNow);
    const hours = dayjs(time).diff(timeNow, 'hours');
    const minutes = dayjs(diff).minute();
    const seconds = dayjs(diff).second();
    // display hours if hours exist - else display empty string;
    const hoursVal = hours ? `${hours}h ` : '';
    // display if hours or minutes exist - else display empty string;
    const minsVal = hours || minutes ? `${minutes}m ` : '';
    // always display seconds.
    const secsVal = `${seconds}s`;
    // convert current time to unix time
    const timeNowUnix = dayjs(timeNow).unix();
    return (timeNowUnix * 1000) >= time ? `${60 - seconds}s ago` : `${hoursVal}${minsVal}${secsVal}`;
  }

  static timeUntilNextRace(time: number): number {
    const timeNow = dayjs();
    return dayjs(time).diff(timeNow, 'milliseconds');
  }
}
export default TimeHelper;
