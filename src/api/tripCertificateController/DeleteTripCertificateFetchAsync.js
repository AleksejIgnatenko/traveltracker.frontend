import { TripCertificateController } from "../controllers";

async function DeleteTripCertificateFetchAsync(tripCertificateId) {
    try {
        const response = await fetch(`${TripCertificateController}/${tripCertificateId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            console.error('Failed to delete trip certificate');
        }
    } catch (error) {
        console.error('Error in deleting trip certificate:', error);
    }
}

export default DeleteTripCertificateFetchAsync;