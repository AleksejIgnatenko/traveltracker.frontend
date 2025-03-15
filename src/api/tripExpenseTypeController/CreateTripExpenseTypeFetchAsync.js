import { TripExpenseTypeController } from "../controllers";

async function CreateTripExpenseTypeFetchAsync(tripExpenseType) {
    try {
        const response = await fetch(`${TripExpenseTypeController}`, {
            method: 'POST',
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
        console.error('Error in creating trip expense type:', error);
    }
}

export default CreateTripExpenseTypeFetchAsync;