import { NextRequest, NextResponse } from 'next/server';
import logger from '@/lib/logger';
import { getToken } from "next-auth/jwt"
import { init } from 'next/dist/compiled/webpack/webpack';

// change .env.local to switch between test and prod
const SLURM_API_URL = process.env.SLURM_API_URL;
// const SLURM_JWT = process.env.SLURM_JWT;
const SLURM_API_URL_RESERVATIONS = process.env.SLURM_API_URL_RESERVATIONS;

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const path = searchParams.get('path');

    const token = await getToken({ req });

    if (!token || !token.slurmToken) {
        return NextResponse.json({ error: "No token found" }, { status: 401 });
    }

    const slurmJWT = token.slurmToken as string;
    console.log("GET Request, JWT: ", slurmJWT);

    // logger.info(`GET /api/get called with path: ${path}`); // logger info
    // logger.info(`GET /api/get called with path: ${path}`); // logger info
    // logger.debug(`Request Headers: ${JSON.stringify(req.headers, null, 2)}`); // logger debug
    // logger.debug(`Request Query Parameters: ${JSON.stringify(Object.fromEntries(searchParams), null, 2)}`); // logger

    if (!path) {
        const errorMsg = 'API path is required';
        logger.error(errorMsg); // logger error
        return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    logger.debug(`Constructed URL for GET request: ${SLURM_API_URL}${path}`); // logger debug

    try {
        const slurmResponse = await fetch(`${SLURM_API_URL}${path}`, {
            method: 'GET',
            headers: {
                'X-SLURM-USER-TOKEN': slurmJWT || '',
                'Content-Type': 'application/json',
            },
        });

        if (!slurmResponse.ok) {
            const errorMsg = `Failed to fetch from SLURM API: ${slurmResponse.statusText}`;
            logger.error(errorMsg); // logger error
            throw new Error(errorMsg);
        }

        const data = await slurmResponse.json();
        // logger.info(`GET request to ${path} succeeded.`); // logger info
        // logger.debug(`Response Headers: ${JSON.stringify(Object.fromEntries(slurmResponse.headers), null, 2)}`); // logger debug
        // logger.debug(`Response Data: ${JSON.stringify(data, null, 2)}`); // logger debug
        return NextResponse.json(data);

    } catch (error: any) {
        logger.error(`GET request to ${path} failed: ${error.message}`); // logger error
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const path = searchParams.get('path');

    const token = await getToken({ req });

    if (!token) {
        return NextResponse.json({ error: "No token found" }, { status: 401 });
    }

    const slurmJWT = token.slurmToken as string;


    logger.info(`POST /api/post called with path: ${path}`); // logger info
    logger.debug(`Request Headers: ${JSON.stringify(req.headers, null, 2)}`); // logger debug
    logger.debug(`Request Query Parameters: ${JSON.stringify(Object.fromEntries(searchParams), null, 2)}`); // logger debug
    var url = SLURM_API_URL;

    if (!path) {
        const errorMsg = 'API path is required';
        logger.error(errorMsg); // logger error
        return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    if (path.includes('reservations')) {
        url = SLURM_API_URL_RESERVATIONS;
        logger.info('Reservations base URL: ' + url); // logger info
    }

    try {
        const requestBody = await req.json();

        logger.debug(`POST request body: ${JSON.stringify(requestBody, null, 2)}`); // logger debug

        const slurmResponse = await fetch(`${url}${path}`, {
            method: 'POST',
            headers: {
                'X-SLURM-USER-TOKEN': slurmJWT || '',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        console.log("SLURM Response in POST handler: ", slurmResponse);

        if (!slurmResponse.ok) {
            throw new Error(`Failed to post with SLURM API: ${slurmResponse.statusText}`);
        }

        const data = await slurmResponse.json();

        if (data.errors.length > 0) {
            throw new Error(`${data.errors[0].description}`);
        }

        if (data.warnings.length > 0) {
            throw new Error(`${data.warnings[0].description}`);
        }

        // We might still need to handle different content types ?

        // const contentType = slurmResponse.headers.get('content-type');
        // const data = contentType?.includes('application/json')
        //     ? await slurmResponse.json()
        //     : await slurmResponse.text();

        // logger.debug(`Response Headers: ${JSON.stringify(Object.fromEntries(slurmResponse.headers), null, 2)}`); // logger debug
        // logger.debug(`Response Data: ${typeof data === 'string' ? data : JSON.stringify(data, null, 2)}`); // logger debug

        // if (typeof data === 'string' && data.includes("error") || !slurmResponse.ok) {
        //     const errorMessage = typeof data === 'string' ? data : JSON.stringify(data);
        //     console.log("Error thrown after string check: " + errorMessage);
        //     throw new Error(`API Error: ${errorMessage}`);
        // }

        return NextResponse.json(data);

    } catch (error: any) {
        logger.error(`POST request to ${path} failed: ${error.message}`); // logger error
        return NextResponse.json({ error: error.message }, { status: 500, statusText: error.message });
    }
}

export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const path = searchParams.get('path');

    const token = await getToken({ req });

    if (!token) {
        return NextResponse.json({ error: "No token found" }, { status: 401 });
    }

    const slurmJWT = token.slurmToken as string;

    logger.info(`DELETE /api/delete called with path: ${path}`); // logger info
    logger.debug(`Request Headers: ${JSON.stringify(req.headers, null, 2)}`); // logger debug
    logger.debug(`Request Query Parameters: ${JSON.stringify(Object.fromEntries(searchParams), null, 2)}`); // logger debug

    if (!path) {
        return NextResponse.json({ error: 'API path is required' }, { status: 400 });
    }
    const url = SLURM_API_URL;

    try {
        const slurmResponse = await fetch(`${url}${path}`, {
            method: 'DELETE',
            headers: {
                'X-SLURM-USER-TOKEN': slurmJWT || '',
                'Content-Type': 'application/json',
            },
        });

        if (!slurmResponse.ok) {
            throw new Error(`Failed to fetch from SLURM API: ${slurmResponse.statusText}`);
        }

        const data = await slurmResponse.json();

        logger.info(`DELETE request to ${path} succeeded.`); // logger info
        logger.info(`Response Headers: ${JSON.stringify(Object.fromEntries(slurmResponse.headers), null, 2)}`); // logger debug
        logger.info(`Response Data: ${JSON.stringify(data, null, 2)}`); // logger debug

        if (data.warnings.length > 0) {
            throw new Error(`${data.warnings[0].description}`);
        }

        return NextResponse.json(data);

    } catch (error: any) {
        logger.error(`DELETE request to ${path} failed: ${error.message}`); // logger error
        return NextResponse.json({ error: error.message }, { status: 500, statusText: error.message }
        );
    }
}




