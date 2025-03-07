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
            console.error('Failed to update advance report');
        }
    } catch (error) {
        console.error('Error in updating advance report:', error);
    }
}

export default UpdateAdvanceReportFetchAsync;