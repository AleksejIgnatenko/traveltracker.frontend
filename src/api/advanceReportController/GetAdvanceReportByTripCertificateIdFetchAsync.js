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
             const errorData = await response.json();
             if (response.status === 400) {
                 const errorMessage = Object.values(errorData.error).join("\n");
                 alert(errorMessage);
                 return [];
             } else {
                 alert(errorData);
                 return[]
             }
         }
    } catch (error) {
        console.error('Error in getting advance report by trip certificate id:', error);
        
        return [];
    }
}

export default GetAdvanceReportByTripCertificateIdFetchAsync;