/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
      {
        protocol: "https",
        hostname: "assets.react-photo-album.com",
      },
    ],
  },
  webpack(config) {
    // Adding a new rule for handling SVGs with @svgr/webpack
    config.module.rules.push({
      test: /\.svg$/, // Apply the rule to .svg files
      use: ["@svgr/webpack"], // Use @svgr/webpack to handle these files
    });

    // If you need to add any additional Webpack configuration, you can do it here
    // For example, handling other file types, adding plugins, etc.
    // config.module.rules.push({
    //   test: /\.md$/,
    //   use: 'raw-loader',
    // });

    return config; // Return the updated config
  },
};

export default nextConfig;
