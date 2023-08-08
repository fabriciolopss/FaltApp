document.addEventListener('DOMContentLoaded', function(){
    const addFaltas = document.getElementById('submit-button');
    const faltasLista = document.getElementById('task-list');
    const addCircle = document.getElementById('add-circle');

    addFaltas.addEventListener('click', function(){
        const subjectNameInput = document.getElementById("subject-name");
        const subjectHoursSelect = document.getElementById("menu");


        const subjectName = subjectNameInput.value;
        const subjectHours = subjectHoursSelect.value;

        if (subjectHours && subjectName){
            const newTask = {
                subject: subjectName,
                hours: parseInt(subjectHours)
            };
        addtoJson(newTask);
        renderTasks();
        }
    });


    function addtoJson(task){
        const existingTasks = localStorage.getItem("tasks");
        let tasks = [];

        if (existingTasks){
            tasks = JSON.parse(existingTasks);
        }
        task.absenceCount = 0;
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderTasks(){
        faltasLista.innerHTML = "";
        const existingTasks = localStorage.getItem("tasks");

        if (existingTasks){
            const tasks = JSON.parse(existingTasks);
            tasks.forEach((task, index) =>{
                const taskElement = document.createElement("div");
                taskElement.className = "task";
                const taskContent = document.createElement("span");
                taskContent.textContent = task.subject + " - " + task.hours + " horas";

                const absenceCount = document.createElement("span");
                absenceCount.textContent = "Faltas: " + task.absenceCount + "(" + getMaxFaults(parseInt(task.hours)) + ")";

                const addAbsenceButton = document.createElement("ion-icon");
                addAbsenceButton.setAttribute('name', 'add-outline');
                addAbsenceButton.style.fontSize = '1.5em';
                addAbsenceButton.style.cursor = 'pointer';
                addAbsenceButton.addEventListener("click", () => addAbsence(index, taskElement));

                const editButton = document.createElement("ion-icon");
                editButton.setAttribute('name', 'create-outline');
                editButton.style.fontSize = '1.5em';
                editButton.style.cursor = 'pointer';
                editButton.addEventListener("click", () => redirectToEditPage(index));

                const deleteButton = document.createElement("ion-icon");
                deleteButton.setAttribute('name', 'trash-outline');
                deleteButton.style.fontSize = '1.5em';
                deleteButton.style.cursor = 'pointer';
                deleteButton.addEventListener("click", () => deleteTask(index));


                
    
                taskElement.appendChild(taskContent);
                taskElement.appendChild(absenceCount);
                taskElement.appendChild(addAbsenceButton);
                taskElement.appendChild(editButton);
                taskElement.appendChild(deleteButton);
                taskElement.style.zIndex = index;
                faltasLista.appendChild(taskElement);
                console.log(index);
                if (parseInt(index) >= parseInt(tasks.length) - 1){
                    taskElement.classList.add("animation-class");
                    console.log(tasks)
                }
            })
            
        }
    }

    function getMaxFaults(index){
        switch(index){
            case 30:
                return 7;
            case 45:
                return 11;
            case 60:
                return 15;
            case 75:
                return 18;
            case 90:
                return 22;
            case 120:
                return 30;
        }
    }

    function redirectToEditPage(index) {
        window.location.href = `edit.html?taskIndex=${index}`;
    }

    function addAbsence(index, taskElement) {
        const existingTasks = localStorage.getItem("tasks");
        const tasks = JSON.parse(existingTasks);
        if (existingTasks) {
            tasks[index].absenceCount += 1; // Incrementa o contador de faltas
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        }
        const faltas = parseInt(tasks[index].absenceCount);
        console.log(tasks[index].absenceCount);
        if (faltas < 8){
            taskElement.style.backgroundColor = "green";
            console.log("verde");
        }else if(faltas <= 12 && faltas >= 8){
            taskElement.style.backgroundColor = "yellow";
        }else{
            taskElement.style.backgroundColor = "red";
            console.log("vermelho");
        }
    }

    function deleteTask(index) {
        const existingTasks = localStorage.getItem("tasks");
        if (existingTasks) {
            const tasks = JSON.parse(existingTasks);
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        }
    }


    renderTasks();
});