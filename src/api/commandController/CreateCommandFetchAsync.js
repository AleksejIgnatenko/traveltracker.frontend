import { CommandController } from "../controllers";

async function CreateCommandFetchAsync(command) {
    try {
        const response = await fetch(`${CommandController}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(command)
        });

        if (!response.ok) {
            console.error('Failed to create command');
        }
    } catch (error) {
        console.error('Error in creating command:', error);
    }
}

export default CreateCommandFetchAsync;