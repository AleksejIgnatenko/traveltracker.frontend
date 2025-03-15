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
        console.error('Error in creating trip certificate:', error);
    }
}

export default CreateTripCertificateFetchAsync;