import { AdvanceReportController } from "../controllers";

async function ExportAdvanceReportsToExcelAsync() {
    try {
        const response = await fetch(`${AdvanceReportController}/export-to-excel`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const blob = await response.blob(); 
    const url = window.URL.createObjectURL(blob); 

    const a = document.createElement("a");
    a.href = url;
    a.download = "advance-reports.xlsx"; 
    document.body.appendChild(a); 
    a.click(); 
    a.remove(); 
    window.URL.revokeObjectURL(url); 
    } catch (error) {
        console.error('Error in getting advance report by trip certificate id:', error);
    }
}

export default ExportAdvanceReportsToExcelAsync;