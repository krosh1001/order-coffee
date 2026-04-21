let beverageCount = 1;

// Функция для подсветки ключевых слов (Задание 7)
function highlightKeywords(text) {
    const keywords = ["срочно", "быстрее", "побыстрее", "скорее", "поскорее", "очень нужно"];
    let result = text;
    keywords.forEach(word => {
        // Используем регулярное выражение для поиска всех вхождений без учета регистра
        const regex = new RegExp(`(${word})`, 'gi');
        result = result.replace(regex, '<b>$1</b>');
    });
    return result;
}

// Слушатель для текстового поля (Задание 7)
document.addEventListener('input', (e) => {
    if (e.target.classList.contains('wish-input')) {
        const parentField = e.target.closest('.field');
        const output = parentField.querySelector('.wish-output');
        output.innerHTML = highlightKeywords(e.target.value);
    }
});

// Кнопка добавления напитка
document.querySelector('.add-button').addEventListener('click', () => {
    beverageCount++;
    const forms = document.querySelectorAll('.beverage');
    const lastForm = forms[forms.length - 1];
    const newForm = lastForm.cloneNode(true);

    newForm.querySelector('.beverage-count').textContent = `Напиток №${beverageCount}`;
    
    // Обновляем имена радиокнопок
    newForm.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.name = `milk-${beverageCount}`; 
    });

    // Очищаем поля в новой форме
    newForm.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    newForm.querySelector('.wish-input').value = '';
    newForm.querySelector('.wish-output').innerHTML = '';
    newForm.querySelector('select').value = 'capuccino';
    newForm.querySelectorAll('input[type="radio"]')[0].checked = true;

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

// Удаление напитка (через делегирование для новых кнопок)
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-button')) {
        if (document.querySelectorAll('.beverage').length > 1) {
            e.target.closest('.beverage').remove();
            recountBeverages();
        }
    }
});

function declension(number, words) {
    const cases = [2, 0, 1, 1, 1, 2];
    return words[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

// Кнопка "Готово" - сбор данных в таблицу
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
        const milkName = form.querySelector('input[type="radio"]:checked').parentElement.textContent.trim();
        const extras = Array.from(form.querySelectorAll('input[type="checkbox"]:checked'))
            .map(cb => cb.parentElement.textContent.trim()).join(', ');
        
        // Задание 8: Получаем текст из textarea и обрабатываем его
        const wishText = form.querySelector('.wish-input').value;
        const processedWish = highlightKeywords(wishText);

        const tr = document.createElement('tr');
        // Используем innerHTML, чтобы теги <b> сработали
        tr.innerHTML = `
            <td>${beverageName}</td>
            <td>${milkName}</td>
            <td>${extras || '-'}</td>
            <td>${processedWish || '-'}</td>
        `;
        tbody.appendChild(tr);
    });

    document.querySelector('.modal-overlay').classList.remove('hidden');
});

// Кнопка "Оформить" и валидация времени (Задание 9)
document.querySelector('.checkout-button').addEventListener('click', () => {
    const timeInput = document.querySelector('.order-time');
    if (!timeInput.value) {
        timeInput.style.borderColor = 'red';
        return;
    }

    const [hours, minutes] = timeInput.value.split(':').map(Number);
    const now = new Date();
    const selectedTime = new Date();
    selectedTime.setHours(hours, minutes, 0, 0);

    if (selectedTime <= now) {
        // Красим рамку в красный
        timeInput.style.borderColor = 'red';
        alert("Мы не умеем перемещаться во времени. Выберите время позже, чем текущее");
    } else {
        timeInput.style.borderColor = ''; // Сбрасываем цвет
        alert("Заказ принят!");
        document.querySelector('.modal-overlay').classList.add('hidden');
    }
});

// Закрытие модалки
document.querySelector('.modal-close').addEventListener('click', () => {
    document.querySelector('.modal-overlay').classList.add('hidden');
});