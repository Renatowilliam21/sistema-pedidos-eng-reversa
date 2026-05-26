// src/shared/middlewares/authMiddleware.js

export function authMiddleware(nextAction) {
    console.log("[Middleware] Interceptando requisição... Verificando autenticação fake.");
    
    // Altere para 'false' se quiser simular um usuário deslogado e bloquear o sistema
    const usuarioAutenticado = true; 

    if (usuarioAutenticado) {
        console.log("[Middleware] Usuário autenticado com sucesso! Liberando acesso.");
        nextAction(); // Executa a ação do controller que foi interceptada
    } else {
        console.error("[Middleware] Acesso negado! Usuário não autenticado.");
        alert("Erro 401: Você não tem permissão para acessar esta funcionalidade.");
    }
}