import { EmployeeController } from "../controllers";

async function CreateEmployeeControllerFetchAsync(employee) {
    try {
        const response = await fetch(`${EmployeeController}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee)
        });

        if (!response.ok) {
            console.error('Failed to create employee');
        }
    } catch (error) {
        console.error('Error in creating employee:', error);
    }
}

export default CreateEmployeeControllerFetchAsync;