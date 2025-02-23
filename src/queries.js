import { gql } from "@apollo/client";

export const GET_DEPARTMENTS = gql`
    query GetDepartments {
        departments {
            id
            name
        }
    }
`;

export const GET_STUDENTS_BY_DEPARTMENT = gql`
    query GetStudentsByDepartment($departmentId: ID!) {
        studentsByDepartment(departmentId: $departmentId) {
            id
            first_name
            last_name
            student_id
            address
            department {
                id
                name
                address
            }
        }
    }
`;

export const ADD_STUDENT = gql`
    mutation AddStudent(
        $first_name: String!,
        $last_name: String!,
        $student_id: String!,
        $address: String!,
        $department_id: ID!
    ) {
        addStudent(
            first_name: $first_name,
            last_name: $last_name,
            student_id: $student_id,
            address: $address,
            department_id: $department_id
        ) {
            id
            first_name
            last_name
            student_id
            address
            department {
                id
                name
            }
        }
    }
`;
