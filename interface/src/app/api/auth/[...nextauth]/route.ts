import NextAuth from 'next-auth';
import { authOptions } from '@/utils/authOptions'

// TODO: add function for refresh access token

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };