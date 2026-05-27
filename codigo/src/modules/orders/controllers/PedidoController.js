import { AuthMiddleware } from '../../../shared/middlewares/AuthMiddleware.js';
import { LoggerMiddleware } from '../../../shared/middlewares/LoggerMiddleware.js';

export class PedidoController {
    constructor(service) {
        this.service = service;
    }

    setView(view) {
        this.view = view;
        this.service.subscribe(pedido => this.view.render(pedido));
    }

    adicionarItem(produto, quantidade) {
        try {
            LoggerMiddleware.registrarLog("ADICIONAR_ITEM", { produto, quantidade });
            this.service.adicionarItem(produto, quantidade);
        } catch (error) {
            this.lidarComErro(error);
        }
    }

    async finalizarPedido(dadosRequisicao) {
        try {
            // Desafio Extra: Autenticação interceptando a chamada pelo Middleware
            AuthMiddleware.verificarAutenticacao(dadosRequisicao);
            
            LoggerMiddleware.registrarLog("FINALIZAR_PEDIDO", {});
            const pedidoSalvo = await this.service.finalizarPedido();
            
            this.view.mostrarSucesso("Pedido processado no módulo modular!");
            this.view.dispararWhatsApp(pedidoSalvo);
        } catch (error) {
            this.lidarComErro(error);
        }
    }

    lidarComErro(error) {
        console.error(`[HANDLER GLOBAL]: ${error.message}`);
        this.view.mostrarErro(error.message);
    }
}