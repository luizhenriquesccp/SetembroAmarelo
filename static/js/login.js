document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginError = document.getElementById('login-error');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = usernameInput.value;
        const password = passwordInput.value;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const foundUser = users.find(user => user.username === username && user.password === password);

        if (foundUser) {
            localStorage.setItem('currentUser', JSON.stringify(foundUser));
            alert('Login bem-sucedido!');
            window.location.href = '../index.html';
        } else {
            loginError.style.display = 'block';
        }
    });
});

