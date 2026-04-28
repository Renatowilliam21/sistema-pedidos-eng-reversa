export class PedidoRepository {
    static #instancia;
    #apiUrl = "http://localhost:3000/pedidos"; // URL padrão do JSON Server

    constructor() {
        if (PedidoRepository.#instancia) return PedidoRepository.#instancia;
        PedidoRepository.#instancia = this;
    }

    static getInstancia() {
        if (!this.#instancia) this.#instancia = new PedidoRepository();
        return this.#instancia;
    }

    // Agora é assíncrono para lidar com a API
    async salvar(pedido) {
        try {
            const response = await fetch(this.#apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pedido)
            });
            return await response.json();
        } catch (error) {
            console.error("Erro ao salvar no JSON Server:", error);
        }
    }
}
