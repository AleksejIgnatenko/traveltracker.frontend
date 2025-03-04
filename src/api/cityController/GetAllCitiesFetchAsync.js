import { CityController } from "../controllers";

async function GetAllCitiesFetchAsync() {
    try {
        const response = await fetch(`${CityController}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();
        
        if (response.ok) {
           return data;
        } else {
            console.error('Error in getting all cities:', data);
            return [];
        }
    } catch (error) {
        console.error('Error in getting all cities:', error);
        
        return [];
    }
}

export default GetAllCitiesFetchAsync;