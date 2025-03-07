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
            console.error('Error in getting trip expense by trip expense type id:', data);
            return [];
        }
    } catch (error) {
        console.error('Error in getting trip expense by trip expense type id:', error);
        
        return [];
    }
}

export default GetTripExpenseByTripExpenseTypeIdFetchAsync;