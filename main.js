$(function(){
  const url = 'https://restcountries.eu/rest/v2/name/';
  const $tableContainer = $('.table-container');

  function searchCountries(){
    let countryName = $('.country-name').val();
    if(!countryName.length){
      countryName = 'Poland';
    }
    $.ajax({
      url: url + countryName,
      method: 'GET',
      success: showCountriesList,
      error: function (xhr, ajaxOptions, thrownError) {
        if(xhr.status == 404){
          $tableContainer.empty();
          $('.country-name').val('');
          $('<h1>').text('No Such Country!').addClass('error').appendTo('main');
        }
      }
    });
  }

  function showCountriesList(resp){
    const $error = $('.error');
    $tableContainer.empty();
    $error.remove();
    $('.country-name').val('');
    resp.forEach(function(item){
      let $tr = $('<tr>');
      $tr.append($('<img src=' + item.flag + '>'));
      $('<td>').text(item.name).appendTo($tr);
      $('<td>').text(item.capital).appendTo($tr);
      $('<td>').text(item.languages[0].name).appendTo($tr);
      $('<td>').text(item.currencies[0].code).appendTo($tr);

      $tr.appendTo($tableContainer);

    });
  }

  $('.search').click(searchCountries);
  $('body').keypress((e) => {
    if(e.keyCode == 13) {
      searchCountries();
    }
  });
});
