import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

// const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

document.addEventListener('input', debounce(countryName, DEBOUNCE_DELAY));

function removeMarkup() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}

function countryName(evt) {
  const query = evt.target.value.trim();
  if (!query) {
    removeMarkup();
    return;
  }

  fetchCountries(query)
    .then(data => {
      if (data.length === 1) {
        removeMarkup();
        countryInfo.innerHTML = createInfoMurkup(data);
      }
      if (data.length >= 2 && data.length <= 10) {
        removeMarkup();
        countryList.innerHTML = createListMurkup(data);
      }
      if (data.length > 10) {
        Notify.warning(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
      removeMarkup();
      return error;
    });
}

function createInfoMurkup(arr1) {
  return arr1
    .map(
      ({ name, capital, population, flags, languages }) =>
        `<li>
    <img src="${
      flags.svg
    }"  alt="${name} width="40", height="30">&nbsp<b><BIG>${
          name.official
        }</BIG></b>
    <p><span><b>Capital: </b></span>${capital}</p>
    <p><span><b>Population: </b></span>${population}</p>
    <p><span><b>Languages: </b></span>${Object.values(languages).join(
      ', '
    )} </p>
  </li>`
    )
    .join('');
}

function createListMurkup(arr2) {
  return arr2
    .map(
      ({ name, flags }) =>
        `<li>
    <img src="${flags.svg}"  alt="${name} width="40", height="30">&nbsp<b class= "title">${name.official}<b>
  </li>`
    )
    .join('');
}
