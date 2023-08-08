document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const taskIndex = urlParams.get("taskIndex"); // Obtém o índice da tarefa da URL

    const existingTasks = localStorage.getItem("tasks");
    if (existingTasks) {
        const tasks = JSON.parse(existingTasks);
        const task = tasks[taskIndex];

        const subjectInput = document.getElementById("subjectInput");
        subjectInput.value = task.subject;

        const hoursInput = document.getElementById("menu");
        hoursInput.value = task.hours;

        const absenceInput = document.getElementById("absenceInput");
        absenceInput.value = task.absenceCount;

        const save = document.getElementById("submit-button");
        save.addEventListener("click", function (event) {
            event.preventDefault();
            updateTask(taskIndex, subjectInput.value, hoursInput.value, parseInt(absenceInput.value));
        });
    }
});

function updateTask(index, subject, hours, absenceCount) {
    const existingTasks = localStorage.getItem("tasks");
    if (existingTasks) {
        const tasks = JSON.parse(existingTasks);
        tasks[index].subject = subject;
        tasks[index].hours = hours;
        tasks[index].absenceCount = absenceCount;
        localStorage.setItem("tasks", JSON.stringify(tasks));

        // Redireciona de volta para a página inicial após a edição
        window.location.href = "index.html";
    }
}