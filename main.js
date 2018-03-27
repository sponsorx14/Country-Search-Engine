$(function(){
  const url = 'https://restcountries.eu/rest/v2/name/';
  const $tableContainer = $('.table-container');
  const countriesList = $('.country-list');


  const searchCountries = country => (new Promise((resolve, reject) => {
    fetch(`${url}${country}`)
      .then(data => data.json())
      .then(data => showCountriesList(data))
      .catch(error => sweetAlert('Oops...', 'No such country', 'error'))
  }));

  function showCountriesList(resp){
    countriesList.empty();
    $('.country-name-input').val('');
    resp.forEach(function(item){
      const country = $('<li>').addClass('country');
      const countryDetails = $('<table><tbody>').addClass('country-details');
      const countryFigure = $('<figure>').addClass('country-name');
      const countryFigcaption = $('<figcaption>');
      $('<h1>').text(item.name).appendTo(countryFigcaption);
      $('<img>').attr('alt', 'Country flag').attr('src', item.flag).addClass('country-flag').appendTo(countryFigure);
      $('<tr>' + '<td>' + 'Capital name:' + '</td>' + '<td>' + item.capital + '</td>' + '</tr>').addClass('country-capital').appendTo(countryDetails);
      $('<tr>' + '<td>' + 'Currency:' + '</td>' + '<td>' + item.currencies[0].code + '</td>' + '</tr>').addClass('country-currency').appendTo(countryDetails);
      $('<tr>' + '<td>' + 'Language: ' + '</td>' + '<td>' + item.languages[0].nativeName + '</td>' + '</tr>').addClass('country-language').appendTo(countryDetails);
      $('<tr>' + '<td>' + 'Native name:' + '</td>' + '<td>' + item.nativeName + '</td>' + '</tr>').addClass('country-native-name').appendTo(countryDetails);
      $('<tr>' + '<td>' + 'Population:' + '</td>' + '<td>' + (item.population / 1000000).toFixed(2) + ' mln' + '</td>' + '</tr>').addClass('country-population').appendTo(countryDetails);
      $('<tr>' + '<td>' + 'Sub region:' + '</td>' + '<td>' + item.subregion + '</td>' + '</tr>').addClass('country-region').appendTo(countryDetails);
      countryFigcaption.appendTo(countryFigure);
      countryFigure.appendTo(country);
      countryDetails.appendTo(country);
      country.appendTo(countriesList);
    });
  }

  $('.search').click(function(e){
    e.preventDefault();
    let countryName = $('.country-name-input').val();
    searchCountries(countryName);
  });
  $('body').keypress((e) => {
    if(e.keyCode == 13) {
      let countryName = $('.country-name-input').val();
      searchCountries(countryName);
    }
  });
});
