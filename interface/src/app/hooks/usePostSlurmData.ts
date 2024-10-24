import { useState, useCallback, useEffect } from 'react';

export function usePostSlurmData(path: string) {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const callPost = useCallback(async (data: any) => {
        try {
            setLoading(true);
            const response = await fetch(`/api/gateway?path=${path}`, {
                method: 'POST',
                headers: {
                    'X-SLURM-USER-TOKEN': process.env.SLURM_JWT_TESTING || '',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.statusText}`);
            }

            const jsonData = await response.json();
            setData(jsonData);
        } catch (err: any) {
            setError(err.message || 'Unknown error');
        } finally {
            setLoading(false);
        }

    }, [path]);


    return { data, error, loading, callPost }
}
