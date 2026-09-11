import nextEnv from '@next/env';
import nodemailer from 'nodemailer';
nextEnv.loadEnvConfig(process.cwd());
const t = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
    connectionTimeout: 15000, greetingTimeout: 15000, socketTimeout: 15000,
});
try { await t.verify(); console.log('AUTENTICACIÓN OK: Gmail acepta estas credenciales.'); }
catch (e) { console.log('FALLÓ:', e.code ?? '', '-', (e.response ?? e.message).slice(0, 160)); }
