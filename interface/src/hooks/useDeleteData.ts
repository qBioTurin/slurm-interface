export function useDeleteData() {
    const deleteData = async (path: string) => {
        try {
            const response = await fetch(`/gateway?path=${path}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`${response.statusText}`);
            }

        } catch (err: any) {
            throw new Error(err.message); // let the caller handle the error
        }
    };

    return { deleteData };
}