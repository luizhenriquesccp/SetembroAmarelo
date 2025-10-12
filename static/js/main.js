document.addEventListener("DOMContentLoaded", () => {
    const logoutLink = document.getElementById("logout-link") || document.getElementById("logout-link-h") || document.getElementById("logout-link-ex");
    const loginLink = document.getElementById("login-link") || document.getElementById("login-link-h") || document.getElementById("login-link-ex");
    const userNameHero = document.getElementById("user-name-hero");
    const userNameExercises = document.getElementById("user-name-exercises");

    const totalMinutosSpan = document.getElementById("total-minutos");
    const qtdPraticasSpan = document.getElementById("qtd-praticas");
    const mediaPraticaSpan = document.getElementById("media-pratica");

    function updateUI() {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));

        if (currentUser) {
            if (logoutLink) logoutLink.style.display = "inline";
            if (loginLink) loginLink.style.display = "none";
            if (userNameHero) userNameHero.textContent = currentUser.nome;
            if (userNameExercises) userNameExercises.textContent = currentUser.nome;

            if (totalMinutosSpan) totalMinutosSpan.textContent = currentUser.estatisticas.totalMinutos || 0;
            if (qtdPraticasSpan) qtdPraticasSpan.textContent = currentUser.estatisticas.qtdPraticas || 0;
            if (mediaPraticaSpan) mediaPraticaSpan.textContent = (currentUser.estatisticas.media || 0).toFixed(2);

        } else {
            if (logoutLink) logoutLink.style.display = "none";
            if (loginLink) loginLink.style.display = "inline";
            if (userNameHero) userNameHero.textContent = "visitante";
            if (userNameExercises) userNameExercises.textContent = "visitante";

            if (totalMinutosSpan) totalMinutosSpan.textContent = "0";
            if (qtdPraticasSpan) qtdPraticasSpan.textContent = "0";
            if (mediaPraticaSpan) mediaPraticaSpan.textContent = "0.00";
        }
    }

    updateUI();

    if (logoutLink) {
        logoutLink.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("currentUser");
            alert("Você foi desconectado.");
            window.location.href = "../index.html";
        });
    }

    window.addEventListener("storage", updateUI);
});

