import { CommandController } from "../controllers";

async function GetAllCommandsFetchAsync() {
    try {
        const response = await fetch(`${CommandController}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();
        
        if (response.ok) {
           return data;
        } else {
            console.error('Error in getting all commands:', data);
            return [];
        }
    } catch (error) {
        console.error('Error in getting all commands:', error);
        
        return [];
    }
}

export default GetAllCommandsFetchAsync;