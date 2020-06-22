'use strict';

$('#burger-button').on('click', function () {
    $('.nav-column').toggleClass('hide');
});

//FULL TITLES QURAN

$.getJSON('http://api.alquran.cloud/v1/quran/ar.alafasy', titles);

function titles(name) {
    //console.log(name);
    let n = 1;
    for (let i = 0; i < name.data.surahs.length; i++) {
        $('.container').append('<a href="page.html?number='+i+'" class="display-names" data-id="' + i + '"><p>' + n + ')</p><p>' + name.data.surahs[i].name + '</p><p>/</p><p>' + name.data.surahs[i].englishName + '</p></a>');
        n++;
    }
};

