// criação dos elementos
const rootDiv = document.createElement('div');
rootDiv.id = 'root';

const containerDiv = document.createElement('div');
containerDiv.className = 'container';

const h1Element = document.createElement('h1');
h1Element.textContent = 'Churrascômetro';

const calculatorDiv = document.createElement('div');
calculatorDiv.className = 'calculator';

const resultTotalGuestDiv = document.createElement('div');
resultTotalGuestDiv.className = 'result-total-guest';

const h3ResultTotalGuest = document.createElement('h3');
h3ResultTotalGuest.textContent = 'Confira a lista para o seu churrasco!';

const pTotalGuest = document.createElement('p');
pTotalGuest.id = 'total-guest';
pTotalGuest.textContent = '0 convidado';

const spanGuestList1 = createGuestList('0 Homens');
const spanGuestList2 = createGuestList('0 Mulheres');
const spanGuestList3 = createGuestList('0 Crianças');

const inputGroupResultDiv = document.createElement('div');
inputGroupResultDiv.className = 'input-group-result';

const headerResultDiv = document.createElement('div');
headerResultDiv.id = 'header-result';

const pHeaderItem = document.createElement('p');
pHeaderItem.textContent = 'ITEM';

const pHeaderQuantity = document.createElement('p');
pHeaderQuantity.textContent = 'QUANTIDADE';

const ulResults = document.createElement('ul');
ulResults.className = 'results';

const results = [
    { item: 'Carne', quantity: '0.000 kg' },
    { item: 'Pão de alho', quantity: '0 unidade' },
    { item: 'Carvão', quantity: '0.000 kg' },
    { item: 'Sal', quantity: '0.000 kg' },
];

results.forEach(result => {
    const liElement = document.createElement('li');
    const strongElement = document.createElement('strong');
    strongElement.textContent = result.item;
    const spanElement = document.createElement('span');
    spanElement.textContent = result.quantity;
    liElement.appendChild(strongElement);
    liElement.appendChild(spanElement);
    ulResults.appendChild(liElement);
});

const rowResultButtonDiv = document.createElement('div');
rowResultButtonDiv.className = 'row';

const newCalculationLink = document.createElement('button');
newCalculationLink.className = 'default-button';
newCalculationLink.textContent = 'Novo cálculo';

newCalculationLink.addEventListener('click', function () {
    localStorage.removeItem('counterValues');
    window.location.href = 'index.html';
});

// adição dos elementos ao DOM
rootDiv.appendChild(containerDiv);
containerDiv.appendChild(h1Element);
containerDiv.appendChild(calculatorDiv);
calculatorDiv.appendChild(resultTotalGuestDiv);
resultTotalGuestDiv.appendChild(h3ResultTotalGuest);
resultTotalGuestDiv.appendChild(pTotalGuest);
resultTotalGuestDiv.appendChild(spanGuestList1);
resultTotalGuestDiv.appendChild(spanGuestList2);
resultTotalGuestDiv.appendChild(spanGuestList3);
calculatorDiv.appendChild(inputGroupResultDiv);
inputGroupResultDiv.appendChild(headerResultDiv);
headerResultDiv.appendChild(pHeaderItem);
headerResultDiv.appendChild(pHeaderQuantity);
inputGroupResultDiv.appendChild(ulResults);
calculatorDiv.appendChild(rowResultButtonDiv);
rowResultButtonDiv.appendChild(newCalculationLink);
document.body.appendChild(rootDiv);




// Funções

function createGuestList(text) {
    const spanGuestList = document.createElement('span');
    spanGuestList.className = 'guest-list';
    spanGuestList.textContent = text;
    return spanGuestList;
}

function getSavedCounterValues() {
    const savedValues = localStorage.getItem('counterValues');
    return savedValues ? JSON.parse(savedValues) : { homens: 0, mulheres: 0, criancas: 0 };
}

const savedCounterValues = getSavedCounterValues();

spanGuestList1.textContent = savedCounterValues.homens + ' Homens';
spanGuestList2.textContent = savedCounterValues.mulheres + ' Mulheres';
spanGuestList3.textContent = savedCounterValues.criancas + ' Crianças';


function calculateResults() {
    const savedCounterValues = getSavedCounterValues();

    // cálculos
    const carneQuantidade = 0.4 * savedCounterValues.homens + 0.32 * savedCounterValues.mulheres + 0.20 * savedCounterValues.criancas;
    const paoDeAlhoQuantidade = 2 * (savedCounterValues.homens + savedCounterValues.mulheres) + savedCounterValues.criancas;
    const carvaoQuantidade = savedCounterValues.homens + savedCounterValues.mulheres + savedCounterValues.criancas;
    const salQuantidade = 0.04 * (savedCounterValues.homens + savedCounterValues.mulheres + savedCounterValues.criancas);


    // atualiza os resultados
    document.getElementById('total-guest').textContent = `${savedCounterValues.homens + savedCounterValues.mulheres + savedCounterValues.criancas} convidados`;
    spanGuestList1.textContent = `${savedCounterValues.homens} Homens`;
    spanGuestList2.textContent = `${savedCounterValues.mulheres} Mulheres`;
    spanGuestList3.textContent = `${savedCounterValues.criancas} Crianças`;

    results[0].quantity = `${carneQuantidade.toFixed(3)} kg`;
    results[1].quantity = `${paoDeAlhoQuantidade} unidades`;
    results[2].quantity = `${carvaoQuantidade} kg`;
    results[3].quantity = `${salQuantidade.toFixed(3)} kg`;

    pTotalGuest.textContent = `${savedCounterValues.homens + savedCounterValues.mulheres + savedCounterValues.criancas} convidados`;

    ulResults.innerHTML = '';
    results.forEach(result => {
        const liElement = document.createElement('li');
        const strongElement = document.createElement('strong');
        strongElement.textContent = result.item;
        const spanElement = document.createElement('span');
        spanElement.textContent = result.quantity;
        liElement.appendChild(strongElement);
        liElement.appendChild(spanElement);
        ulResults.appendChild(liElement);
    });
}
calculateResults();


