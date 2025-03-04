import { CityController } from "../controllers";

async function DeleteCityFetchAsync(cityId) {
    try {
        const response = await fetch(`${CityController}/${cityId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            console.error('Failed to delete city');
        }
    } catch (error) {
        console.error('Error in deleting city:', error);
    }
}

export default DeleteCityFetchAsync;