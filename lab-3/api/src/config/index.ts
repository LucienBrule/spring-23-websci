import dotenv from 'dotenv';

dotenv.config();

interface IConfig {
    spotify: {
        client_id: string;
        client_secret: string;
        redirect_uri: string;
    };
    environment: string;
    port: string | number;
    host: string;
    baseUri: string;
}

const config: IConfig = {
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
    environment: process.env.NODE_ENV || 'development',
    baseUri: process.env.BASE_URI || '/api/v1/',
    spotify: {
        client_id: process.env.SPOTIFY_CLIENT_ID || '',
        client_secret: process.env.SPOTIFY_CLIENT_SECRET || '',
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI || '',
    }
}
export default config;