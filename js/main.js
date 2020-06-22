'use strict';

$('#burger-button').on('click', function () {
    $('.nav-column').toggleClass('hide');
});

//RANDOM VERSE
let rand1 = Math.floor(Math.random()*114);
$.getJSON('http://api.alquran.cloud/v1/quran/ar.alafasy', verse);
function verse(response3) {
    let rand2 = Math.floor(Math.random() * response3.data.surahs[rand1 - 1].ayahs.length);
    $.getJSON('http://api.alquran.cloud/v1/ayah/' + rand1 + ':' + rand2, ayah);
    function ayah(response4) {
        $('.verse').html(response4.data.text + ' {' + response4.data.surah.number + ':' + response4.data.numberInSurah + '}')
    }
};
