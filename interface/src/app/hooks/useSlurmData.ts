import { useState, useEffect, useCallback } from 'react';

// This hook fetches data from the Slurm REST API using the provided path
export function useSlurmData(path: string) {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = useCallback(async () => {
        console.log("Fetching data from:", `/api/gateway?path=${encodeURIComponent(path)}`); //debug
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/gateway?path=${encodeURIComponent(path)}`, {
                method: 'GET',
                headers: {
                    'X-SLURM-USER-TOKEN': process.env.SLURM_JWT || '',
                    'Content-Type': 'application/json',
                },
            });
            
            console.log("Response status:", response.status); //debug
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.statusText}`);
            }

            const jsonData = await response.json();
            console.log("in useSlurmData:", jsonData); //debug
            setData(jsonData);


        } catch (err: any) {
            setError(err.message || 'Unknown error');
        } finally {
            setLoading(false);
        }
    }, [path]);

    useEffect(() => {
        console.log("useEffect called"); //debug
        if (path) {
            fetchData();
        }
    }, [path, fetchData]);

    return { data, error, loading, refetch: fetchData };
}
