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
            const errorData = await response.json();
            if (response.status === 400) {
                const errorMessage = Object.values(errorData.error).join("\n");
                alert(errorMessage);
            } else {
                alert(errorData);
            }
        }
    } catch (error) {
        console.error('Error in updating command:', error);
    }
}

export default UpdateCommandFetchAsync;