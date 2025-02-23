import React from "react";
import { useQuery } from "@apollo/client";
import { GET_STUDENTS_BY_DEPARTMENT } from "./queries";

const Students = ({ departmentId }) => {
    const { loading, error, data } = useQuery(GET_STUDENTS_BY_DEPARTMENT, {
        variables: { departmentId },
        skip: !departmentId,
    });

    if (loading) return <p>Loading students...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h3>Students in Department</h3>
            <table border="1">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Student ID</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {data.studentsByDepartment.map((student) => (
                        <tr key={student.id}>
                            <td>{student.first_name}</td>
                            <td>{student.last_name}</td>
                            <td>{student.student_id}</td>
                            <td>{student.address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Students;
