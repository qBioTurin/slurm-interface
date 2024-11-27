import { useState, useCallback } from 'react';

export function usePostData(path: string) {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const callPost = useCallback(async (requestBody: any) => {
        const DEBUG_KEY = ""; //debug, insert testing key

        try {
            setLoading(true);

            const request = new Request(`/gateway?path=${path}`, {
                method: 'POST',
                headers: {
                    'X-SLURM-USER-TOKEN': DEBUG_KEY || '',
                    'Content-Type': 'application/json',
                },
                body: requestBody,
                // @ts-expect-error
                duplex: 'half',
            });

            console.log("Request body typeof:", typeof requestBody); //debug
            console.log("Request body:", requestBody); //debug

            const response = await fetch(request);
            console.log("Response:", response);
            setData(requestBody);

        } catch (err: any) {
            setError(err.message || 'Unknown error');
        } finally {
            setLoading(false);
        }

    }, [path]);


    return { data, error, loading, callPost }
}
