import { useState } from 'react';

export function useDeleteData() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const deleteData = async (path: string) => {
        try {
            setLoading(true);
            const response = await fetch(`/api/gateway?path=${path}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error deleting data: ${response.statusText}`);
            }

        } catch (err: any) {
            setError(err.message || 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    return { error, loading, deleteData };
}