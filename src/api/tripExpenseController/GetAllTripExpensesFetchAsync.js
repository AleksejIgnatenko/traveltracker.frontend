import { TripExpenseController } from "../controllers";

async function GetAllTripExpensesFetchAsync() {
    try {
        const response = await fetch(`${TripExpenseController}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();
        
        if (response.ok) {
           return data;
        } else {
            console.error('Error in getting all trip expenses:', data);
            return [];
        }
    } catch (error) {
        console.error('Error in getting all trip expenses:', error);
        
        return [];
    }
}

export default GetAllTripExpensesFetchAsync;