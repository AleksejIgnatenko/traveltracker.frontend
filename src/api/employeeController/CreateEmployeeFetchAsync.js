import { EmployeeController } from "../controllers";

async function CreateEmployeeFetchAsync(employee) {
    try {
        const response = await fetch(`${EmployeeController}`, {
            method: 'POST',
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
        console.error('Error in creating employee:', error);
    }
}

export default CreateEmployeeFetchAsync;