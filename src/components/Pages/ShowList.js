<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My ajax</title>
    <script>
        window.onload = function () {
            let get = document.getElementById("get");
            let add = document.getElementById("add");
            get.addEventListener("click", getdata);
            add.addEventListener("click", postdata);
        }
        function getdata() {
            let contents = document.getElementById("contents");
            const xhr = new XMLHttpRequest();
            xhr.open("GET", "https://6729f0746d5fa4901b6f1089.mockapi.io/my_data");
            xhr.setRequestHeader("content-type", "application/json");
            xhr.send();
            xhr.onload = () => {
                if (xhr.status === 200) {
                    const res = JSON.parse(xhr.response);
                    contents.innerHTML = makelist(res);
                } else {
                    console.log(xhr.status, xhr.statusText);
                }
            }
        }

        function postdata() {
            const id = document.getElementById("id");
            const name = document.getElementById("name");
            const age = document.getElementById("age");
            const email = document.getElementById("email");

            if (!document.getElementById("name").value.trim()) {
                alert("Name is required.");
                return;
            }
            else if (!document.getElementById("age").value.trim()) {
                alert("Age is required.");
                return;
            }
            else if (!document.getElementById("email").value.trim()) {
                alert("Email is required.");
                return;
            }
            else if (!document.getElementById("id").value.trim()) {
                alert("Id is required.");
                return;
            }

            const xhr = new XMLHttpRequest();
            xhr.open("POST", "https://6729f0746d5fa4901b6f1089.mockapi.io/my_data");
            xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

            const data = { id: id.value, name: name.value, age: age.value, email: email.value };
            xhr.send(JSON.stringify(data));
            xhr.onload = () => {
                if (xhr.status === 201) {
                    const res = JSON.parse(xhr.response);
                    adddata(res);
                    id.value = "";
                    name.value = "";
                    age.value = "";
                    email.value = "";
                } else {
                    console.log(xhr.status, xhr.statusText);
                }
            }
        }

        function adddata(user) {
            let contents = document.getElementById("contents");
            const newItem = 
        <li id="user-${user.id}">
            ${user.id} ${user.name} (${user.age}) ${user.email}
            <button onclick="editdata(${user.id})">Edit</button>
            <button onclick="deletedata(${user.id})">Delete</button>
        </li>;
            contents.querySelector("ul").insertAdjacentHTML("beforeend", newItem);
        }



        function makelist(data) {
            let str = "<ul>";
            for (let i in data) {
                str += "<li id='user-" + data[i].id + "'>" + data[i].id + " " + data[i].name + " (" + data[i].age + ") " + data[i].email +
                    " <button onclick='editdata(" + data[i].id + ")'>Edit</button>" +
                    " <button onclick='deletedata(" + data[i].id + ")'>Delete</button></li>";
            }
            str += "</ul>";
            return str;
        }

        function deletedata(id) {
            const xhr = new XMLHttpRequest();
            xhr.open("DELETE", "https://6729f0746d5fa4901b6f1089.mockapi.io/my_data/" + id);
            xhr.onload = () => {
                if (xhr.status === 200) {
                    document.getElementById("user-" + id).remove();
                } else {
                    console.log(xhr.status, xhr.statusText);
                }
            }
            xhr.send();
        }

        function editdata(id) {
            const newName = prompt("Enter new name:");
            const newAge = prompt("Enter new age:");
            const newEmail = prompt("Enter new email:");
            if (!newName) {
                alert("Name is required.");
                return;
            }
            else if (!newAge) {
                alert("Age is required.");
                return;
            }
            else if (!newEmail) {
                alert("Email is required.");
                return;
            }

            const xhr = new XMLHttpRequest();
            xhr.open("PUT", "https://6729f0746d5fa4901b6f1089.mockapi.io/my_data/" + id);
            xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

            const data = { name: newName, age: parseInt(newAge), email: newEmail };
            xhr.send(JSON.stringify(data));
            xhr.onload = () => {
                if (xhr.status === 200) {
                    const user = JSON.parse(xhr.response);
                    document.getElementById("user-" + id).innerHTML =
                        user.id + " " + user.name + " (" + user.age + ") " + user.email +
                        " <button onclick='editdata(" + user.id + ")'>Edit</button>" +
                        " <button onclick='deletedata(" + user.id + ")'>Delete</button>";
                } else {
                    console.log(xhr.status, xhr.statusText);
                }
            }
        }
    </script>
</head>

<body>
    <h1>Student list</h1>
    <button id="get">Get students</button>
    <ul id="contents"></ul>

    <h2>Add new student</h2>
    <label for="id">Id:</label>
    <input type="text" id="id" required>
    <label for="name">Name:</label>
    <input type="text" id="name" required>
    <label for="age">Age:</label>
    <input type="number" id="age" required>
    <label for="email">Email:</label>
    <input type="email" id="email" required>
    <button id="add">Add student</button>
</body>

</html>