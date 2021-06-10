export default {
  getCountry: (state) => state.country,
  getCity: (state) => (idCountry) =>
    state.city.filter((c) => c.idCountry === idCountry),
};
