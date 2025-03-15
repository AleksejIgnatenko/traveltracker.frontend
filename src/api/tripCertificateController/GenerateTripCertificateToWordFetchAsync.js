import { TripCertificateController } from "../controllers";

async function GenerateTripCertificateToWordFetchAsync(id) {
    try {
        const response = await fetch(`${TripCertificateController}/generate-trip-certificate-to-word/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

    const blob = await response.blob(); 
    const url = window.URL.createObjectURL(blob); 

    const a = document.createElement("a");
    a.href = url;
    a.download = "generate-trip-certificate.docx"; 
    document.body.appendChild(a); 
    a.click(); 
    a.remove(); 
    window.URL.revokeObjectURL(url); 
    } catch (error) {
        console.error('Error in getting trip certificate:', error);
    }
}

export default GenerateTripCertificateToWordFetchAsync;