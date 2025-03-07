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
            console.error('Failed to delete command');
        }
    } catch (error) {
        console.error('Error in deleting command:', error);
    }
}

export default DeleteCommandFetchAsync;