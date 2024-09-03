window.addEventListener('load', () => {
    const form = document.querySelector("#tasks_form");
    const input = document.querySelector("#tasks_input");
    const list_el = document.querySelector("#tasks");

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value;

        if (!task) {
            alert("Please input task");
            return;
        }

        const task_el = document.createElement("div");
        task_el.classList.add("task");

        const task_content_el = document.createElement("div");
        task_content_el.classList.add("content");

        const task_input_el = document.createElement("input");
        task_input_el.classList.add("text");
        task_input_el.type = "text";
        task_input_el.value = task;
        task_input_el.setAttribute("readonly", "readonly");

        task_content_el.appendChild(task_input_el);

        const task_actions_el = document.createElement('div');
        task_actions_el.classList.add("actions");

        const task_checkBox_el = document.createElement("input");
        task_checkBox_el.type = "checkbox";
        task_checkBox_el.addEventListener('change', () => {
            if (task_checkBox_el.checked) {
                task_input_el.classList.add('completed');
            } else {
                task_input_el.classList.remove('completed');
            }
        });

        const task_del_el = document.createElement("button");
        task_del_el.classList.add("delete");
        task_del_el.textContent = "Delete";

        task_del_el.addEventListener('click', () => {
            list_el.removeChild(task_el);
        });

        task_actions_el.appendChild(task_checkBox_el);
        task_actions_el.appendChild(task_del_el);

        task_el.appendChild(task_content_el);
        task_el.appendChild(task_actions_el);

        list_el.appendChild(task_el);

        input.value = "";
    });
});