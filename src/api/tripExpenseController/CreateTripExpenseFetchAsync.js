import { TripExpenseController } from "../controllers";

async function CreateTripExpenseFetchAsync(tripExpense) {
    try {
        const response = await fetch(`${TripExpenseController}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tripExpense)
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
        console.error('Error in creating trip expense:', error);
    }
}

export default CreateTripExpenseFetchAsync;