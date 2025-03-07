import { TripCertificateController } from "../controllers";

async function CreateTripCertificateFetchAsync(tripCertificate) {
    try {
        const response = await fetch(`${TripCertificateController}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tripCertificate)
        });

        if(response.ok) {
            return;
        }
        if (response.status === 400) {
            const errorData = await response.json();
            console.error('Error details:', errorData);
        } else {
            const errorData = await response.json();
            console.error('Error details:', errorData);
        }
    } catch (error) {
        console.error('Error in creating trip certificate:', error);
    }
}

export default CreateTripCertificateFetchAsync;