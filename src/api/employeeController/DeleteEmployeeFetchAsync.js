import { EmployeeController } from "../controllers";

async function DeleteEmployeeFetchAsync(employeeId) {
    try {
        const response = await fetch(`${EmployeeController}/${employeeId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            console.error('Failed to delete employee');
        }
    } catch (error) {
        console.error('Error in deleting employee:', error);
    }
}

export default DeleteEmployeeFetchAsync;