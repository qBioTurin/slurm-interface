import { useState } from 'react';

export function useDeleteData() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const deleteData = async (path: string) => {
        try {
            setLoading(true);
            const response = await fetch(`/gateway?path=${path}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            //console.log("Response for useDeleteData:", response); //debug

            if (!response.ok) {
                throw new Error(`${response.statusText}`);
            }

        } catch (err: any) {
            setError(err.message || 'Unknown error');
            throw new Error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { error, loading, deleteData };
}