window.addEventListener('load', () => {
    const form = document.querySelector("#tasks_form");
    const input = document.querySelector("#tasks_input");
    const deadlineInput = document.querySelector("#deadline_input");
    const list_el = document.querySelector("#tasks");
    const sortDropdown = document.querySelector("#sort_dropdown");


    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            addTaskToDOM(task);
        });
    };


    const saveTasks = () => {
        const tasks = Array.from(document.querySelectorAll('.task')).map(task => {
            const text = task.querySelector('.text').value;
            const completed = task.querySelector('.checkBox').checked;
            const timestamp = task.dataset.timestamp;
            const deadline = task.querySelector('.deadline').value;
            return { text, completed, timestamp, deadline };
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const addTaskToDOM = (taskData) => {
        const task_el = document.createElement("div");
        task_el.classList.add("task");
        task_el.dataset.timestamp = taskData.timestamp;

        const task_content_el = document.createElement("div");
        task_content_el.classList.add("content");

        const task_input_el = document.createElement("input");
        task_input_el.classList.add("text");
        task_input_el.type = "text";
        task_input_el.value = taskData.text;
        task_input_el.setAttribute("readonly", "readonly");

        const task_deadline_el = document.createElement("input");
        task_deadline_el.classList.add("deadline");
        task_deadline_el.type = "date";
        task_deadline_el.value = taskData.deadline;
        task_deadline_el.setAttribute("readonly", "readonly");

        if (taskData.completed) {
            task_input_el.classList.add('completed');
        }

        task_content_el.appendChild(task_input_el);
        task_content_el.appendChild(task_deadline_el);

        const task_actions_el = document.createElement('div');
        task_actions_el.classList.add("actions");

        const task_checkBox_el = document.createElement("input");
        task_checkBox_el.type = "checkbox";
        task_checkBox_el.classList.add("checkBox");
        task_checkBox_el.checked = taskData.completed;

        task_checkBox_el.addEventListener('change', () => {
            if (task_checkBox_el.checked) {
                task_input_el.classList.add('completed');
            } else {
                task_input_el.classList.remove('completed');
            }
            saveTasks();
        });

        const task_del_el = document.createElement("button");
        task_del_el.classList.add("delete");
        task_del_el.textContent = "Delete";

        task_del_el.addEventListener('click', () => {
            list_el.removeChild(task_el);
            saveTasks();
        });

        task_actions_el.appendChild(task_checkBox_el);
        task_actions_el.appendChild(task_del_el);

        task_el.appendChild(task_content_el);
        task_el.appendChild(task_actions_el);

        list_el.appendChild(task_el);
    };


    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value.trim();
        const deadline = deadlineInput.value;

        if (!task || !deadline) {
            alert("Please input task and set a deadline.");
            return;
        }

        const timestamp = new Date().toISOString();
        addTaskToDOM({ text: task, completed: false, timestamp, deadline });

        input.value = "";
        deadlineInput.value = "";
        saveTasks();
    });


    sortDropdown.addEventListener('change', () => {
        const sortBy = sortDropdown.value;
        const tasks = Array.from(document.querySelectorAll('.task'));

        tasks.sort((a, b) => {
            if (sortBy === 'date_added') {
                return new Date(a.dataset.timestamp) - new Date(b.dataset.timestamp);
            } else if (sortBy === 'deadline') {
                const deadlineA = new Date(a.querySelector('.deadline').value);
                const deadlineB = new Date(b.querySelector('.deadline').value);
                return deadlineA - deadlineB;
            }
        });

        tasks.forEach(task => list_el.appendChild(task));
    });

    loadTasks();
});
