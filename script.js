'use strict';

const currencySelect = document.getElementById('currency-select');
const input = document.getElementById('input-left');
const resultInput = document.querySelector('.result');
const orderChanger = document.querySelector('.currency-order');
const calcBtn = document.querySelector('.calc');
const textLeft = document.getElementById('text-left');
const textRight = document.getElementById('text-right');

let currency;
let amount;
let result;
//let currencyId;
let isChecked = false;
let text1 = 'Российский рубль (RUB)';
let text2 = 'Доллар США (USD)';
let text3 = 'ЕВРО (EUR)';


currencySelect.addEventListener('change', () => {
    currency = currencySelect.value === 'dollar' ? 'USD' : 'EUR';
    textLeft.textContent = currencySelect.value === 'dollar' ? text2 : text3;
    input.value = '';
    resultInput.value = '';
});

orderChanger.addEventListener('click', () => {
    let a = document.createElement('span');
    a.textContent = 'Check';

    if (orderChanger.checked == true) {
        textLeft.replaceWith(a);
        textRight.replaceWith(textLeft);
        a.replaceWith(textRight);
        isChecked = true;
    } else {
        textLeft.replaceWith(a);
        textRight.replaceWith(textLeft);
        a.replaceWith(textRight);
        isChecked = false;
    }

    input.value = '';
    resultInput.value = '';
});


calcBtn.addEventListener('click', (e) => {
    amount = input.value;
    currency = currencySelect.value === 'dollar' ? 'USD' : 'EUR';

    let myHeaders = new Headers();
    myHeaders.append("apikey", "GuESxdv5y2qKaQrrnIFd68X6AG3DCUvB");

    let requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    const rateCalculate = (to, from) => {
        fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`,
         requestOptions)
                    .then(response => response.json())
                    .then(data => resultInput.value = data.result.toFixed(2))
                    .catch(error => console.log('error', error));
    };

    if (!isChecked) {
        if (currency === 'USD') {
            rateCalculate('RUB', 'USD');
        }

        if (currency === 'EUR') {
            rateCalculate('RUB', 'EUR');
        }

    } else {

        if (currency === 'USD') {
            rateCalculate('USD', 'RUB');
        }

        if (currency === 'EUR') {
            rateCalculate('EUR', 'RUB');
        }
    }
});