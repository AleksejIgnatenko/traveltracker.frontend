import { TripExpenseTypeController } from "../controllers";

async function UpdateTripExpenseTypeFetchAsync(tripExpenseType) {
    try {
        const response = await fetch(`${TripExpenseTypeController}/${tripExpenseType.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tripExpenseType)
        });

        if (!response.ok) {
            console.error('Failed to update trip expense type');
        }
    } catch (error) {
        console.error('Error in updating trip expense type:', error);
    }
}

export default UpdateTripExpenseTypeFetchAsync;