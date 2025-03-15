import { CommandController } from "../controllers";

async function DeleteCommandFetchAsync(commandId) {
    try {
        const response = await fetch(`${CommandController}/${commandId}`, {
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
        console.error('Error in deleting command:', error);
    }
}

export default DeleteCommandFetchAsync;