const API_URL = process.env.SLURM_API_URL;
const SLURM_JWT = process.env.SLURM_JWT;


export async function getReservations() {
    const url = API_URL + '/reservations';
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-SLURM-USER-TOKEN': SLURM_JWT || '',
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching reservations: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (error) {
        console.error('Error fetching reservations:', error);
    }
}


export async function getNodes() {
    const url = API_URL + '/nodes';
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-SLURM-USER-TOKEN': SLURM_JWT || '',
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching nodes: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);
    }
    catch (error) {
        console.error('Error fetching nodes:', error);
    }
}

export async function getJobs() {
    const url = API_URL + '/jobs';
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-SLURM-USER-TOKEN': SLURM_JWT || '',
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching jobs: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching jobs:', error);
    }
}


