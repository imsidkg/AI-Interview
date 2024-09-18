/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;


// 👇️ assumes you use Webpack 4
// module.exports = {
//     webpack: (config, {isServer}) => {
//       if (!isServer) {
//         config.node = {
//           tls: 'empty',
//           net: 'empty',
//         };
//       }
  
//       return config;
//     },
//   };
  