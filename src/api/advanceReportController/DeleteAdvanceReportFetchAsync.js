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
            const errorData = await response.json();
            if (response.status === 400) {
                const errorMessage = Object.values(errorData.error).join("\n");
                alert(errorMessage);
            } else {
                alert(errorData);
            }
        }
    } catch (error) {
        console.error('Error in deleting advance report:', error);
    }
}

export default DeleteAdvanceReportFetchAsync;