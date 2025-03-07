import { TripExpenseTypeController } from "../controllers";

async function DeleteTripExpenseTypeFetchAsync(tripExpenseTypeId) {
    try {
        const response = await fetch(`${TripExpenseTypeController}/${tripExpenseTypeId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            console.error('Failed to delete trip expense type');
        }
    } catch (error) {
        console.error('Error in deleting trip expense type:', error);
    }
}

export default DeleteTripExpenseTypeFetchAsync;