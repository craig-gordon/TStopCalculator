const TStops = [
  1,
  1.122,
  1.26,
  1.414,
  1.587,
  1.782,
  2,
  2.245,
  2.52,
  2.828,
  3.175,
  3.564,
  4,
  4.49,
  5.04,
  5.656,
  6.35,
  7.127,
  8,
  8.98,
  10.079,
  11.312,
  12.699,
  14.254,
  16,
  17.959,
  20.159,
  22.624,
  25.398,
  28.509,
  32
];
export const data = TStops.map((el, i) => {
  const obj = {};
  obj.TStop = el;
  obj.Reading = (calibrationReading, calibrationIndex) => {
    let multiplier;
    if (calibrationIndex) {
      multiplier = Math.pow(2, calibrationIndex);
    } else {
      multiplier = 1;
    }
    return ((calibrationReading * multiplier) / Math.pow(2, i / 3)).toFixed(2);
  };
  return obj;
});

export const fStops = [
  'f/1.0',
  'f/1.4',
  'f/2.0',
  'f/2.8',
  'f/4.0',
  'f/5.6',
  'f/8.0',
  'f/11',
  'f/16',
  'f/22',
  'f/32'
];
