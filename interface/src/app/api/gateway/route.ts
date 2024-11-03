import { NextRequest, NextResponse } from 'next/server';

const SLURM_API_BASE_URL = process.env.SLURM_API_URL;
const SLURM_JWT = process.env.SLURM_JWT;
const SLURM_API_TESTING_URL = process.env.SLURM_API_TESTING_URL;
const SLURM_JWT_TESTING = process.env.SLURM_JWT_TESTING;

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const path = searchParams.get('path');
    var DEBUG_API_URL = SLURM_API_TESTING_URL + 'api/slurm/v0.0.41/';
    var DEBUG_KEY = SLURM_JWT_TESTING;

    if (!path) {
        return NextResponse.json({ error: 'API path is required' }, { status: 400 });
    }

    console.log("Complete path:", DEBUG_API_URL + path); //debug
    try {
        const slurmResponse = await fetch(`${DEBUG_API_URL}${path}`, {
            method: 'GET',
            headers: {
                'X-SLURM-USER-TOKEN': DEBUG_KEY || '',
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

    if (!path) {
        return NextResponse.json({ error: 'API path is required' }, { status: 400 });
    }

    // console.log("Gateway Request:", req); //debug

    try {
        const requestBody = await req.json();

        // console.log("Gateway Request body typeof:", typeof requestBody); //debug
        // console.log("Gateway Request body:", requestBody); //debug
        // console.log("Gateway Stringify Request body:", JSON.stringify(requestBody, null, 2));

        const slurmResponse = await fetch(`${SLURM_API_TESTING_URL}${path}`, {
            method: 'POST',
            headers: {
                'X-SLURM-USER-TOKEN': SLURM_JWT_TESTING || '',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        // console.log("Gateway Response:", slurmResponse); //debug
        // console.log("Gateway Response body typeof:", typeof slurmResponse.body);  //debug
        // console.log("Gateway Response status:", slurmResponse.status);  //debug
        // console.log("Gateway Response headers:", slurmResponse.headers); //debug

        let data;
        const contentType = slurmResponse.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            data = await slurmResponse.json();
        } else {
            data = await slurmResponse.text();
        }

        console.log("Response Data:", data);

        console.log("Gateway Response Data:", data); //debug    
        return NextResponse.json(data);

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const path = searchParams.get('path');

    if (!path) {
        return NextResponse.json({ error: 'API path is required' }, { status: 400 });
    }
    const url = SLURM_API_TESTING_URL;

    try {
        const slurmResponse = await fetch(`${url}${path}`, {
            method: 'DELETE',
            headers: {
                'X-SLURM-USER-TOKEN': SLURM_JWT_TESTING || '',
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




