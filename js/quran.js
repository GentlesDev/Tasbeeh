'use strict';

let reprise = localStorage.getItem('quran-reading');

//FULL TITLES QURAN

$.getJSON('http://api.alquran.cloud/v1/quran/ar.alafasy', titles);

function titles(name) {
    //console.log(name);
    let n = 1;
    if (reprise !== null ) {
        $('.container').append('<a href="page.html?number='+reprise+'" id="bookmark">Reprendre la lecture</a>');
    }
    for (let i = 0; i < name.data.surahs.length; i++) {
        $('.container').append('<a href="page.html?number='+i+'" class="display-names" data-id="' + i + '"><p>' + n + ')</p><p>' + name.data.surahs[i].name + '</p><p>/</p><p>' + name.data.surahs[i].englishName + '</p></a>');
        n++;
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