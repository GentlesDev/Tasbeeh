'use strict';
$('#burger-button').on('click', function () {
    $('.nav-column').toggleClass('hide');
});


let tasbeeh = document.querySelector('.tasbeeh');
let span1 = document.getElementById('1');
let span2 = document.getElementById('2');
let span3 = document.getElementById('3');
let span4 = document.getElementById('4');
let reset = document.querySelector('.reset');
let counter = localStorage.getItem('tasbeehcounter');
let number;
let result = [];

function counterStart() {
    number = counter.toString();
    switch (true) {
        case (counter < 10):
            span4.innerHTML = counter;
            //console.log(counter);
            //console.log(number);
            break;
        case (counter >= 10 && counter < 100):
            result = [];
            for (let i = 0; i < number.length; i++) {
                result.push(+number.charAt(i));
            }
            //console.log('1er chiffre:', result[0], '2e chiffre',result[1]);
            span4.innerHTML = result[1];
            span3.innerHTML = result[0];
            break;
        case (counter >= 100 && counter < 1000):
            result = [];
            for (let i = 0; i < number.length; i++) {
                result.push(+number.charAt(i));
            }
            console.log('1er chiffre:', result[0], '2e chiffre', result[1], '3e chiffre:', result[2]);
            span4.innerHTML = result[2];
            span3.innerHTML = result[1];
            span2.innerHTML = result[0];
            break;
        case (counter >= 1000 && counter <= 9999):
            result = [];
            for (let i = 0; i < number.length; i++) {
                result.push(+number.charAt(i));
            }
            span4.innerHTML = result[3];
            span3.innerHTML = result[2];
            span2.innerHTML = result[1];
            span1.innerHTML = result[0];
            //console.log('1er chiffre:', result[0], '2e chiffre', result[1]);
            //pan4.innerHTML = counter;
            break;
        case (counter > 9999):
            counter = 1;
            span4.innerHTML = counter;
            span3.innerHTML = '';
            span2.innerHTML = '';
            span1.innerHTML = '';
            break;
    }
}

tasbeeh.addEventListener('click', () => {
    counter++;
    localStorage.setItem('tasbeehcounter', counter);
    localStorage.getItem('tasbeehcounter');
    //console.log(number);
    //console.log(result);
    //console.log(counter);
    counterStart();
});

reset.addEventListener('click', () => {
    counter = 0;
    localStorage.setItem('tasbeehcounter', counter);
    localStorage.getItem('tasbeehcounter');
    span4.innerHTML = counter;
    span3.innerHTML = '';
    span2.innerHTML = '';
    span1.innerHTML = '';
});

counterStart();
