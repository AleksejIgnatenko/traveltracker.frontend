import { AdvanceReportController } from "../controllers";

async function CreateAdvanceReportFetchAsync(advanceReport) {
    try {
        const response = await fetch(`${AdvanceReportController}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(advanceReport)
        });

        if(response.ok) {
            return;
        }
        if (response.status === 400) {
            const errorData = await response.json();
            console.error('Error details:', errorData);
        } else {
            const errorData = await response.json();
            console.error('Error details:', errorData);
        }
    } catch (error) {
        console.error('Error in creating advance report:', error);
    }
}

export default CreateAdvanceReportFetchAsync;