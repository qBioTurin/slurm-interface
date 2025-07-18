interface GoogleIconProps extends React.ComponentPropsWithoutRef<'svg'> {
    size?: number | string;
}

export function GoogleIcon({ size, style, ...others }: GoogleIconProps) {
    return (
        <svg aria-hidden="true" focusable="false" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M17.64 9.204c0-.638-.057-1.251-.164-1.84H9v3.48h4.844a4.14 4.14 0 0 1-1.796 2.717v2.258h2.908c1.702-1.566 2.684-3.874 2.684-6.615Z" fill="#4285F4" />
            <path fillRule="evenodd" clipRule="evenodd" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.909-2.259c-.805.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853" />
            <path fillRule="evenodd" clipRule="evenodd" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05" />
            <path fillRule="evenodd" clipRule="evenodd" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.462.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335" /></svg>
    );
}