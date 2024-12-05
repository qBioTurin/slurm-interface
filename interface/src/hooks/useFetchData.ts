import { useState, useEffect, useCallback } from 'react';
import useValidation from './useValidation';

export function useFetchData(path: string, responseSchema: any) {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { validate, errorValidation } = useValidation();

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(`/gateway?path=${path}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.statusText}`);
            }

            const jsonData = await response.json();

            // Parse the data using using the validation hook
            const validatedData = validate(jsonData, responseSchema, path);
            if (errorValidation) {
                throw new Error(errorValidation);
            }

            setData(validatedData);
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
