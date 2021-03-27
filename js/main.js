const addButton = document.getElementById("addTaskButton");
let isChecked = document.getElementById("taskChecked");
let inputTask = document.getElementById("inputText");
const taskList = document.querySelector(".tasksList");
let tasksArray = !localStorage.tasks ? [] : JSON.parse(localStorage.getItem("tasks"));
let idCounter = 1;

function Task(title) {
    this.id = idCounter;
    this.title = title;
    this.completed = false;
    idCounter++;
}

function fillHtmlList() {
    taskList.innerHTML = "";
    if (tasksArray.length > 0) {
        tasksArray.forEach((item, index) => {
            taskList.innerHTML += createTaskHtml(item, index);
        })
    }
}

function createTaskHtml(task, index) {
    return `    
    <div class="border border-dark my-2  mx-5">
        <div class="d-flex justify-content-between align-items-center px-2">
            <div class="d-flex justify-content-start align-items-center">
                <input onclick="checkTask(${task.id})" class="mr-3" type="checkbox" ${task.completed ? 'checked' : ''}>
                <div id="${task.id}" style=" ${task.completed ? 'text-decoration : line-through' : ''}">${task.title}</div>
            </div>
            <div class="d-flex justify-content-start align-items-center">
                <span onclick="editTask(${task.id})" class="svg-icon svg-icon-xl px-2 pt-1 rounded mr-3" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <rect x="0" y="0" width="24" height="24"/>
                            <path d="M12.2674799,18.2323597 L12.0084872,5.45852451 C12.0004303,5.06114792 12.1504154,4.6768183 12.4255037,4.38993949 L15.0030167,1.70195304 L17.5910752,4.40093695 C17.8599071,4.6812911 18.0095067,5.05499603 18.0083938,5.44341307 L17.9718262,18.2062508 C17.9694575,19.0329966 17.2985816,19.701953 16.4718324,19.701953 L13.7671717,19.701953 C12.9505952,19.701953 12.2840328,19.0487684 12.2674799,18.2323597 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.701953, 10.701953) rotate(-135.000000) translate(-14.701953, -10.701953) "/>
                            <path d="M12.9,2 C13.4522847,2 13.9,2.44771525 13.9,3 C13.9,3.55228475 13.4522847,4 12.9,4 L6,4 C4.8954305,4 4,4.8954305 4,6 L4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,13 C20,12.4477153 20.4477153,12 21,12 C21.5522847,12 22,12.4477153 22,13 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 L2,6 C2,3.790861 3.790861,2 6,2 L12.9,2 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"/>
                        </g>
                    </svg> 
                </span>
                <span onclick="deleteTask(${index})" class="svg-icon svg-icon-xl px-2 pt-1 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <rect x="0" y="0" width="24" height="24"/>
                            <path d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z" fill="#000000" fill-rule="nonzero"/>
                            <path d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3"/>
                        </g>
                    </svg>
                </span>
            </div>
        </div>
    </div>`
}


function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasksArray))
}

(function () {
    fillHtmlList();
})();

addButton.addEventListener("click", () => {
    tasksArray.push(new Task(inputTask.value));
    updateLocalStorage();
    console.log(tasksArray);
    fillHtmlList();
})

function checkTask(id) {
    let index = findWithAttr(tasksArray, "id", id);
    tasksArray[index].completed = !tasksArray[index].completed;
    updateLocalStorage();
    if (tasksArray[index].completed) {
        document.getElementById(id).style.textDecoration = "line-through";
    } else {
        document.getElementById(id).style.textDecoration = "none";

    }
}

function deleteTask(index) {
    tasksArray.splice(index, 1);
    updateLocalStorage();
    fillHtmlList();
}

function findWithAttr(array, attr, value) {
    for (var i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

function editTask(id) {
    let index = findWithAttr(tasksArray, "id", id);
    let editInputTask = document.getElementById(id);
    let val = tasksArray[index].title;
    editInputTask.innerHTML = `     
     <div class="d-flex justify-content-between align-items-center"> 
        <input type="text" value="${val}" id="changedTitle" class="input-group">
        <span onclick="changeTitle(${index})" class="svg-icon svg-icon-primary svg-icon-2x d-flex justify-content-start align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <rect x="0" y="0" width="24" height="24"/>
                    <circle fill="#000000" opacity="0.3" cx="12" cy="12" r="10"/>
                    <path d="M16.7689447,7.81768175 C17.1457787,7.41393107 17.7785676,7.39211077 18.1823183,7.76894473 C18.5860689,8.1457787 18.6078892,8.77856757 18.2310553,9.18231825 L11.2310553,16.6823183 C10.8654446,17.0740439 10.2560456,17.107974 9.84920863,16.7592566 L6.34920863,13.7592566 C5.92988278,13.3998345 5.88132125,12.7685345 6.2407434,12.3492086 C6.60016555,11.9298828 7.23146553,11.8813212 7.65079137,12.2407434 L10.4229928,14.616916 L16.7689447,7.81768175 Z" fill="#000000" fill-rule="nonzero"/>
                </g>
            </svg>
            <svg onclick="fillHtmlList()" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <rect x="0" y="0" width="24" height="24"/>
                    <circle fill="#000000" opacity="0.3" cx="12" cy="12" r="10"/>
                    <rect fill="#000000" x="6" y="11" width="12" height="2" rx="1"/>
                </g>
            </svg>
        </span>
    </div>`;
}

function changeTitle(index) {
    let value = document.getElementById("changedTitle").value;
    if (value) {
        tasksArray[index].title = value;
        updateLocalStorage();
    }
    fillHtmlList();
}