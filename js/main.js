'use strict';

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

let percent = 0;
let fill = 0;

let sendDate = (new Date()).getTime();
let responseTimeMs;
$.ajax({
    type: "GET", //with response body
    //type: "HEAD", //only headers
    url: "http://api.alquran.cloud/v1/quran/ar.alafasy",
    success: function () {
        var receiveDate = (new Date()).getTime();

        responseTimeMs = receiveDate - sendDate;

        console.log(responseTimeMs);
        return responseTimeMs;
    }
});


setInterval(() => {
    if (responseTimeMs === undefined) {
        $('body').css('overflow', 'hidden');
        if (percent != 100) {
            $('#percent').html(percent++ + '%');
            fill++;
            $('#fill').css('width', fill + '%');
        } else if (percent === 100) {
            $('#percent').html('100%');
            $('#fill').css('width', '500px');
            $('#bar').css('color', 'white');
            $('#bar').html('Please Wait');
        }
    } else {
        $('#bar-container').css('display', 'none');
        $('body').css('overflow', 'auto');
    }
}, 100);
