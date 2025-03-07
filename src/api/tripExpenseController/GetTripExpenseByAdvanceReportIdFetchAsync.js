import { TripExpenseController } from "../controllers";

async function GetTripExpenseByAdvanceReportIdFetchAsync(advanceReportId) {
    try {
        const response = await fetch(`${TripExpenseController}/advanceReportId=${advanceReportId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();
        
        if (response.ok) {
           return data;
        } else {
            console.error('Error in getting trip expense by advance report id:', data);
            return [];
        }
    } catch (error) {
        console.error('Error in getting trip expense by advance report id:', error);
        
        return [];
    }
}

export default GetTripExpenseByAdvanceReportIdFetchAsync;