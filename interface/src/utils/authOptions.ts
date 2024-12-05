import { AuthOptions, TokenSet } from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';
import { jwtDecode } from "jwt-decode";
// import { encrypt } from "@/utils/encryption"; #TODO: introduce encryption in session
import { JWT } from "next-auth/jwt";

function requestRefreshOfAccessToken(token: JWT) {
    return fetch(`${process.env.KC_LOCAL_URL}/realms/${process.env.KC_REALM}/protocol/openid-connect/token`, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            client_id: process.env.KC_CLIENT_ID,
            client_secret: process.env.KC_CLIENT_SECRET,
            grant_type: "refresh_token",
            refresh_token: token.refreshToken! as string,
        }),
        method: "POST",
        cache: "no-store"
    });
}

export const authOptions: AuthOptions = {
    session: { strategy: 'jwt' },
    jwt: { maxAge: 6 * 60 * 60 }, // 6 hours
    providers: [
        KeycloakProvider({
            clientId: process.env.KC_CLIENT_ID,
            clientSecret: process.env.KC_CLIENT_SECRET,
            issuer: `${process.env.KC_LOCAL_URL}/realms/${process.env.KC_REALM}`,
            wellKnown: undefined,

            // these are needed in order to have authjs get further in the authorization process in docker
            jwks_endpoint: `${process.env.KC_CONTAINER_HOSTNAME_URL}/realms/${process.env.KC_REALM}/protocol/openid-connect/certs`,
            authorization: {
                params: {
                    scope: "openid email profile",
                },
                url: `${process.env.KC_LOCAL_URL}/realms/${process.env.KC_REALM}/protocol/openid-connect/auth`,
            },
            token: `${process.env.KC_CONTAINER_HOSTNAME_URL}/realms/${process.env.KC_REALM}/protocol/openid-connect/token`,
            userinfo: `${process.env.KC_CONTAINER_HOSTNAME_URL}/realms/${process.env.KC_REALM}/protocol/openid-connect/userinfo`,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        async jwt({ token, account }) {

            if (account) { // primo accesso alla sessione
                token.idToken = account.id_token
                token.accessToken = account.access_token
                token.refreshToken = account.refresh_token
                token.expiresAt = account.expires_at
                return token;
            }

            if (Date.now() < ((token.expiresAt! as number) * 1000 - 60 * 1000)) { //token valido
                return token;

            } else { // token scaduto
                try {
                    const response = await requestRefreshOfAccessToken(token)

                    const tokens: TokenSet = await response.json()

                    if (!response.ok) throw tokens

                    const updatedToken: JWT = {
                        ...token, // Keep the previous token properties
                        idToken: tokens.id_token,
                        accessToken: tokens.access_token,
                        expiresAt: Math.floor(Date.now() / 1000 + (tokens.expires_in as number)),
                        refreshToken: tokens.refresh_token ?? token.refreshToken,
                    }
                    return updatedToken
                } catch (error) {
                    console.error("Error refreshing access token", error)
                    return { ...token, error: "RefreshAccessTokenError" }
                }
            }
        },

        async session({ session, token }) {
            session.accessToken = token.accessToken as string
            return session
        }
    }
}