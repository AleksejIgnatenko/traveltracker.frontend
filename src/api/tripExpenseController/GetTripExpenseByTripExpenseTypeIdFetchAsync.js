import { TripExpenseController } from "../controllers";

async function GetTripExpenseByTripExpenseTypeIdFetchAsync(tripExpenseTypeId) {
    try {
        const response = await fetch(`${TripExpenseController}/tripExpenseTypeId=${tripExpenseTypeId}`, {
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
        console.error('Error in getting trip expense by trip expense type id:', error);
        
        return [];
    }
}

export default GetTripExpenseByTripExpenseTypeIdFetchAsync;