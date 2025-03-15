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
            const errorData = await response.json();
            if (response.status === 400) {
                const errorMessage = Object.values(errorData.error).join("\n");
                alert(errorMessage);
            } else {
                alert(errorData);
            }
        }
    } catch (error) {
        console.error('Error in updating trip expense type:', error);
    }
}

export default UpdateTripExpenseTypeFetchAsync;