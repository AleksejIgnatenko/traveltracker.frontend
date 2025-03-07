import { TripExpenseTypeController } from "../controllers";

async function GetAllTripExpenseTypesFetchAsync() {
    try {
        const response = await fetch(`${TripExpenseTypeController}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();
        
        if (response.ok) {
           return data;
        } else {
            console.error('Error in getting all trip expense types:', data);
            return [];
        }
    } catch (error) {
        console.error('Error in getting all trip expense types:', error);
        
        return [];
    }
}

export default GetAllTripExpenseTypesFetchAsync;