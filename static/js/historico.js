document.addEventListener("DOMContentLoaded", () => {
    function loadHistorico() {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        const historicoTableBody = document.getElementById("historico-table-body");

        if (!currentUser) {
            window.location.href = "login.html";
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(u => u.username === currentUser.username);

        if (!user) {
            window.location.href = "login.html";
            return;
        }

        const userHistorico = user.historico || [];

        if (historicoTableBody) {
            historicoTableBody.innerHTML = ""; 
            if (userHistorico.length === 0) {
                historicoTableBody.innerHTML = `<tr><td colspan="3">Nenhuma prática registrada ainda.</td></tr>`;
            } else {
                userHistorico.forEach(pratica => {
                    const row = historicoTableBody.insertRow();
                    row.insertCell().textContent = pratica.data;
                    row.insertCell().textContent = pratica.exercicio;
                    row.insertCell().textContent = `${pratica.tempo_dedicado} min`;
                });
            }
        }
    }

    loadHistorico();
    window.addEventListener("storage", loadHistorico);
});

