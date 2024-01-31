// Criação dos elementos
const rootDiv = document.createElement('div');
rootDiv.id = 'root';

const containerDiv = document.createElement('div');
containerDiv.className = 'container';

const h1Element = document.createElement('h1');
h1Element.textContent = 'Churrascômetro';

const calculatorDiv = document.createElement('div');
calculatorDiv.className = 'calculator';

const h3Element = document.createElement('h3');
h3Element.innerHTML = 'Precisa de uma ajudinha com o churrasco? :) <br><br> Quantas pessoas vão participar?';

const countersDiv = document.createElement('div');
countersDiv.className = 'counters';

const rowDiv = document.createElement('div');
rowDiv.className = 'row';

const calculateLink = document.createElement('button');
// calculateLink.href = './form.html';
calculateLink.className = 'default-button';
calculateLink.textContent = 'Calcular';

// Adição dos elementos ao DOM
rootDiv.appendChild(containerDiv);
containerDiv.appendChild(h1Element);
containerDiv.appendChild(calculatorDiv);
calculatorDiv.appendChild(h3Element);
calculatorDiv.appendChild(countersDiv);
calculatorDiv.appendChild(rowDiv);
rowDiv.appendChild(calculateLink);

document.body.appendChild(rootDiv);





// Funções

function incrementCounter(inputElement) {
    const currentValue = parseInt(inputElement.value, 10);
    if (!isNaN(currentValue) && currentValue >= 0) {
        inputElement.value = currentValue + 1;
    }
}

function decrementCounter(inputElement) {
    const currentValue = parseInt(inputElement.value, 10);
    if (!isNaN(currentValue) && currentValue > 0) {
        inputElement.value = currentValue - 1;
    }
}

function createCounter(labelText, id) {
    const counterDiv = document.createElement('div');
    counterDiv.className = 'counter';

    const labelElement = document.createElement('label');
    labelElement.setAttribute('for', id);
    labelElement.textContent = labelText;

    const inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'number');
    inputElement.id = id;
    inputElement.value = '0';

    inputElement.addEventListener('input', function () {
        validateInput(inputElement);
    });

    const buttonGroupDiv = document.createElement('div');
    buttonGroupDiv.className = 'button-group';

    const minusButton = document.createElement('button');
    minusButton.className = 'input-group__button--small';
    minusButton.textContent = '-';

    const plusButton = document.createElement('button');
    plusButton.className = 'input-group__button--small';
    plusButton.textContent = '+';

    minusButton.addEventListener('click', function () {
        decrementCounter(inputElement);
    });

    plusButton.addEventListener('click', function () {
        incrementCounter(inputElement);
    });

    buttonGroupDiv.appendChild(minusButton);
    buttonGroupDiv.appendChild(plusButton);

    counterDiv.appendChild(labelElement);
    counterDiv.appendChild(inputElement);
    counterDiv.appendChild(buttonGroupDiv);

    countersDiv.appendChild(counterDiv);
}

createCounter('Homens', 'Homens');
createCounter('Mulheres', 'Mulheres');
createCounter('Crianças', 'Crianças');

function validateInput(inputElement) {
    const currentValue = inputElement.value.trim();
    const intValue = parseInt(currentValue, 10);

    if (isNaN(intValue) || intValue < 0) {
        inputElement.value = '0';
    } else {
        inputElement.value = intValue;
    }
}

function getCounterValues() {
    const homens = parseInt(document.getElementById('Homens').value, 10);
    const mulheres = parseInt(document.getElementById('Mulheres').value, 10);
    const criancas = parseInt(document.getElementById('Crianças').value, 10);

    return { homens, mulheres, criancas };
}

calculateLink.addEventListener('click', function () {
    const counterValues = getCounterValues();
    localStorage.setItem('counterValues', JSON.stringify(counterValues));
});

calculateLink.addEventListener('click', function () {
    const formSubmitted = localStorage.getItem('formSubmitted');
    const counterValues = getCounterValues();

    if (counterValues.homens + counterValues.mulheres + counterValues.criancas === 0) {
        alert('Adicione pelo menos uma pessoa para calcular!');
        throw new Error('Pelo menos uma pessoa deve participar!');
    } else {
        if (formSubmitted === 'true') {
            window.location.href = './result.html';
        } else {
            window.location.href = './form.html';
        }
    }
});

