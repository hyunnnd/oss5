import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ShowList() {
    return (
        <div className="container mt-5">
            <div className="text-center mb-4">
                <h1 className="display-6">Student List</h1>
                <button className="btn btn-outline-primary m-2">Get Students</button>
                <button className="btn btn-outline-success m-2">Add Student</button>
            </div>
            <div className="card shadow-sm">
                <div className="card-body">
                    <ul className="list-group">
                        {/* Student list items will be rendered here */}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ShowList;
