document.addEventListener('DOMContentLoaded', () => {
    const cadastroForm = document.getElementById('cadastro-form');
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const usernameInput = document.getElementById('username');
    const senhaInput = document.getElementById('senha');
    const mensagemDiv = document.getElementById('mensagem');

    cadastroForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = nomeInput.value;
        const email = emailInput.value;
        const username = usernameInput.value;
        const senha = senhaInput.value;

        let users = JSON.parse(localStorage.getItem('users')) || [];

        const userExists = users.some(user => user.username === username);
        const emailExists = users.some(user => user.email === email);

        if (userExists) {
            mensagemDiv.style.color = 'red';
            mensagemDiv.textContent = 'Nome de usuário já existe. Por favor, escolha outro.';
            return;
        }

        if (emailExists) {
            mensagemDiv.style.color = 'red';
            mensagemDiv.textContent = 'E-mail já cadastrado. Por favor, use outro.';
            return;
        }

        const newUser = {
            nome: nome,
            email: email,
            username: username,
            password: senha, 
            historico: [],
            estatisticas: {
                totalMinutos: 0,
                qtdPraticas: 0,
                media: 0
            }
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        mensagemDiv.style.color = 'green';
        mensagemDiv.textContent = 'Cadastro realizado com sucesso! Redirecionando para o login...';
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    });
});

