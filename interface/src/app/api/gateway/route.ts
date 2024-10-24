import { NextRequest, NextResponse } from 'next/server';

const SLURM_API_BASE_URL = process.env.SLURM_API_URL;
const SLURM_JWT = process.env.SLURM_JWT;
const SLURM_API_TESTING_URL = process.env.SLURM_API_TESTING_URL;
const SLURM_JWT_TESTING = process.env.SLURM_JWT_TESTING;

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const path = searchParams.get('path');
    //const token = req.headers.get('Authorization') || '';  // Assuming JWT is passed in headers

    if (!path) {
        return NextResponse.json({ error: 'API path is required' }, { status: 400 });
    }

    try {
        const slurmResponse = await fetch(`${SLURM_API_BASE_URL}${path}`, {
            method: 'GET',
            headers: {
                'X-SLURM-USER-TOKEN': SLURM_JWT || '',
                'Content-Type': 'application/json',
            },
        });

        if (!slurmResponse.ok) {
            throw new Error(`Failed to fetch from SLURM API: ${slurmResponse.statusText}`);
        }

        const data = await slurmResponse.json();
        return NextResponse.json(data);

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const path = searchParams.get('path');
    //const token = req.headers.get('Authorization') || '';  // Assuming JWT is passed in headers

    if (!path) {
        return NextResponse.json({ error: 'API path is required' }, { status: 400 });
    }

    console.log("Complete path:", `${SLURM_API_TESTING_URL}${path}`);

    console
    try {
        const slurmResponse = await fetch(`${SLURM_API_TESTING_URL}${path}`, {
            method: 'POST',
            headers: {
                //'X-SLURM-USER-TOKEN': SLURM_JWT_TESTING || '',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });

        if (!slurmResponse.ok) {
            throw new Error(`Failed to fetch from SLURM API TESTING: ${slurmResponse.statusText}`);
        }

        const data = await slurmResponse.json();
        return NextResponse.json(data);

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}




