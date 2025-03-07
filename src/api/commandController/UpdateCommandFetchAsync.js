import { CommandController } from "../controllers";

async function UpdateCommandFetchAsync(command) {
    try {
        const response = await fetch(`${CommandController}/${command.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(command)
        });

        if (!response.ok) {
            console.error('Failed to update command');
        }
    } catch (error) {
        console.error('Error in updating command:', error);
    }
}

export default UpdateCommandFetchAsync;