/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    experimental: {
        missingSuspenseWithCSRBailout: false,
        optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    }
};


export default nextConfig;
