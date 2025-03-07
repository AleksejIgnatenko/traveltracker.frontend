import { TripExpenseController } from "../controllers";

async function UpdateTripExpenseFetchAsync(tripExpense) {
    try {
        const response = await fetch(`${TripExpenseController}/${tripExpense.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tripExpense)
        });

        if (!response.ok) {
            console.error('Failed to update trip expense');
        }
    } catch (error) {
        console.error('Error in updating trip expense:', error);
    }
}

export default UpdateTripExpenseFetchAsync;