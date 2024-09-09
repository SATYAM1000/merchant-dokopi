/** @type {import('next').NextConfig} */

const prod = process.env.NODE_ENV === "production";

// Use an asynchronous function to handle the dynamic import
const withPWA = async () => {
  const nextPWA = (await import("next-pwa")).default;

  return nextPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: !prod,
  });
};

const getNextConfig = async () => {
  const nextPWAConfig = await withPWA();

  return nextPWAConfig({
    reactStrictMode: true,
    swcMinify: true,

    env: {
      CLOUDFRONT_URL: process.env.CLOUDFRONT_URL,
      API_DOMAIN: process.env.API_DOMAIN,
      SOCKET_URL: process.env.SOCKET_URL,
    },

    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "lh3.googleusercontent.com",
        },
        {
          protocol: "https",
          hostname: "images.unsplash.com",
          port: "",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "i.ytimg.com",
          port: "",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "example.com",
          port: "",
        },
        {
          protocol: "https",
          hostname: "encrypted-tbn0.gstatic.com",
          port: "",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "placehold.co",
          port: "",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "user-images.githubusercontent.com",
        },
        {
          protocol: "https",
          hostname: "two.satyamx55.bucket.s3.ap-south-1.amazonaws.com",
        },
        {
          protocol: "https",
          hostname: "d28fpa5kkce5uk.cloudfront.net",
          port: "",
          pathname: "/**",
        },
      ],
    },

    async headers() {
      return [
        {
          source: "/(.*)",
          headers: [
            {
              key: "X-Content-Type-Options",
              value: "nosniff",
            },
            {
              key: "X-Frame-Options",
              value: "DENY",
            },
            {
              key: "Referrer-Policy",
              value: "strict-origin-when-cross-origin",
            },
          ],
        },
        {
          source: "/sw.js",
          headers: [
            {
              key: "Content-Type",
              value: "application/javascript; charset=utf-8",
            },
            {
              key: "Cache-Control",
              value: "no-cache, no-store, must-revalidate",
            },
            {
              key: "Content-Security-Policy",
              value: "default-src 'self'; script-src 'self'",
            },
          ],
        },
      ];
    },
  });
};

export default await getNextConfig();
