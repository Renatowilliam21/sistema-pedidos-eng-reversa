import Pedido from '../models/Pedido.js';

class PedidoService {
  constructor() {
    if (PedidoService.instance) {
      return PedidoService.instance;
    }

    this.pedido = new Pedido();

    PedidoService.instance = this;
  }

  getPedido() {
    return this.pedido;
  }
}

const instance = new PedidoService();
Object.freeze(instance);

export default instance;
