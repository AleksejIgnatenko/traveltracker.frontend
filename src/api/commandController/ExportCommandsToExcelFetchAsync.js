import { CommandController } from "../controllers";

async function ExportCommandsToExcelFetchAsync() {
    try {
        const response = await fetch(`${CommandController}/export-to-excel`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

    const blob = await response.blob(); 
    const url = window.URL.createObjectURL(blob); 

    const a = document.createElement("a");
    a.href = url;
    a.download = "commands.xlsx"; 
    document.body.appendChild(a); 
    a.click(); 
    a.remove(); 
    window.URL.revokeObjectURL(url); 
    } catch (error) {
        console.error('Error in getting commands:', error);
    }
}

export default ExportCommandsToExcelFetchAsync;