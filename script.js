import { PedidoController } from "./src/controllers/pedidoController.js";
import { PedidoView } from "./src/views/pedidoView.js";
const view = new PedidoView();
const controller = new PedidoController(view);

window.adicionar = () => {
  const produto = document.getElementById("produto").value;
  const qtd = document.getElementById("qtd").value;
  controller.adicionarItem(produto, qtd);
};

window.finalizar = () => {
  controller.finalizar();
};