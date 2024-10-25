import { useState, useEffect, useCallback } from 'react';



// This hook fetches data from the Slurm REST API using the provided path
export function useSlurmData(path: string) {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(`/api/gateway?path=${path}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
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

    useEffect(() => {
        if (path) {
            fetchData();
        }
    }, [path, fetchData]);

    return { data, error, loading, refetch: fetchData };
}
