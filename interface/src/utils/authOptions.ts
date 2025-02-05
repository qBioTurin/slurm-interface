import { AuthOptions, TokenSet } from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';
import { JWT } from "next-auth/jwt";
import { encodeSlurmToken } from "./slurmToken";

async function refreshAccessToken(token: JWT) {
    try {
        const url = `${process.env.KC_LOCAL_URL}/realms/${process.env.KC_REALM}/protocol/openid-connect/token`;
        const body = new URLSearchParams({
            client_id: process.env.KC_CLIENT_ID,
            client_secret: process.env.KC_CLIENT_SECRET,
            grant_type: "refresh_token",
            refresh_token: token.refreshToken! as string,
        });

        console.log("*** url:", url) //debug

        const response = await fetch(url, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            method: "POST",
            body: body.toString(),
        });

        const refreshedTokens = await response.json();

        console.log("***** refreshedTokens:", refreshedTokens.refresh_expires_in) //debug


        if (!response.ok) throw refreshedTokens

        const newExpirationDate = Math.floor(Date.now() / 1000 + (refreshedTokens.expires_in as number))

        return {
            ...token, //keep the previous token properties
            idToken: refreshedTokens.id_token,
            accessToken: refreshedTokens.access_token,
            expiresAt: newExpirationDate,
            refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
            slurmToken: await encodeSlurmToken({ exp: newExpirationDate as number }),
        }
    } catch (error) {
        console.log(error)

        return {
            ...token,
            error: "RefreshAccessTokenError",
        }
    }
}

export const authOptions: AuthOptions = {
    session: { strategy: 'jwt' },
    jwt: { maxAge: 60 * 60 }, // 1 hour
    pages: {
        signIn: '/',
        signOut: '/',
    },
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
                    prompt: "login",
                    grant_type: "authorization_code",
                    scope: "openid email profile",
                    response_type: 'code'
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
            console.log("--- jwt token"); //debug
            if (account) { // primo accesso alla sessione
                console.log("----- primo accesso: ", account.expires_at); //debug
                const exp = account.expires_at as number;
                const newSlurmToken = await encodeSlurmToken({ exp });
                return {
                    idToken: account.id_token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    slurmToken: newSlurmToken,
                    expiresAt: account.expires_at
                }
            }

            //Returns previous token if the access token has not expired yet
            if (Date.now() < ((token.expiresAt! as number) * 1000 - 60 * 1000)) { //token valido
                console.log("----- token valido") //debug
                return token;
            }

            //Refresh the access token
            console.log("----- token invalido: ", token.expiresAt) //debug
            return await refreshAccessToken(token)
        },

        async session({ session, token }) {
            console.log("--- checking session"); //debug
            if (token) {
                console.log("----- session token exists: ", token.expiresAt); //debug
                session.accessToken = token.accessToken as string;
            } else {
                console.log("----- session token does not exist"); //debug
            }
            return session;
        }
    }
}