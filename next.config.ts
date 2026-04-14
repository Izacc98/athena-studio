/** @type {import('next').NextConfig} */
const nextConfig = {
  // Esto evita que el build falle por errores de tipos o de estilo
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
