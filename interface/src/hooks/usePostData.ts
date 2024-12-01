import { useState, useCallback } from 'react';

export function usePostData(path: string) {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const callPost = useCallback(async (requestBody: any) => {
        const DEBUG_KEY = ""; //debug, insert testing key
        setError(null);
        setData(null);

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
            console.log("Response:", response); //debug
            setData(requestBody);

            if(response.status != 200 || !response.ok) {
                console.log("throwing error because status is not 200"); //debug
                const errorText = await response.text();
                let formattedError = `HTTP ${response.status}`;
                try {
                    const errorData = JSON.parse(errorText);
                    if (errorData.error) {
                        formattedError += `: ${errorData.error}`;
                    } else {
                        formattedError += `: ${errorText}`;
                    }
                } catch {
                    formattedError += `: ${errorText}`;
                }
                throw new Error(formattedError);
            }

            const contentType = response.headers.get('content-type');
            const responseData = contentType?.includes('application/json')
                ? await response.json()
                : await response.text();

            setData(responseData);
            return responseData;

        } catch (err: any) {
            console.log("error caught at line 37:", err.message); //debug
            setError(err.message || 'An unknown error occurred');
            throw new Error(err.message);
        } finally {
            setLoading(false);
        }
    }, [path]);


    return { data, error, loading, callPost }
}
