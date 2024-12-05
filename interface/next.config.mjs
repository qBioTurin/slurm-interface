/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    experimental: {
        missingSuspenseWithCSRBailout: false,
        optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    },
    env: {
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        CURRENT_PATH: process.env.CURRENT_PATH,
        CURRENT_USER: process.env.CURRENT_USER,
        CURRENT_WORKING_DIR: process.env.CURRENT_WORKING_DIR,
    },
};


export default nextConfig;
