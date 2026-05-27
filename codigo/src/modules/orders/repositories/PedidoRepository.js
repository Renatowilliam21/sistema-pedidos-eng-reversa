class PedidoRepository {
    constructor() {
        if (PedidoRepository.instance) return PedidoRepository.instance;
        this.apiUrl = 'http://localhost:3000/pedidos';
        PedidoRepository.instance = this;
    }

    async salvar(pedido) {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pedido)
            });
            return await response.json();
        } catch (error) {
            console.warn("[MÓDULO ORDERS - REPO]: JSON Server offline. Simulando sucesso.");
            return pedido;
        }
    }
}
export default new PedidoRepository();