import { TripExpenseController } from "../controllers";

async function DeleteTripExpenseFetchAsync(tripExpenseId) {
    try {
        const response = await fetch(`${TripExpenseController}/${tripExpenseId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            console.error('Failed to delete trip expense');
        }
    } catch (error) {
        console.error('Error in deleting trip expense:', error);
    }
}

export default DeleteTripExpenseFetchAsync;