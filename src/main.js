import { PedidoController } from './controllers/PedidoController.js';

document.addEventListener("DOMContentLoaded", () => {
    const controller = new PedidoController();

    document.getElementById("btnAdicionar").addEventListener("click", () => {
        controller.adicionarItem();
    });

    document.getElementById("btnFinalizar").addEventListener("click", () => {
        controller.finalizarPedido();
    });
});
