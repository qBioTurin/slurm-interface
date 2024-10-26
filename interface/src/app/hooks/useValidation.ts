import { useCallback, useState } from 'react';

export default function useValidation() {
    const [errorValidation, setErrorValidation] = useState<string | null>(null);
    const validate = useCallback((data: any, schema: any,
        path: string) => {

        var type = "";
        //if path contains jobs, return the jobs schema
        if (path.includes('job')) {
            type = 'jobs';
        } else if (path.includes('node')) {
            type = 'nodes';
        } else if (path.includes('reservation')) {
            type = 'reservations';
        }


        try {
            const validatedData = schema.parse(data);
            console.log('Validated data:', validatedData);
            // If type is a valid property of the schema
            if (validatedData.hasOwnProperty(type) === false) {
                setErrorValidation('Invalid data type');
            } else {
                return validatedData[type];
            }
        } catch (err: any) {
            console.error('Error validating data:', err);
            setErrorValidation(err.message || 'Unknown error');
        }
    }, []);

    return { validate, errorValidation };

}