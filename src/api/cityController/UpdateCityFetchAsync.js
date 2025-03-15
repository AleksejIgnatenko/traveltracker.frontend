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
            const errorData = await response.json();
            if (response.status === 400) {
                const errorMessage = Object.values(errorData.error).join("\n");
                alert(errorMessage);
            } else {
                alert(errorData);
            }
        }
    } catch (error) {
        console.error('Error in updating city:', error);
    }
}

export default UpdateCityFetchAsync;