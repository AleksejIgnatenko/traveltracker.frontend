import { CityController } from "../controllers";

async function ExportCitiesToExcelFetchAsync() {
    try {
        const response = await fetch(`${CityController}/export-to-excel`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

    const blob = await response.blob(); 
    const url = window.URL.createObjectURL(blob); 

    const a = document.createElement("a");
    a.href = url;
    a.download = "cities.xlsx"; 
    document.body.appendChild(a); 
    a.click(); 
    a.remove(); 
    window.URL.revokeObjectURL(url); 
    } catch (error) {
        console.error('Error in getting cities:', error);
    }
}

export default ExportCitiesToExcelFetchAsync;