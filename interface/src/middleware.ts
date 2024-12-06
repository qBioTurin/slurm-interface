export { default } from 'next-auth/middleware'

//Protects nested routes under dashboard
export const config = { matcher: ["/dashboard/:path*"] } 
