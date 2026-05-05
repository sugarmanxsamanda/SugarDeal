const isGithubPages = process.env.GITHUB_PAGES === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  output: isGithubPages ? "export" : undefined,
  basePath: isGithubPages ? "/SugarDeal" : undefined,
  assetPrefix: isGithubPages ? "/SugarDeal/" : undefined,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
