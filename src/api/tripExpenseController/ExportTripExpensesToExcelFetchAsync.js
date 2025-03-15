import { TripExpenseController } from "../controllers";

async function ExportTripExpensesToExcelFetchAsync() {
    try {
        const response = await fetch(`${TripExpenseController}/export-to-excel`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

    const blob = await response.blob(); 
    const url = window.URL.createObjectURL(blob); 

    const a = document.createElement("a");
    a.href = url;
    a.download = "trip-expenses.xlsx"; 
    document.body.appendChild(a); 
    a.click(); 
    a.remove(); 
    window.URL.revokeObjectURL(url); 
    } catch (error) {
        console.error('Error in getting trip expenses:', error);
    }
}

export default ExportTripExpensesToExcelFetchAsync;