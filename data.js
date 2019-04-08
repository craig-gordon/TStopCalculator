const TStops = [
  { TStop: 1 },
  { TStop: 1.122 },
  { TStop: 1.26 },
  { TStop: 1.414 },
  { TStop: 1.587 },
  { TStop: 1.782 },
  { TStop: 2 },
  { TStop: 2.245 },
  { TStop: 2.52 },
  { TStop: 2.828 },
  { TStop: 3.175 },
  { TStop: 3.564 },
  { TStop: 4 },
  { TStop: 4.49 },
  { TStop: 5.04 },
  { TStop: 5.656 },
  { TStop: 6.35 },
  { TStop: 7.127 },
  { TStop: 8 },
  { TStop: 8.98 },
  { TStop: 10.079 },
  { TStop: 11.312 },
  { TStop: 12.699 },
  { TStop: 14.254 },
  { TStop: 16 },
  { TStop: 17.959 },
  { TStop: 20.159 },
  { TStop: 22.624 },
  { TStop: 25.398 },
  { TStop: 28.509 },
  { TStop: 32 }
];
export const data = TStops.map((obj, i) => {
  obj.Reading = f2Reading => {
    return ((f2Reading * 4) / Math.pow(2, i / 3)).toFixed(2);
  };
  return obj;
});
