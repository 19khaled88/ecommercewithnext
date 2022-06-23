/** @type {import('next').NextConfig} */
// const withPlugins = require('next-compose-plugins')
// const withImages = require('next-images')
const nextConfig = {
  reactStrictMode: true,
  env:{
    'BASE_URL':'https://ecommercewithnext.vercel.app',
    // khaled:VNHAybzMnVDF6NMq
    'MONGODB_URL':"mongodb+srv://khaled:VNHAybzMnVDF6NMq@cluster0.ka5da.mongodb.net/ecommercenext",
    // mongodb+srv://khaled:VNHAybzMnVDF6NMq@cluster0.ka5da.mongodb.net/ecommercenext?retryWrites=true&w=majority
    // mongodb+srv://khaled:VNHAybzMnVDF6NMq@cluster0.ka5da.mongodb.net/nextDB
    'ACCESS_TOKEN':"PrY9~>uw$u?&z\@>}GUUPqy!Kz{'m!WF4N38$4t8rG8RcA'4,e)$=Ttq3D5;paWz",
    'REFRESH_TOKEN':"L<dBtC]tD'&K&?JZ)LR)tg5z;G':W9]Twt9-}H8W@k:9>(wmB%n7kK=Ej;=ga4_'#",
    //liveUrl= 'https://ecommercewithnext.vercel.app/'
    //localUrl='http://localhost:3000'

  },
  imgaes:{
    loader:'cloudinary',
    domains: ["res.cloudinary.com"],
    loader: 'imgix',
    path: 'https://**.cloudinary.com/be-fresh-ltd/',
    domains: ['https://images.unsplash.com'],
    domains: ['https://assets.vercel.com'],
    remotePatterns:[
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
        port: '',
        pathname: '/be-fresh-ltd/**',
      }
    ]
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false
      config.resolve.fallback.dns = false
      config.resolve.fallback.net = false
    }

    return config;
}
}

module.exports = nextConfig
// module.exports = withPlugins([[withImages]], nextConfig)
