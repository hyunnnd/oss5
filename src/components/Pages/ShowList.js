import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';


function ShowList() {
    const [students, setstudents] = useState([]);
    const [showadd, setadd] = useState(false);
    const [showedit, setedit] = useState(false);
    const [newstudent, setnew] = useState({ num: '', name: '', age: '', email: '' });
    const [currentstudent, setcurrent] = useState({ id: '', num: '', name: '', age: '', email: '' });

    useEffect(() => {
        getdata();
    }, []);

    const getdata = () => {
        fetch('https://6729f0746d5fa4901b6f1089.mockapi.io/my_data')
            .then(response => response.json())
            .then(data => setstudents(data))
            .catch(error => console.error('Error fetching data:', error));
    };

    const inputChange = (props, setstate) => {
        const { id, value } = props.target;
        setstate(prevState => ({ ...prevState, [id]: value }));
    };

    const addStudent = () => {
        if (!newstudent.num || !newstudent.name || !newstudent.age || !newstudent.email) {
            alert("All fields are required.");
            return;
        }

        fetch('https://6729f0746d5fa4901b6f1089.mockapi.io/my_data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newstudent),
        })
            .then(response => {
                if (response.status === 201) {
                    getdata();
                    setadd(false);
                    setnew({ num: '', name: '', age: '', email: '' });
                } else {
                    console.error('Error adding student:', response.statusText);
                }
            });
    };

    const editstudent = () => {
        if (!currentstudent.num || !currentstudent.name || !currentstudent.age || !currentstudent.email) {
            alert("All fields are required.");
            return;
        }

        fetch(`https://6729f0746d5fa4901b6f1089.mockapi.io/my_data/${currentstudent.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(currentstudent),
        })
            .then(response => {
                if (response.status === 200) {
                    getdata();
                    setedit(false);
                } else {
                    console.error('Error editing student:', response.statusText);
                }
            });
    };

    const deletestudent = (id) => {
        fetch(`https://6729f0746d5fa4901b6f1089.mockapi.io/my_data/${id}`, { method: 'DELETE' })
            .then(response => {
                if (response.status === 200) {
                    getdata();
                } else {
                    console.error('Error deleting student:', response.statusText);
                }
            });
    };

    const openedit = (student) => {
        setcurrent(student);
        setedit(true);
    };

    return (
        <div className="container mt-5">
            <div className="text-center mb-4">
                <h1 className="display-6">Student List</h1>
                <Button variant="outline-primary" onClick={getdata}>Get Students</Button>
                <Button variant="outline-success" onClick={() => setadd(true)}>Add Student</Button>
            </div>
            <div className="card shadow-sm">
                <div className="card-body">
                    <ul className="list-group">
                        {students.map(student => (
                            <li key={student.id} className="list-group-item d-flex justify-content-between align-items-center">
                                {student.num}, {student.name} ({student.age}) {student.email}
                                <span>
                                    <Button variant="outline-primary" size="sm" onClick={() => openedit(student)}>Edit</Button>
                                    <Button variant="outline-danger" size="sm" onClick={() => deletestudent(student.id)}>Delete</Button>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <Modal show={showadd} onHide={() => setadd(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Num:</label>
                    <input type="text" id="num" className="form-control" value={newstudent.num} onChange={(props) => inputChange(props, setnew)} />
                    <label>Name:</label>
                    <input type="text" id="name" className="form-control" value={newstudent.name} onChange={(props) => inputChange(props, setnew)} />
                    <label>Age:</label>
                    <input type="number" id="age" className="form-control" value={newstudent.age} onChange={(props) => inputChange(props, setnew)} />
                    <label>Email:</label>
                    <input type="email" id="email" className="form-control" value={newstudent.email} onChange={(props) => inputChange(props, setnew)} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setadd(false)}>Close</Button>
                    <Button variant="primary" onClick={addStudent}>Add Student</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showedit} onHide={() => setedit(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Num:</label>
                    <input type="text" id="num" className="form-control" value={currentstudent.num} onChange={(props) => inputChange(props, setcurrent)} />
                    <label>Name:</label>
                    <input type="text" id="name" className="form-control" value={currentstudent.name} onChange={(props) => inputChange(props, setcurrent)} />
                    <label>Age:</label>
                    <input type="number" id="age" className="form-control" value={currentstudent.age} onChange={(props) => inputChange(props, setcurrent)} />
                    <label>Email:</label>
                    <input type="email" id="email" className="form-control" value={currentstudent.email} onChange={(props) => inputChange(props, setcurrent)} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setedit(false)}>Close</Button>
                    <Button variant="warning" onClick={editstudent}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ShowList;
