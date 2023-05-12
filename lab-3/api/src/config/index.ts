import dotenv from 'dotenv';

dotenv.config();

interface IConfig {
    environment: string;
    port: string | number;
    host: string;
    baseUri: string;
}

const config: IConfig = {
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
    environment: process.env.NODE_ENV || 'development',
    baseUri: process.env.BASE_URI || '/api/v1/'
}
export default config;