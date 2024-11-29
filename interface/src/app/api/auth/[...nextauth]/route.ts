import NextAuth, { AuthOptions } from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';

export const authOptions: AuthOptions = {
    providers: [
        KeycloakProvider({
            clientId: process.env.KEYCLOAK_CLIENT_ID,
            clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
            issuer: process.env.KEYCLOAK_ISSUER,

            // realm: process.env.KEYCLOAK_REALM,
            // serverUrl: process.env.KEYCLOAK_SERVER_URL,
        })
    ],
    session: {
        maxAge: 6 * 60 * 60, // 6 hours
    },
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.idToken = account.id_token
                token.accessToken = account.access_token
                token.refreshToken = account.refresh_token
                token.expiresAt = account.expires_at
            }
            return token
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken as string
            return session
        }
    }
}


// add function for refresh access token


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };