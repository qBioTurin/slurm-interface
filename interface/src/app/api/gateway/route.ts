import { NextRequest, NextResponse } from 'next/server';
import logger from '@/../lib/logger';

const SLURM_API_BASE_URL = process.env.SLURM_API_URL;
const SLURM_JWT = process.env.SLURM_JWT;
// const SLURM_API_TESTING_URL = process.env.SLURM_API_TESTING_URL;
// const SLURM_JWT_TESTING = process.env.SLURM_JWT_TESTING;

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const path = searchParams.get('path');
    var DEBUG_API_URL = SLURM_API_BASE_URL;
    var DEBUG_KEY = SLURM_JWT;

    logger.info(`GET /api/gethome called with path: ${path}`); // logger info
    logger.debug(`Request Headers: ${JSON.stringify(req.headers, null, 2)}`); // logger debug
    logger.debug(`Request Query Parameters: ${JSON.stringify(Object.fromEntries(searchParams), null, 2)}`); // logger

    if (!path) {
        const errorMsg = 'API path is required';
        logger.error(errorMsg); // logger error
        return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    logger.debug(`Constructed URL for GET request: ${SLURM_API_BASE_URL}${path}`); // logger debug

    try {
        const slurmResponse = await fetch(`${DEBUG_API_URL}${path}`, {
            method: 'GET',
            headers: {
                'X-SLURM-USER-TOKEN': DEBUG_KEY || '',
                'Content-Type': 'application/json',
            },
        });

        if (!slurmResponse.ok) {
            const errorMsg = `Failed to fetch from SLURM API: ${slurmResponse.statusText}`;
            logger.error(errorMsg); // logger error
            throw new Error(errorMsg);
        }

        const data = await slurmResponse.json();
        logger.info(`GET request to ${path} succeeded.`); // logger info
        logger.debug(`Response Headers: ${JSON.stringify(Object.fromEntries(slurmResponse.headers), null, 2)}`); // logger debug
        logger.debug(`Response Data: ${JSON.stringify(data, null, 2)}`); // logger debug
        return NextResponse.json(data);

    } catch (error: any) {
        logger.error(`GET request to ${path} failed: ${error.message}`); // logger error
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const path = searchParams.get('path');

    logger.info(`POST /api/posthome called with path: ${path}`); // logger info
    logger.debug(`Request Headers: ${JSON.stringify(req.headers, null, 2)}`); // logger debug
    logger.debug(`Request Query Parameters: ${JSON.stringify(Object.fromEntries(searchParams), null, 2)}`); // logger debug

    if (!path) {
        const errorMsg = 'API path is required';
        logger.error(errorMsg); // logger error
        return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    try {
        const requestBody = await req.json();
        
        logger.debug(`POST request body: ${JSON.stringify(requestBody, null, 2)}`); // logger debug

        const slurmResponse = await fetch(`${SLURM_API_BASE_URL}${path}`, {
            method: 'POST',
            headers: {
                'X-SLURM-USER-TOKEN': SLURM_JWT || '',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        let data;
        const contentType = slurmResponse.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            data = await slurmResponse.json();
        } else {
            data = await slurmResponse.text();
        }

        logger.info(`POST request to ${path} succeeded.`); // logger info
        logger.debug(`Response Headers: ${JSON.stringify(Object.fromEntries(slurmResponse.headers), null, 2)}`); // logger debug
        logger.debug(`Response Data: ${typeof data === 'string' ? data : JSON.stringify(data, null, 2)}`); // logger debug
        
        return NextResponse.json(data);

    } catch (error: any) {
        logger.error(`POST request to ${path} failed: ${error.message}`); // logger error
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const path = searchParams.get('path');

    logger.info(`DELETE /api/deletehome called with path: ${path}`); // logger info
    logger.debug(`Request Headers: ${JSON.stringify(req.headers, null, 2)}`); // logger debug
    logger.debug(`Request Query Parameters: ${JSON.stringify(Object.fromEntries(searchParams), null, 2)}`); // logger debug

    if (!path) {
        return NextResponse.json({ error: 'API path is required' }, { status: 400 });
    }
    const url = SLURM_API_BASE_URL;

    try {
        const slurmResponse = await fetch(`${url}${path}`, {
            method: 'DELETE',
            headers: {
                'X-SLURM-USER-TOKEN': SLURM_JWT || '',
                'Content-Type': 'application/json',
            },
        });

        if (!slurmResponse.ok) {
            throw new Error(`Failed to fetch from SLURM API: ${slurmResponse.statusText}`);
        }

        const data = await slurmResponse.json();

        logger.info(`DELETE request to ${path} succeeded.`); // logger info
        logger.debug(`Response Headers: ${JSON.stringify(Object.fromEntries(slurmResponse.headers), null, 2)}`); // logger debug
        logger.debug(`Response Data: ${JSON.stringify(data, null, 2)}`); // logger debug

        return NextResponse.json(data);

    } catch (error: any) {
        logger.error(`DELETE request to ${path} failed: ${error.message}`); // logger error
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}




