/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        missingSuspenseWithCSRBailout: false,
        optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    },
    env: {
        CURRENT_PATH: process.env.CURRENT_PATH,
        CURRENT_USER: process.env.CURRENT_USER,
        CURRENT_WORKING_DIR: process.env.CURRENT_WORKING_DIR,
    },
};


export default nextConfig;
