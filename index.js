let beverageCount = 1;

document.querySelector('.add-button').addEventListener('click', () => {
    beverageCount++;
    
    const forms = document.querySelectorAll('.beverage');
    const lastForm = forms[forms.length - 1];
    const newForm = lastForm.cloneNode(true);

    newForm.querySelector('.beverage-count').textContent = `Напиток №${beverageCount}`;
    
    const radios = newForm.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => {
        radio.name = `milk-${beverageCount}`; 
    });

    newForm.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    newForm.querySelector('select').value = 'capuccino';
    radios[0].checked = true;

    const removeBtn = newForm.querySelector('.remove-button');
    removeBtn.onclick = () => {
        if (document.querySelectorAll('.beverage').length > 1) {
            newForm.remove();
            recountBeverages();
        }
    };

    document.querySelector('.beverages-container').appendChild(newForm);
});

function recountBeverages() {
    const forms = document.querySelectorAll('.beverage');
    forms.forEach((form, index) => {
        const displayIndex = index + 1;
        form.querySelector('.beverage-count').textContent = `Напиток №${displayIndex}`;
        
        form.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.name = `milk-${displayIndex}`;
        });
    });
}

document.querySelector('.remove-button').onclick = function() {
    if (document.querySelectorAll('.beverage').length > 1) {
        this.closest('.beverage').remove();
        recountBeverages();
    }
};

function declension(number, words) {
    const cases = [2, 0, 1, 1, 1, 2];
    return words[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

document.querySelector('.submit-button').addEventListener('click', (e) => {
    e.preventDefault();

    const forms = document.querySelectorAll('.beverage');
    const count = forms.length;

    const beverageWord = declension(count, ['напиток', 'напитка', 'напитков']);
    document.querySelector('.modal-text').textContent = `Вы заказали ${count} ${beverageWord}`;

    const tbody = document.querySelector('.modal-table tbody');
    tbody.innerHTML = '';

    forms.forEach(form => {
        const select = form.querySelector('select');
        const beverageName = select.options[select.selectedIndex].text;

        const milkRadio = form.querySelector('input[type="radio"]:checked');
        const milkName = milkRadio ? milkRadio.parentElement.textContent.trim() : '';

        const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');
        const extras = Array.from(checkboxes).map(cb => cb.parentElement.textContent.trim()).join(', ');

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${beverageName}</td>
            <td>${milkName}</td>
            <td>${extras || '-'}</td>
        `;
        tbody.appendChild(tr);
    });

    document.querySelector('.modal-overlay').classList.remove('hidden');
});

document.querySelector('.modal-close').addEventListener('click', () => {
    document.querySelector('.modal-overlay').classList.add('hidden');
});

document.querySelector('.modal-overlay').addEventListener('click', (e) => {
    if (e.target === document.querySelector('.modal-overlay')) {
        document.querySelector('.modal-overlay').classList.add('hidden');
    }
});