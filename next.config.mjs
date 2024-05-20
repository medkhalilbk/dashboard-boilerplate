/** @type {import('next').NextConfig} */
const nextConfig = { 
    transpilePackages: ['crypto-js'],
    images: {
        domains:"*",
        remotePatterns: [
            {
              protocol: 'https',
              hostname: '**',
              port: '',
              pathname: '**',
            },
          ],
    }
};

export default nextConfig;
