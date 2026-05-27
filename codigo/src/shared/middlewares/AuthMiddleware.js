// src/shared/middlewares/AuthMiddleware.js
export class AuthMiddleware {
    static verificarAutenticacao(req) {
        // Simulação de um token vindo do header/sessão
        const token = req.headers?.['authorization'] || localStorage.getItem('token');
        
        if (!token || token !== "token-fake-valido") {
            throw new Error("401 - Não autorizado: Usuário não está autenticado.");
        }
        
        console.log("[MIDDLEWARE AUTH]: Usuário autenticado com sucesso.");
        return true;
    }
}
