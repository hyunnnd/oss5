import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

function ShowList() {
    const [students, setStudents] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newStudent, setNewStudent] = useState({ num: '', name: '', age: '', email: '' });

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        fetch('https://6729f0746d5fa4901b6f1089.mockapi.io/my_data')
            .then(response => response.json())
            .then(data => setStudents(data))
            .catch(error => console.error('Error fetching data:', error));
    };

    const addStudent = () => {
        fetch('https://6729f0746d5fa4901b6f1089.mockapi.io/my_data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newStudent),
        })
            .then(response => {
                if (response.status === 201) {
                    getData();
                    setShowAddModal(false);
                    setNewStudent({ num: '', name: '', age: '', email: '' });
                } else {
                    console.error('Error adding student:', response.statusText);
                }
            });
    };

    return (
        <div className="container mt-5">
            <div className="text-center mb-4">
                <h1 className="display-6">Student List</h1>
                <button className="btn btn-outline-primary m-2" onClick={getData}>Get Students</button>
                <button className="btn btn-outline-success m-2" onClick={() => setShowAddModal(true)}>Add Student</button>
            </div>
            <div className="card shadow-sm">
                <div className="card-body">
                    <ul className="list-group">
                        {students.map(student => (
                            <li key={student.id} className="list-group-item d-flex justify-content-between align-items-center">
                                {student.num}, {student.name} ({student.age}) {student.email}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" id="num" className="form-control" placeholder="Num" value={newStudent.num} onChange={e => setNewStudent({...newStudent, num: e.target.value})} />
                    <input type="text" id="name" className="form-control" placeholder="Name" value={newStudent.name} onChange={e => setNewStudent({...newStudent, name: e.target.value})} />
                    <input type="number" id="age" className="form-control" placeholder="Age" value={newStudent.age} onChange={e => setNewStudent({...newStudent, age: e.target.value})} />
                    <input type="email" id="email" className="form-control" placeholder="Email" value={newStudent.email} onChange={e => setNewStudent({...newStudent, email: e.target.value})} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>Close</Button>
                    <Button variant="primary" onClick={addStudent}>Add Student</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ShowList;
