/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

export default nextConfig;
