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
            const errorData = await response.json();
            if (response.status === 400) {
                const errorMessage = Object.values(errorData.error).join("\n");
                alert(errorMessage);
            } else {
                alert(errorData);
            }
        }
    } catch (error) {
        console.error('Error in deleting trip expense type:', error);
    }
}

export default DeleteTripExpenseTypeFetchAsync;