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
            console.error('Failed to create city');
        }
    } catch (error) {
        console.error('Error in creating city:', error);
    }
}

export default CreateCityFetchAsync;