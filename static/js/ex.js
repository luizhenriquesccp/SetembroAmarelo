document.addEventListener("DOMContentLoaded", () => {
    const breathCircle = document.getElementById("breathCircle");
    const btnIniciar = document.getElementById("btnIniciar");
    const btnPausar = document.getElementById("btnPausar");
    const btnTerminar = document.getElementById("btnTerminar");
    const tempoTotalDisplay = document.getElementById("tempoTotal");
    const exerciseNameDisplay = document.getElementById("exercise-name");
    const exerciseDescriptionDisplay = document.getElementById("exercise-description");
    const exerciseListBox = document.getElementById("exercise-list");

    let timerInterval;
    let totalSeconds = 0;
    let isPaused = false;
    let currentExercise = null;

    const exercises = [
        {
            name: "Respiração Diafragmática (ou abdominal)",
            duration: 5,
            description: "Inspire pelo nariz enchendo o abdômen.<br>Expire lentamente pela boca, esvaziando a barriga.<br><b>Foco:</b> relaxamento profundo."
        },
        {
            name: "Respiração 4-7-8",
            duration: 5,
            description: "Inspire pelo nariz em 4 segundos.<br>Segure o ar por 7 segundos.<br>Expire pela boca em 8 segundos.<br><b>Foco:</b> controle da ansiedade e indução do sono."
        },
        {
            name: "Respiração Quadrada (Box Breathing)",
            duration: 5,
            description: "Inspire em 4 segundos.<br>Segure por 4 segundos.<br>Expire em 4 segundos.<br>Segure sem ar por 4 segundos.<br><b>Foco:</b> concentração e calma (muito usada por atletas e militares)."
        },
        {
            name: "Respiração Alternada (Nadi Shodhana – Yoga)",
            duration: 5,
            description: "Feche a narina direita com o dedo e inspire pela esquerda.<br>Feche a esquerda e expire pela direita.<br>Inspire pela direita, expire pela esquerda.<br>Repita.<br><b>Foco:</b> equilíbrio energético e mental."
        },
        {
            name: "Respiração Contada Simples",
            duration: 5,
            description: "Inspire profundamente contando até 5.<br>Expire contando até 5.<br><b>Foco:</b> ritmo e equilíbrio da mente."
        },
        {
            name: "Respiração Profunda com Expiração Prolongada",
            duration: 5,
            description: "Inspire em 4 segundos.<br>Expire lentamente em 6 a 8 segundos.<br><b>Foco:</b> reduzir estresse rapidamente."
        }
    ];

    function loadExercise(exercise) {
        currentExercise = exercise;
        exerciseNameDisplay.innerHTML = exercise.name;
        exerciseDescriptionDisplay.innerHTML = exercise.description;
        resetTimer();
        stopBreathingAnimation();
    }

    function populateExerciseList() {
        exerciseListBox.innerHTML = "";
        exercises.forEach(ex => {
            const div = document.createElement("div");
            div.classList.add("ex-card");
            div.innerHTML = `
                <strong>${ex.name}</strong>
                <div class="ex-info">
                    Duração: ${ex.duration} min
                </div>
                <div class="ex-info">
                    ${ex.description}
                </div>
                <button class="btn-escolha" data-exercise-name="${ex.name}">Escolher</button>
            `;
            exerciseListBox.appendChild(div);
        });

        document.querySelectorAll(".btn-escolha").forEach(button => {
            button.addEventListener("click", (e) => {
                const selectedExerciseName = e.target.dataset.exerciseName;
                const selectedExercise = exercises.find(ex => ex.name === selectedExerciseName);
                if (selectedExercise) {
                    loadExercise(selectedExercise);
                }
            });
        });
    }

    function startTimer() {
        if (!timerInterval) {
            timerInterval = setInterval(() => {
                if (!isPaused) {
                    totalSeconds++;
                    updateTimerDisplay();
                }
            }, 1000);
            startBreathingAnimation();
        }
    }

    function pauseTimer() {
        isPaused = !isPaused;
        if (isPaused) {
            btnPausar.textContent = "CONTINUAR";
            stopBreathingAnimation();
        } else {
            btnPausar.textContent = "PAUSAR";
            startBreathingAnimation();
        }
    }

    function resetTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
        totalSeconds = 0;
        isPaused = false;
        updateTimerDisplay();
        btnPausar.textContent = "PAUSAR";
    }

    function updateTimerDisplay() {
        const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
        const seconds = String(totalSeconds % 60).padStart(2, "0");
        tempoTotalDisplay.textContent = `TEMPO TOTAL:  ${minutes}:${seconds}`;
    }

    function startBreathingAnimation() {
        breathCircle.style.animation = "breathing 8s infinite ease-in-out";
    }

    function stopBreathingAnimation() {
        breathCircle.style.animation = "none";
    }

    function saveExerciseToHistory() {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (!currentUser) {
            alert("Você precisa estar logado para salvar o histórico.");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const userIndex = users.findIndex(user => user.username === currentUser.username);

        if (userIndex !== -1) {
            const pratica = {
                data: new Date().toLocaleDateString("pt-BR"),
                exercicio: currentExercise.name,
                tempo_dedicado: Math.round(totalSeconds / 60) // Salvar em minutos
            };

            users[userIndex].historico = users[userIndex].historico || [];
            users[userIndex].historico.push(pratica);

            // Atualizar estatísticas
            users[userIndex].estatisticas.totalMinutos = (users[userIndex].estatisticas.totalMinutos || 0) + pratica.tempo_dedicado;
            users[userIndex].estatisticas.qtdPraticas = (users[userIndex].estatisticas.qtdPraticas || 0) + 1;
            users[userIndex].estatisticas.media = users[userIndex].estatisticas.totalMinutos / users[userIndex].estatisticas.qtdPraticas;

            localStorage.setItem("users", JSON.stringify(users));
            localStorage.setItem("currentUser", JSON.stringify(users[userIndex])); // Atualiza o currentUser também
            
            // Disparar um evento de armazenamento para notificar outras abas/janelas
            window.dispatchEvent(new Event("storage"));

            alert("Exercício salvo no histórico!");
        } else {
            alert("Erro ao encontrar usuário para salvar histórico.");
        }
    }

    btnIniciar.addEventListener("click", startTimer);
    btnPausar.addEventListener("click", pauseTimer);
    btnTerminar.addEventListener("click", () => {
        if (totalSeconds > 0 && currentExercise) {
            saveExerciseToHistory();
        }
        resetTimer();
        stopBreathingAnimation();
        alert("Exercício finalizado!");
        window.location.href = "../index.html"; // Redireciona para a página inicial
    });

    // Inicialização
    loadExercise(exercises[0]); // Carrega o primeiro exercício por padrão
    populateExerciseList();
});

