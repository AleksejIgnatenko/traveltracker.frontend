import { TripCertificateController } from "../controllers";

async function GetTripCertificateByCommandIdFetchAsync(commandId) {
    try {
        const response = await fetch(`${TripCertificateController}/commandId=${commandId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();
        
        if (response.ok) {
           return data;
        } else {
            console.error('Error in getting trip certificate by command id:', data);
            return [];
        }
    } catch (error) {
        console.error('Error in getting trip certificate by command id:', error);
        
        return [];
    }
}

export default GetTripCertificateByCommandIdFetchAsync;