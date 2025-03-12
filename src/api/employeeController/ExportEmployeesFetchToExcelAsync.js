import { EmployeeController } from "../controllers";

async function ExportEmployeesFetchToExcelAsync() {
    try {
        const response = await fetch(`${EmployeeController}/export-to-excel`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const blob = await response.blob(); 
    const url = window.URL.createObjectURL(blob); 

    const a = document.createElement("a");
    a.href = url;
    a.download = "employees.xlsx"; 
    document.body.appendChild(a); 
    a.click(); 
    a.remove(); 
    window.URL.revokeObjectURL(url); 
    } catch (error) {
        console.error('Error in getting employees:', error);
    }
}

export default ExportEmployeesFetchToExcelAsync;