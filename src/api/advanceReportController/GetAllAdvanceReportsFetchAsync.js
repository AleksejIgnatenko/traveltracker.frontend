import { AdvanceReportController } from "../controllers";

async function GetAllAdvanceReportsFetchAsync() {
    try {
        const response = await fetch(`${AdvanceReportController}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();
        
        if (response.ok) {
           return data;
        } else {
            console.error('Error in getting all advance reports:', data);
            return [];
        }
    } catch (error) {
        console.error('Error in getting all advance reports:', error);
        
        return [];
    }
}

export default GetAllAdvanceReportsFetchAsync;