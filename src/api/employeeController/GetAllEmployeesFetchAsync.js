import { EmployeeController } from "../controllers";

async function GetAllEmployeesFetchAsync() {
    try {
        const response = await fetch(`${EmployeeController}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();
        
        if (response.ok) {
           return data;
        } else {
            console.error('Error in getting all employees:', data);
            return [];
        }
    } catch (error) {
        console.error('Error in getting all employees:', error);
        
        return [];
    }
}

export default GetAllEmployeesFetchAsync;