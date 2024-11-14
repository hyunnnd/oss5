<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Ajax</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>
    <div class="container mt-5">
        <div class="text-center mb-4">
            <h1 class="display-6">Student List</h1>
            <button id="get" class="btn btn-outline-primary m-2">Get Students</button>
            <button id="addbutton" class="btn btn-outline-success m-2" data-bs-toggle="modal" data-bs-target="#addmodal">
                Add Student
            </button>
        </div>
        <div class="card shadow-sm">
            <div class="card-body">
                <ul id="contents" class="list-group"></ul>
            </div>
        </div>
    </div>

    <div class="modal fade" id="addmodal" tabindex="-1" aria-labelledby="addmodallabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content shadow">
                <div class="modal-header bg-primary text-white">
                    <h5 id="addmodallabel" class="modal-title">Add New Student</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <label for="num" class="form-label">Num:</label>
                    <input type="text" id="num" class="form-control" required>
                    <label for="name" class="form-label mt-2">Name:</label>
                    <input type="text" id="name" class="form-control" required>
                    <label for="age" class="form-label mt-2">Age:</label>
                    <input type="number" id="age" class="form-control" required>
                    <label for="email" class="form-label mt-2">Email:</label>
                    <input type="email" id="email" class="form-control" required>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button id="add" type="button" class="btn btn-primary">Add Student</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="editmodal" tabindex="-1" aria-labelledby="editmodallabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content shadow">
                <div class="modal-header bg-warning text-white">
                    <h5 id="editmodallabel" class="modal-title">Edit Student</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="editId">
                    <label for="editNum" class="form-label">Num:</label>
                    <input type="text" id="editNum" class="form-control" required>
                    <label for="editName" class="form-label mt-2">Name:</label>
                    <input type="text" id="editName" class="form-control" required>
                    <label for="editAge" class="form-label mt-2">Age:</label>
                    <input type="number" id="editAge" class="form-control" required>
                    <label for="editEmail" class="form-label mt-2">Email:</label>
                    <input type="email" id="editEmail" class="form-control" required>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button id="saveedit" type="button" class="btn btn-warning">Save Changes</button>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        window.onload = function () {
            let get = document.getElementById("get");
            let add = document.getElementById("add");
            let saveedit = document.getElementById("saveedit");
            get.addEventListener("click", getdata);
            add.addEventListener("click", postdata);
            saveedit.addEventListener("click", savedata);
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
            const num = document.getElementById("num");
            const name = document.getElementById("name");
            const age = document.getElementById("age");
            const email = document.getElementById("email");

            if (!num.value.trim()) {
                alert("Num is required.");
                return;
            } else if (!name.value.trim()) {
                alert("Name is required.");
                return;
            } else if (!age.value.trim()) {
                alert("Age is required.");
                return;
            } else if (!email.value.trim()) {
                alert("Email is required.");
                return;
            }

            const xhr = new XMLHttpRequest();
            xhr.open("POST", "https://6729f0746d5fa4901b6f1089.mockapi.io/my_data");
            xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

            const data = { num: num.value, name: name.value, age: age.value, email: email.value };
            xhr.send(JSON.stringify(data));
            xhr.onload = () => {
                if (xhr.status === 201) {
                    getdata();
                    num.value = "";
                    name.value = "";
                    age.value = "";
                    email.value = "";
                    const addmodal = bootstrap.Modal.getInstance(document.getElementById('addmodal'));
                    addmodal.hide();
                } else {
                    console.log(xhr.status, xhr.statusText);
                }
            }
        }

        function makelist(data) {
            let str = "";
            for (let i in data) {
                str += `<li id='user-${data[i].id}' class="list-group-item d-flex justify-content-between align-items-center">
                    ${data[i].num}, ${data[i].name} (${data[i].age}) ${data[i].email}
                    <span>
                        <button class="btn btn-sm btn-outline-primary me-2" onclick='editdata(${data[i].id})'>Edit</button>
                        <button class="btn btn-sm btn-outline-danger" onclick='deletedata(${data[i].id})'>Delete</button>
                    </span>
                </li>`;
            }
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
            const xhr = new XMLHttpRequest();
            xhr.open("GET", "https://6729f0746d5fa4901b6f1089.mockapi.io/my_data/" + id);
            xhr.onload = () => {
                if (xhr.status === 200) {
                    const user = JSON.parse(xhr.response);
                    document.getElementById("editId").value = user.id;
                    document.getElementById("editNum").value = user.num;
                    document.getElementById("editName").value = user.name;
                    document.getElementById("editAge").value = user.age;
                    document.getElementById("editEmail").value = user.email;

                    const editmodal = new bootstrap.Modal(document.getElementById('editmodal'));
                    editmodal.show();
                } else {
                    console.log(xhr.status, xhr.statusText);
                }
            }
            xhr.send();
        }

        function savedata() {
            const id = document.getElementById("editId").value;
            const num = document.getElementById("editNum").value;
            const name = document.getElementById("editName").value;
            const age = document.getElementById("editAge").value;
            const email = document.getElementById("editEmail").value;

            if (!num.trim()) {
                alert("Num is required.");
                return;
            } else if (!name.trim()) {
                alert("Name is required.");
                return;
            } else if (!age.trim()) {
                alert("Age is required.");
                return;
            } else if (!email.trim()) {
                alert("Email is required.");
                return;
            }

            const xhr = new XMLHttpRequest();
            xhr.open("PUT", "https://6729f0746d5fa4901b6f1089.mockapi.io/my_data/" + id);
            xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

            const data = { num: num, name: name, age: age, email: email };
            xhr.send(JSON.stringify(data));
            xhr.onload = () => {
                if (xhr.status === 200) {
                    getdata();
                    const editmodal = bootstrap.Modal.getInstance(document.getElementById('editmodal'));
                    editmodal.hide();
                } else {
                    console.log(xhr.status, xhr.statusText);
                }
            }
        }
    </script>
</body>
</html>