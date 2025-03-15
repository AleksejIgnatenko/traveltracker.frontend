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
            const errorData = await response.json();
            if (response.status === 400) {
                const errorMessage = Object.values(errorData.error).join("\n");
                alert(errorMessage);
            } else {
                alert(errorData);
            }
        }
    } catch (error) {
        console.error('Error in updating employee:', error);
    }
}

export default UpdateEmployeeFetchAsync