let data = getData();
data.map(item => creatItem(item.text, item.done));
updateCount();

function getData() {
    return JSON.parse(localStorage.getItem("data")) || [];
}

function saveData(text) {
    let data = getData();
    data.push({ text, done: false });
    localStorage.setItem("data", JSON.stringify(data));
}

function deleteData(text) {
    let data = getData();
    let result = data.filter(item => item.text !== text);
    localStorage.setItem("data", JSON.stringify(result));
}

function markDone(text) {
    let data = getData()
    let result = data.map(item => {
        if (item.text === text) { item.done = true; }
        return item;
    });
    localStorage.setItem("data", JSON.stringify(result));
}




function clearData() {
    let data = getData();
    let result = data.filter(item => !item.done)
    localStorage.setItem("data", JSON.stringify(result));
}

function updateCount() {
    document.querySelector('#count').textContent =
        document.querySelectorAll('#todo li').length
}

document.querySelector("#clear").onclick = function () {
    document.querySelector('#done').innerHTML = "";
    clearData();
}
document.querySelector("button").onclick = function () {
    let text = document.querySelector("input").value;
    if (!text) return false;
    creatItem(text);
    document.querySelector("input").value = "";
    document.querySelector("input").focus();
    updateCount();
    saveData(text);
}

function creatItem(text, done = false) {
    let li = document.createElement("li");
    li.classList.add("list-group-item")
    li.textContent = text;

    let check = document.createElement("a");
    check.setAttribute("href", "#");
    check.classList.add("fas", "fa-check", "float-start", "me-3")
    //check.textContent = "Check";
    check.onclick = function () {
        document.querySelector("#done").appendChild(check.parentElement);
        check.remove();
        updateCount();
        markDone(text);
    };
    if (!done) li.appendChild(check);


    let del = document.createElement("a");
    del.setAttribute("href", "#");
    //del.textContent = " Delete";
    del.classList.add("fas", "fa-trash", "float-end", "text-warning")
    del.onclick = function () {
        del.parentElement.remove();
        updateCount();
        deleteData(text);
    }
    li.appendChild(del);

    if (done) {
        document.querySelector("#done").appendChild(li);
    } else {
        document.querySelector("#todo").appendChild(li);
    }
}


// find usage of keypree. it does not work like java
document.querySelector("input").onkeydown = function (e) {
    if (e.key == "Enter") {
        document.querySelector("button").onclick();
    }
}