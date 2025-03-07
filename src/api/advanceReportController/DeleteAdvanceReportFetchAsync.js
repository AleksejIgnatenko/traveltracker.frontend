import { AdvanceReportController } from "../controllers";

async function DeleteAdvanceReportFetchAsync(advanceReportId) {
    try {
        const response = await fetch(`${AdvanceReportController}/${advanceReportId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            console.error('Failed to delete advance report');
        }
    } catch (error) {
        console.error('Error in deleting advance report:', error);
    }
}

export default DeleteAdvanceReportFetchAsync;