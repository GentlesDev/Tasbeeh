'use strict';

let url_string = window.location.href;
let url = new URL(url_string);
let params = url.searchParams.get("number");
//console.log(params);
let prev1 = params;
let next1 = params;
let reprise = localStorage.getItem('quran-reading');
localStorage.setItem('quran-reading', params);
//FULL QURAN

$.getJSON('http://api.alquran.cloud/v1/quran/ar.alafasy', arabic);

function arabic(response) {
    //TRAD FULL QURAN

    $.getJSON('http://api.alquran.cloud/v1/quran/fr.hamidullah', trad);
    function trad(response2) {
        //console.log(next + 1);
        if (prev1-- > 0) {
            let prev2 = prev1--;
            //console.log(prev);
            $('.controls').append('<a id="prev" href="page.html?number=' + prev2 + '">Sourate Précédente</a>');
        }
        $('.controls').append('<a href="quran.html">Retour</a>');
        if (next1++ < response2.data.surahs.length-1) {
            let next2 = next1++;
            $('.controls').append('<a id="next" href="page.html?number=' + next2 + '">Sourate Suivante</a>');
            //console.log(next2, response2.data.surahs.length);
        }
        
        $('.container').html('');
        //Coran trad
        //console.log(response2.data.surahs[params].ayahs.length);
        //console.log(params);
        
        $('.title-main').html(response.data.surahs[params].name + ' / ' + response.data.surahs[params].englishName);
        $('.container').append('<div class="quran-part">');
        for (let j = 0; j < response.data.surahs[params].ayahs.length; j++) {
            $('.quran-part').append('<p class="' + j + '" data-id="' + j + '" style:"text-align: right;">' + response.data.surahs[params].ayahs[j].text + ': ' + j + '</p>');
            $('.quran-part').append('<p class="' + j + '" data-id="' + j + '" style:"text-align: left;">' + j + ': ' + response2.data.surahs[params].ayahs[j].text + '</p>');
        }
        $('.quran-part p[data-id=0]').addClass('current');
        $('.container').append('</div>');
    }
    $('#translation').on('change', () => {
        $.getJSON('http://api.alquran.cloud/v1/quran/' + $('select').val(), trad);
        function trad(response2) {
            $('.container').html('');
            //Coran trad
            //console.log(trad);
            $('.container').append('<div class="quran-part">')
            for (let j = 0; j < response2.data.surahs[params].ayahs.length; j++) {
                $('.quran-part').append('<p class="' + j + '" data-id="' + j + '" style:"text-align: right;">' + response.data.surahs[params].ayahs[j].text + ': ' + j + '</p>');
                $('.quran-part').append('<p class="' + j + '" data-id="' + j + '" style:"text-align: left;">' + j + ': ' + response2.data.surahs[params].ayahs[j].text + '</p>');
            }
            $('.container').append('</div>')
        }
    });
    //console.log(response);
};


//AUDIO FULL QURAN

let audios = [];
$.getJSON('http://api.alquran.cloud/v1/quran/ar.alafasy', audio);
function audio(response5) {
    let number = 0;
    //console.log(response5.data.surahs[10].ayahs[0].audioSecondary[0]);
    for (let a = 0; a < response5.data.surahs[params].ayahs.length; a++) {
        audios.push(response5.data.surahs[params].ayahs[a].audioSecondary[0]);
    }
    // console.log(audios.length);
    //console.log(audios);
    //console.log(audios[6]);
    //console.log(audios[audios.length]);

    $('.audio').attr('src', audios[number]);
    $(document).on('click', 'p', function () {
        //console.log($(this).data('id'));
        number = $(this).data('id');
        $('.audio').attr('src', audios[$(this).data('id')]);
        $('.current').removeClass('current');
        $('.' + $(this).data('id')).addClass('current');
    });
    $('.current').removeClass('current');
    $('.' + number).addClass('current');
    $('.audio').on('ended', function () {
        //console.log('fini');
        number++;
        if (audios[number] == audios[audios.length]) {
            number = 0;
            $('.audio').attr('autoplay', 'off');
            //console.log('fin');
        }
        $('.current').removeClass('current');
        $('.' + number).addClass('current');
        $('.audio').attr('src', audios[number]);
        $('.audio').attr('autoplay', 'on');
    });
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

$('body').css('overflow', 'hidden');
$('#translation').css('display', 'none');
$('.audio').css('display', 'none');

setInterval(() => {
    if (responseTimeMs === undefined) {
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
        setTimeout(()=>{
            $('#bar-container').css('display', 'none');
            $('#translation').css('display', 'block');
            $('.audio').css('display', 'block');
            $('body').css('overflow', 'auto');
        },3000)
    }
}, 100);
