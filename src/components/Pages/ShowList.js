import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ShowList() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        fetch('https://6729f0746d5fa4901b6f1089.mockapi.io/my_data')
            .then(response => response.json())
            .then(data => setStudents(data))
            .catch(error => console.error('Error fetching data:', error));
    };

    return (
        <div className="container mt-5">
            <div className="text-center mb-4">
                <h1 className="display-6">Student List</h1>
                <button className="btn btn-outline-primary m-2" onClick={getData}>Get Students</button>
                <button className="btn btn-outline-success m-2">Add Student</button>
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
        </div>
    );
}

export default ShowList;
