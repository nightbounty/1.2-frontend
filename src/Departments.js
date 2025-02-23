import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_DEPARTMENTS } from "./queries";
import Students from "./Students";
import AddStudentForm from "./AddStudentForm";

const Departments = () => {
    const { loading, error, data } = useQuery(GET_DEPARTMENTS);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [submittedDepartment, setSubmittedDepartment] = useState(null); // Stores department after Submit is clicked

    if (loading) return <p>Loading departments...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1>Student Information System</h1>
            <h2>Select a Department</h2>
            {data.departments.map((dept) => (
                <div key={dept.id}>
                    <input
                        type="radio"
                        name="department"
                        value={dept.id}
                        onChange={() => setSelectedDepartment(dept.id)}
                    />
                    {dept.name}
                </div>
            ))}

            {/* ✅ Submit button is back */}
            <button onClick={() => setSubmittedDepartment(selectedDepartment)} disabled={!selectedDepartment}>
                Submit
            </button>

            {/* ✅ Show students list only after Submit is clicked */}
            {submittedDepartment && <Students departmentId={submittedDepartment} />}

            {/* ✅ Always show the "Add Student" form */}
            <AddStudentForm departmentId={selectedDepartment} />
        </div>
    );
};

export default Departments;
