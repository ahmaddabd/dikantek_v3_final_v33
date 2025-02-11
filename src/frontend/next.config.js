module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['your-cdn-domain.com'], // يجب تغييرها إلى `CDN` الفعلي عند النشر
  },
  experimental: {
    serverActions: true,
  },
};