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
        console.error('Error in creating trip expense:', error);
    }
}

export default CreateTripExpenseFetchAsync;