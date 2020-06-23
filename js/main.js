'use strict';

// let percent = 0;
// let fill = 0;

// setInterval(() => {
//     if (percent != 100) {
//         $('#percent').html(percent++ + '%');
//         fill += 1
//         $('#fill').css('width', fill + '%');
//     } else if (percent === 100) {
//         $('#bar-container').css('display', 'none');
//     }
// }, 10000);
// var sendDate = (new Date()).getTime();

// $.ajax({
     //type: "GET", //with response body
//     type: "HEAD", //only headers
//     url: "http://api.alquran.cloud/v1/quran/ar.alafasy",
//     success: function () {

//         var receiveDate = (new Date()).getTime();

//         var responseTimeMs = receiveDate - sendDate;

//         console.log(responseTimeMs);

//     }
// });

//RANDOM VERSE
let rand1;
let rand2;
do {
    rand1 = Math.floor(Math.random() * 114);
} while (rand1 == 0);
$.getJSON('http://api.alquran.cloud/v1/quran/ar.alafasy', verse);
function verse(response3) {
    do {
        rand2 = Math.floor(Math.random() * response3.data.surahs[rand1 - 1].ayahs.length);
    } while (rand2 == 0);
    $.getJSON('http://api.alquran.cloud/v1/ayah/' + rand1 + ':' + rand2, ayah);
    function ayah(response4) {
        $('.verse').html(response4.data.text + ' {' + response4.data.surah.number + ':' + response4.data.numberInSurah + '}')
    }
};
