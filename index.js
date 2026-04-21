let beverageCount = 1;

document.querySelector('.add-button').addEventListener('click', () => {
    beverageCount++;
    
    const forms = document.querySelectorAll('.beverage');
    const lastForm = forms[forms.length - 1];
    const newForm = lastForm.cloneNode(true);

    // 1. Обновляем заголовок
    newForm.querySelector('.beverage-count').textContent = `Напиток №${beverageCount}`;
    
    // 2. Делаем группу радиокнопок уникальной для этой формы
    // Находим все радиокнопки в новой форме и меняем им name
    const radios = newForm.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => {
        radio.name = `milk-${beverageCount}`; 
    });

    // 3. Сбрасываем значения (опционально, чтобы новая форма была "чистой")
    newForm.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    newForm.querySelector('select').value = 'capuccino';
    radios[0].checked = true; // Выбираем обычное молоко по умолчанию

    // 4. Логика удаления
    const removeBtn = newForm.querySelector('.remove-button');
    removeBtn.onclick = () => {
        if (document.querySelectorAll('.beverage').length > 1) {
            newForm.remove();
            recountBeverages();
        }
    };

    // Вставляем в контейнер
    document.querySelector('.beverages-container').appendChild(newForm);
});

function recountBeverages() {
    const forms = document.querySelectorAll('.beverage');
    forms.forEach((form, index) => {
        const displayIndex = index + 1;
        form.querySelector('.beverage-count').textContent = `Напиток №${displayIndex}`;
        
        // Также обновляем имена радиокнопок, чтобы они соответствовали номеру
        form.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.name = `milk-${displayIndex}`;
        });
    });
}

// Обработчик для самой первой кнопки (из исходного HTML)
document.querySelector('.remove-button').onclick = function() {
    if (document.querySelectorAll('.beverage').length > 1) {
        this.closest('.beverage').remove();
        recountBeverages();
    }
};