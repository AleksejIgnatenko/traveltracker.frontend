import { AdvanceReportController } from "../controllers";

async function UpdateAdvanceReportFetchAsync(advanceReport) {
    try {
        const response = await fetch(`${AdvanceReportController}/${advanceReport.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(advanceReport)
        });

        if (!response.ok) {
            const errorData = await response.json();
            if (response.status === 400) {
                const errorMessage = Object.values(errorData.error).join("\n");
                alert(errorMessage);
            } else {
                alert(errorData);
            }
        }
    } catch (error) {
        console.error('Error in updating advance report:', error);
    }
}

export default UpdateAdvanceReportFetchAsync;