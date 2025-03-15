import { TripCertificateController } from "../controllers";

async function GetTripCertificateByCityIdFetchAsync(cityId) {
    try {
        const response = await fetch(`${TripCertificateController}/cityId=${cityId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();
        
        if (response.ok) {
            return data;
        } else {
            const errorData = await response.json();
            if (response.status === 400) {
                const errorMessage = Object.values(errorData.error).join("\n");
                alert(errorMessage);
                return [];
            } else {
                alert(errorData);
                return [];
            }
        }
    } catch (error) {
        console.error('Error in getting trip certificate by city id:', error);
        
        return [];
    }
}

export default GetTripCertificateByCityIdFetchAsync;