function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.com/v3.1/name/';
  const options = {
    method: 'GET',
  };

  return fetch(
    `${BASE_URL}${name}?fields=name,capital,languages,population,flags,flag`
  ).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

export { fetchCountries };
