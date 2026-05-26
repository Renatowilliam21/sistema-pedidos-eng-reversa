class PedidoRepository {
    constructor() {
        if (PedidoRepository.instance) {
            return PedidoRepository.instance;
        }
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
            console.warn("JSON Server não está rodando. Simulando sucesso no console.");
            console.log("Pedido salvo:", pedido);
        }
    }
}

// Exporta uma instância única (Singleton)
export default new PedidoRepository();