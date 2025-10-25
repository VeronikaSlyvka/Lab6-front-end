document.addEventListener('DOMContentLoaded', () => {

    const loadButton = document.getElementById('load-user-btn');
    const userContainer = document.getElementById('user-container');

    loadButton.addEventListener('click', () => {
        fetchUserData();
    });

    function fetchUserData() {
        fetch('https://randomuser.me/api')

            .then(response => {
                if (!response.ok) {
                    throw new Error('Помилка мережі: ' + response.statusText);
                }
                return response.json();
            })

            .then(data => {
                const user = data.results[0];
                displayUser(user);
            })

            .catch(error => {
                console.error('Не вдалося отримати дані:', error);
                userContainer.innerHTML += '<p>Не вдалося завантажити дані. Спробуйте ще раз.</p>';
            });
    }

    function displayUser(user) {
        
        const picture = user.picture.medium;
        const name = `${user.name.first} ${user.name.last}`;
        const city = user.location.city;
        const postcode = user.location.postcode;
        const phone = user.phone;

        const card = document.createElement('div');
        card.className = 'user-card';

        card.innerHTML = `
            <img src="${picture}" alt="Фото користувача ${name}">
            <h3>${name}</h3>
            <p><strong>Місто:</strong> ${city}</p>
            <p><strong>Поштовий індекс:</strong> ${postcode}</p>
            <p><strong>Телефон:</strong> ${phone}</p>
        `;

        userContainer.appendChild(card);
    }
});