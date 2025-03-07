import { AdvanceReportController } from "../controllers";

async function GetAdvanceReportByTripCertificateIdFetchAsync(tripCertificateId) {
    try {
        const response = await fetch(`${AdvanceReportController}/tripCertificateId=${tripCertificateId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();
        
        if (response.ok) {
           return data;
        } else {
            console.error('Error in getting advance report by trip certificate id:', data);
            return [];
        }
    } catch (error) {
        console.error('Error in getting advance report by trip certificate id:', error);
        
        return [];
    }
}

export default GetAdvanceReportByTripCertificateIdFetchAsync;