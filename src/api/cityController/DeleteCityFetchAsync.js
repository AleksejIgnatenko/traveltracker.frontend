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
            const errorData = await response.json();
            if (response.status === 400) {
                const errorMessage = Object.values(errorData.error).join("\n");
                alert(errorMessage);
            } else {
                alert(errorData);
            }
        }
    } catch (error) {
        console.error('Error in deleting city:', error);
    }
}

export default DeleteCityFetchAsync;