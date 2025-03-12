import { TripCertificateController } from "../controllers";

async function ExportTripCertificatesToExcelFetchAsync() {
    try {
        const response = await fetch(`${TripCertificateController}/export-to-excel`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const blob = await response.blob(); 
    const url = window.URL.createObjectURL(blob); 

    const a = document.createElement("a");
    a.href = url;
    a.download = "trip-certificates.xlsx"; 
    document.body.appendChild(a); 
    a.click(); 
    a.remove(); 
    window.URL.revokeObjectURL(url); 
    } catch (error) {
        console.error('Error in getting trip certificates:', error);
    }
}

export default ExportTripCertificatesToExcelFetchAsync;