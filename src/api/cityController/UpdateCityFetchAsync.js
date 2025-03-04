import { CityController } from "../controllers";

async function UpdateCityFetchAsync(city) {
    try {
        const response = await fetch(`${CityController}/${city.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(city)
        });

        if (!response.ok) {
            console.error('Failed to update city');
        }
    } catch (error) {
        console.error('Error in updating city:', error);
    }
}

export default UpdateCityFetchAsync;