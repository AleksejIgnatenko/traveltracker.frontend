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
            return data
        } else {
            if (response.status === 400) {
                const errorMessage = Object.values(data.error).join("\n");
                alert(errorMessage);
                return [];
            } else {
                alert(data);
                return [];
            }
        }
    } catch (error) {
        console.error('Error in getting all cities:', error);

        return [];
    }
}

export default GetAllCitiesFetchAsync;