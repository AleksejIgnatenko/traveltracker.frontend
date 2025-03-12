import { CommandController } from "../controllers";

async function ExportDateQuantityChartToExcelFetchAsync() {
    try {
        const response = await fetch(`${CommandController}/export-date-quantity-chart-to-excel`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const blob = await response.blob(); 
    const url = window.URL.createObjectURL(blob); 

    const a = document.createElement("a");
    a.href = url;
    a.download = "date-quantity-chart.xlsx"; 
    document.body.appendChild(a); 
    a.click(); 
    a.remove(); 
    window.URL.revokeObjectURL(url); 
    } catch (error) {
        console.error('Error in getting date quantity chart:', error);
    }
}

export default ExportDateQuantityChartToExcelFetchAsync;