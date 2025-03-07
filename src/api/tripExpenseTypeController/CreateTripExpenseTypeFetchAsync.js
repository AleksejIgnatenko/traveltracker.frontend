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

        if(response.ok) {
            return;
        }
        if (response.status === 400) {
            const errorData = await response.json();
            console.error('Error details:', errorData);
        } else {
            const errorData = await response.json();
            console.error('Error details:', errorData);
        }
    } catch (error) {
        console.error('Error in creating trip expense type:', error);
    }
}

export default CreateTripExpenseTypeFetchAsync;