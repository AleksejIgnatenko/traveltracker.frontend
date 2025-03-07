import { TripCertificateController } from "../controllers";

async function UpdateTripCertificateFetchAsync(tripCertificate) {
    try {
        const response = await fetch(`${TripCertificateController}/${tripCertificate.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tripCertificate)
        });

        if (!response.ok) {
            console.error('Failed to update trip certificate');
        }
    } catch (error) {
        console.error('Error in updating trip certificate:', error);
    }
}

export default UpdateTripCertificateFetchAsync;