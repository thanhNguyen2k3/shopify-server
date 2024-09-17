/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true,
    },
    experimental: {
        serverActions: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'my-blob-store.public.blob.vercel-storage.com',
                port: '',
            },
        ],
    },
};

export default nextConfig;
