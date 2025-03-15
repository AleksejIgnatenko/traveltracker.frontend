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
             const errorData = await response.json();
             if (response.status === 400) {
                 const errorMessage = Object.values(errorData.error).join("\n");
                 alert(errorMessage);
                 return [];
             } else {
                 alert(errorData);
                 return[]
             }
         }
    } catch (error) {
        console.error('Error in getting all employees:', error);
        
        return [];
    }
}

export default GetAllEmployeesFetchAsync;