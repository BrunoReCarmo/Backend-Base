import { messages } from './messages';
//Requerir pelo .env
import * as dotenv from 'dotenv';
dotenv.config();

const jwt_secret_key = process.env.JWT_SECRET as string;

export {
    messages,
    jwt_secret_key
};