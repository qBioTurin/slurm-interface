import { jwtDecode } from 'jwt-decode';

interface slurmTokenEncodeProps {
    exp: number,
    // sub: string,
}

interface slurmTokenDecodeProps {
    token: string,
}


function readSlurmSecretKey() {
    const fs = require('fs').promises;

    try {
        const secretKeyPath = '../config/jwt_hs256.key';
        const data = fs.readFile(secretKeyPath, 'utf8');
        return data.toString();

    } catch (err) {
        console.error(err);
    }
}

export function encodeSlurmToken({ exp }: slurmTokenEncodeProps) {
    const sign = require('jwt-encode');
    const secretKey = readSlurmSecretKey();

    const data = {
        iat: Math.floor(Date.now() / 1000),
        exp: exp,
        sub: process.env.CURRENT_USER,
    };

    const jwt = sign(data, secretKey);
    console.log("slurmTokenExp: ", data.exp);
    console.log("slurmToken: ", jwt);

    return jwt;
}

export function decodeSlurmToken({ token }: slurmTokenDecodeProps) {
    const decoded = jwtDecode(token);
    console.log("SlurmToken decoded: ", decoded);
    return decoded;
}



