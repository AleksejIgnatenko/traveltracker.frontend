import { CityController } from "../controllers";

async function CreateCityFetchAsync(city) {
    try {
        const response = await fetch(`${CityController}`, {
            method: 'POST',
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
        console.error('Error in creating city:', error);
    }
}

export default CreateCityFetchAsync;