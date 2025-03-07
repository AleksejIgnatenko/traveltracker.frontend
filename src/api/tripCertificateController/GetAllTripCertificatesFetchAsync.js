import { TripCertificateController } from "../controllers";

async function GetAllTripCertificatesFetchAsync() {
    try {
        const response = await fetch(`${TripCertificateController}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();
        
        if (response.ok) {
           return data;
        } else {
            console.error('Error in getting all trip certificates:', data);
            return [];
        }
    } catch (error) {
        console.error('Error in getting all trip certificates:', error);
        
        return [];
    }
}

export default GetAllTripCertificatesFetchAsync;