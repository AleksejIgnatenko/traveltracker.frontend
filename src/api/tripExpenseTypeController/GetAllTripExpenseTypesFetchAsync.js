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
        console.error('Error in getting all trip expense types:', error);
        
        return [];
    }
}

export default GetAllTripExpenseTypesFetchAsync;