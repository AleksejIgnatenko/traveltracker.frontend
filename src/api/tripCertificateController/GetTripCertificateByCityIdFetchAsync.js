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
            console.error('Error in getting trip certificate by city id:', data);
            return [];
        }
    } catch (error) {
        console.error('Error in getting trip certificate by city id:', error);
        
        return [];
    }
}

export default GetTripCertificateByCityIdFetchAsync;