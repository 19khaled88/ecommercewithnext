/** @type {import('next').NextConfig} */
// const withPlugins = require('next-compose-plugins')
// const withImages = require('next-images')
const nextConfig = {
  reactStrictMode: false,
  env:{
    // 'BASE_URL':'https://ecommercewithnext.vercel.app',
    'BASE_URL':'http://localhost:3000',
    // khaled:VNHAybzMnVDF6NMq
    'MONGODB_URL':"mongodb+srv://khaled:VNHAybzMnVDF6NMq@cluster0.ka5da.mongodb.net/ecommercenext",
    // mongodb+srv://khaled:VNHAybzMnVDF6NMq@cluster0.ka5da.mongodb.net/ecommercenext?retryWrites=true&w=majority
    // mongodb+srv://khaled:VNHAybzMnVDF6NMq@cluster0.ka5da.mongodb.net/nextDB
    'ACCESS_TOKEN':"PrY9~>uw$u?&z\@>}GUUPqy!Kz{'m!WF4N38$4t8rG8RcA'4,e)$=Ttq3D5;paWz",
    'REFRESH_TOKEN':"L<dBtC]tD'&K&?JZ)LR)tg5z;G':W9]Twt9-}H8W@k:9>(wmB%n7kK=Ej;=ga4_'#",
    'PAYPAL_CLIENT_ID_GENERATED':"AbGFym1Xhl7I7QkVU1E2nHZmboIBh2RQXQYoqMN0qSrnp6TTHvtzwnhdeeoPdiW76XwKDLmYjsCBRpEV"
  },
  imgaes:{
    domains: ['res.cloudinary.com'],
    domains:['https://images.unsplash.com'],
    domains: ['https://assets.vercel.com'],
  },
 
  webpack: (config, { isServer }) => {
        if (!isServer) {
          config.resolve.fallback.fs = false
          config.resolve.fallback.dns = false
          config.resolve.fallback.net = false
        }

        return config;
  },
  theme: {
    screens: {
      'sm': '576px',
      // => @media (min-width: 576px) { ... }

      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'md': '960px',
      // => @media (min-width: 960px) { ... }

      'lg': '992px',
        // => @media (min-width: 992px) { ... }


      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      'lg': '1440px',
      // => @media (min-width: 1440px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }

      '3xl': '1600px',

       // => @media (min-width: 1600px) { ... }

       'tablet': '640px',
       // => @media (min-width: 640px) { ... }
 
       'laptop': '1024px',
       // => @media (min-width: 1024px) { ... }
 
       'desktop': '1280px',
       // => @media (min-width: 1280px) { ... }
     
    }
  }
}

module.exports = nextConfig
// module.exports = withPlugins([[withImages]], nextConfig)
