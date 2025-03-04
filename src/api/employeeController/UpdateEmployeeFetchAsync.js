import { EmployeeController } from "../controllers";

async function UpdateEmployeeFetchAsync(employee) {
    try {
        const response = await fetch(`${EmployeeController}/${employee.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee)
        });

        if (!response.ok) {
            console.error('Failed to update employee');
        }
    } catch (error) {
        console.error('Error in updating employee:', error);
    }
}

export default UpdateEmployeeFetchAsync