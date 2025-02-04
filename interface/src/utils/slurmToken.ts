interface slurmTokenEncodeProps {
    exp: number,
    // sub: string,
}

interface slurmTokenDecodeProps {
    token: string,
}


async function readSlurmSecretKey() {
    const fs = require('fs').promises;

    try {
        const secretKeyPath = '../config/jwt_hs256.key';
        const secret = await fs.readFile(secretKeyPath);
        // console.log("Slurm SecretKey: ", secret); //debug
        // console.log("Slurm SecretKey base64: ", secret.toString("base64")); //debug
        return secret;

    } catch (err) {
        console.error(err);
    }
}

export async function encodeSlurmToken({ exp }: slurmTokenEncodeProps) {
    var jwt = require('jsonwebtoken');
    const secretKey = await readSlurmSecretKey();

    const data = {
        exp: exp,
        iat: Math.floor(Date.now() / 1000),
        sun: process.env.CURRENT_USER,
    };

    const token = jwt.sign(data, secretKey, { algorithm: 'HS256' });
    console.log("slurmToken encoded: ", token);

    return token;
}

export function decodeSlurmToken({ token }: slurmTokenDecodeProps) {
    const jwtDecode = require('jwt-decode');

    const decoded = jwtDecode(token);
    console.log("SlurmToken decoded: ", decoded);
    return decoded;
}



