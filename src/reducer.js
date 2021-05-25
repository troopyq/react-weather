export default (state, action) => {
  switch (action.type) {
    case 'SET_TEMPERATURE':
      return {
        ...state,
        temperature: action.payload,
      };

    case 'SET_POSITION':
      return {
        ...state,
        position: {
          lon: action.payload.lon,
          lat: action.payload.lat,
        },
      };
    case 'SET_CITY':
      return {
        ...state,
        city: action.payload,
      };
    case 'SET_INPUT_CITY':
      return {
        ...state,
        inpCity: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: {
          temperature: action.payload?.temperature,
          city: action.payload?.city,
        },
      };
    case 'SET_WEATHER':
      return {
        ...state,
        weather: action.payload,
      };

    default:
      return state;
  }
};
