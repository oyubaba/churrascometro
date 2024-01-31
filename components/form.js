// criação dos elementos
const rootDiv = document.createElement('div');
    rootDiv.id = 'root';

    const containerDiv = document.createElement('div');
    containerDiv.className = 'container';

    const h1Element = document.createElement('h1');
    h1Element.textContent = 'Churrascômetro';

    const calculatorDiv = document.createElement('div');
    calculatorDiv.className = 'calculator';

    const rowInputGroupDiv = document.createElement('div');
    rowInputGroupDiv.className = 'row input-form-group';

    const headerFormH1 = document.createElement('h1');
    headerFormH1.id = 'header-form';
    headerFormH1.textContent = 'Fique por dentro de todas as novidades. Cadastre seu e-mail e receba promoções especiais!';

    const formElement = document.createElement('form');

    const nameInput = createInput('text', 'name', 'Digite seu nome', 'input-form', true);
    const emailInput = createInput('email', 'email', 'Digite seu email', 'input-form', true);
    const postalCodeInput = createInput('number', 'postal-code', 'Digite seu CEP', 'input-form', true);

    const consentDiv = document.createElement('div');
    consentDiv.id = 'consent-input';

    const consentCheckbox = document.createElement('input');
    consentCheckbox.type = 'checkbox';
    consentCheckbox.id = 'consent-checkbox';
    consentCheckbox.name = 'optIn';
    consentCheckbox.checked = true;

    const consentLabel = document.createElement('label');
    consentLabel.setAttribute('for', 'consent-checkbox');
    consentLabel.id = 'consent-label';
    consentLabel.textContent = 'Concordo em receber comunicações e ofertas personalizadas de acordo com meus interesses.';

    const rowButtonDiv = document.createElement('div');
    rowButtonDiv.className = 'row';

    const registerLink = document.createElement('button');
    registerLink.type = 'submit';
    registerLink.className = 'default-button';
    registerLink.textContent = 'Cadastrar';

    formElement.appendChild(registerLink);

    registerLink.addEventListener('click', function (event) {
        event.preventDefault();
        validateFormAndSubmit();
    });

    const navContainerDiv = document.createElement('div');
    navContainerDiv.id = 'nav-container';

    const backButton = document.createElement('button');
    backButton.id = 'back-nav';
    backButton.textContent = 'Voltar';

    backButton.addEventListener('click', function () {
        window.location.href = 'index.html';
    });

    // adição dos elementos ao DOM
    rootDiv.appendChild(containerDiv);
    containerDiv.appendChild(h1Element);
    containerDiv.appendChild(calculatorDiv);
    calculatorDiv.appendChild(rowInputGroupDiv);
    rowInputGroupDiv.appendChild(headerFormH1);
    rowInputGroupDiv.appendChild(formElement);
    formElement.appendChild(nameInput);
    formElement.appendChild(emailInput);
    formElement.appendChild(postalCodeInput);
    formElement.appendChild(consentDiv);
    consentDiv.appendChild(consentCheckbox);
    consentDiv.appendChild(consentLabel);
    rowInputGroupDiv.appendChild(rowButtonDiv);
    rowButtonDiv.appendChild(registerLink);
    rowInputGroupDiv.appendChild(navContainerDiv);
    navContainerDiv.appendChild(backButton);
    document.body.appendChild(rootDiv);


// Funções

    function createInput(type, id, placeholder, className, required) {
        const inputElement = document.createElement('input');
        inputElement.type = type;
        inputElement.id = id;
        inputElement.name = id;
        inputElement.placeholder = placeholder;
        inputElement.className = className;
        inputElement.required = required;

        if (type === 'email' && required) {
            inputElement.pattern = '[^\s@]+@[^\s@]+\.[^\s@]+';
        }

        return inputElement;
    }


function validateForm() {
    let isValid = true;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const postalCodeInput = document.getElementById('postal-code');

    if (!nameInput.value.trim()) {
        isValid = false;
        markFieldAsInvalid(nameInput);
    } else {
        markFieldAsValid(nameInput);
    }

    if (!isValidEmail(emailInput.value)) {
        isValid = false;
        markFieldAsInvalid(emailInput);
    } else {
        markFieldAsValid(emailInput);
    }

    if (!postalCodeInput.value.trim()) {
        isValid = false;
        markFieldAsInvalid(postalCodeInput);
    } else {
        markFieldAsValid(postalCodeInput);
    }

    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function markFieldAsInvalid(field) {
    field.classList.add('invalid');
    field.style.border = '2px solid red';
}

function markFieldAsValid(field) {
    field.classList.remove('invalid');
    field.style.border = '1px solid #ccc';
}


async function validateFormAndSubmit() {
    const isValid = validateForm();

    if (isValid) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const postalCodeInput = document.getElementById('postal-code');
        const consentCheckbox = document.getElementById('consent-checkbox');

        const formData = {
            email: emailInput.value,
            name: nameInput.value,
            postalCode: postalCodeInput.value,
            optIn: consentCheckbox.checked,
        };

        try {
            const response = await fetch('https://churrascometro-api.vercel.app/leads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // flag para identificar se já foi enviado o form
                localStorage.setItem('formSubmitted', 'true');
                window.location.href = './result.html';
            } else {
                alert('Erro ao enviar os dados para a API. Por favor, tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao enviar os dados para a API:', error);
            alert('Erro ao enviar os dados para a API. Por favor, tente novamente.');
        }
    } else {
        alert('Formulário inválido. Por favor, corrija os campos destacados.');
    }
}





