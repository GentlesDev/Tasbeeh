'use strict';

$('#burger-button').on('click', function () {
    $('.nav-column').toggleClass('hide');
});

let url_string = window.location.href;
let url = new URL(url_string);
let params = url.searchParams.get("number");
console.log(params);


//FULL QURAN

$.getJSON('http://api.alquran.cloud/v1/quran/ar.alafasy', arabic);

function arabic(response) {
    //TRAD FULL QURAN

    $.getJSON('http://api.alquran.cloud/v1/quran/fr.hamidullah', trad);
    function trad(response2) {
        console.log(params);
        if (params - 1 >= 0) {
            let prev = params--;
            $('#prev').append('<a href="page.html?number=' + prev + '">sourate précédente</a>');
        }
        if (params + 1 < response2.data.surahs.length) {
            let next = params++;
            $('#next').append('<a href="page.html?number=' + next + '">sourate suivante</a>');
        }
        $('.container').html('');
        //Coran trad
        //console.log(response2.data.surahs[params].ayahs.length);
        console.log(params);
        
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
            console.log('fin');

        }
        $('.current').removeClass('current');
        $('.' + number).addClass('current');
        $('.audio').attr('src', audios[number]);
        $('.audio').attr('autoplay', 'on');
    });
};
