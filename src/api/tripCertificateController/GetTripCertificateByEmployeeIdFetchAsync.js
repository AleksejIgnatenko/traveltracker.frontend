import { TripCertificateController } from "../controllers";

async function GetTripCertificateByEmployeeIdFetchAsync(employeeId) {
    try {
        const response = await fetch(`${TripCertificateController}/employeeId=${employeeId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();
        
        if (response.ok) {
           return data;
        } else {
            console.error('Error in getting trip certificate by employee id:', data);
            return [];
        }
    } catch (error) {
        console.error('Error in getting trip certificate by employee id:', error);
        
        return [];
    }
}

export default GetTripCertificateByEmployeeIdFetchAsync;