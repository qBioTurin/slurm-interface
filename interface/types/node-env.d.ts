declare namespace NodeJS {
    export interface ProcessEnv {
        KC_CLIENT_ID: string
        KC_CLIENT_SECRET: string
        KC_LOCAL_URL: string
        KC_REALM: string
        KC_CONTAINER_HOSTNAME_URL: string
    }
}