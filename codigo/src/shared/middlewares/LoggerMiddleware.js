// src/shared/middlewares/LoggerMiddleware.js
export class LoggerMiddleware {
    static registrarLog(acao, payload) {
        const timestamp = new Date().toISOString();
        console.log(`[LOG ${timestamp}] Ação: ${acao} | Dados:`, JSON.stringify(payload));
    }
}