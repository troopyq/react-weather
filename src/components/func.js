function toCelcius(temp) {
  if (!temp || typeof temp !== 'number') return 0;
  return Math.round(temp - 273.15);
}

export { toCelcius };
