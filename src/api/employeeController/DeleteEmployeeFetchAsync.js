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
            const errorData = await response.json();
            if (response.status === 400) {
                const errorMessage = Object.values(errorData.error).join("\n");
                alert(errorMessage);
            } else {
                alert(errorData);
            }
        }
    } catch (error) {
        console.error('Error in deleting employee:', error);
    }
}

export default DeleteEmployeeFetchAsync;