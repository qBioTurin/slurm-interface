/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    experimental: {
        missingSuspenseWithCSRBailout: false,
        optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    },
    env: {
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    }
};


export default nextConfig;
