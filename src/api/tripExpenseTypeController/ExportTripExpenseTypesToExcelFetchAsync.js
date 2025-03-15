import { TripExpenseTypeController } from "../controllers";

async function ExportTripExpenseTypesToExcelFetchAsync() {
    try {
        const response = await fetch(`${TripExpenseTypeController}/export-to-excel`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

    const blob = await response.blob(); 
    const url = window.URL.createObjectURL(blob); 

    const a = document.createElement("a");
    a.href = url;
    a.download = "trip-expense-types.xlsx"; 
    document.body.appendChild(a); 
    a.click(); 
    a.remove(); 
    window.URL.revokeObjectURL(url); 
    } catch (error) {
        console.error('Error in getting trip expense types:', error);
    }
}

export default ExportTripExpenseTypesToExcelFetchAsync;