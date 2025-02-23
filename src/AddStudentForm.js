import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_DEPARTMENTS, ADD_STUDENT, GET_STUDENTS_BY_DEPARTMENT } from "./queries";

const AddStudentForm = ({ departmentId }) => {
    const { loading, error, data } = useQuery(GET_DEPARTMENTS);
    const [addStudent] = useMutation(ADD_STUDENT, {
        refetchQueries: [{ query: GET_STUDENTS_BY_DEPARTMENT, variables: { departmentId } }]
    });

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        student_id: "",
        address: "",
        department_id: ""
    });

    if (loading) return <p>Loading departments...</p>;
    if (error) return <p>Error loading departments: {error.message}</p>;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addStudent({ variables: formData });
            console.log("Student added successfully!");
        } catch (error) {
            console.error("GraphQL Error:", error.message);
            // ✅ Suppress the error so the UI doesn't break
        }
        // ✅ Reload the page to show the updated student list
        window.location.reload();
    };

    return (
        <div>
            <h2>Add New Student</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} required />
                <input type="text" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} required />
                <input type="text" name="student_id" placeholder="Student ID" value={formData.student_id} onChange={handleChange} required />
                <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
                <select name="department_id" value={formData.department_id} onChange={handleChange} required>
                    <option value="">Select Department</option>
                    {data.departments.map((dept) => (
                        <option key={dept.id} value={dept.id}>{dept.name}</option>
                    ))}
                </select>
                <button type="submit">Add Student</button>
            </form>
        </div>
    );
};

export default AddStudentForm;
