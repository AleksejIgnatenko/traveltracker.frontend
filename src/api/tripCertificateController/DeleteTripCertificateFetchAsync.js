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
            const errorData = await response.json();
            if (response.status === 400) {
                const errorMessage = Object.values(errorData.error).join("\n");
                alert(errorMessage);
            } else {
                alert(errorData);
            }
        }
    } catch (error) {
        console.error('Error in deleting trip certificate:', error);
    }
}

export default DeleteTripCertificateFetchAsync;