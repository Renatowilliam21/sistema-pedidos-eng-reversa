export class PedidoController {
    constructor(service) {
        this.service = service;
    }

    // Liga a View depois de instanciada
    setView(view) {
        this.view = view;
        // Se inscreve no Observer do Service para atualizar a View automaticamente
        this.service.subscribe(pedido => this.view.render(pedido));
    }

    adicionarItem(produto, quantidade) {
        try {
            this.service.adicionarItem(produto, quantidade);
        } catch (error) {
            this.view.mostrarErro(error.message);
        }
    }

    async finalizarPedido() {
        try {
            await this.service.finalizarPedido();
            alert("Pedido finalizado com sucesso!");
        } catch (error) {
            this.view.mostrarErro(error.message);
        }
    }
}