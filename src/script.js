import { Pedido } from "./pedido.js";

const pedido = new Pedido();


window.adicionar = function () {
  pedido.adicionar();
};

window.finalizar = function () {
  pedido.finalizar();
};

window.removerUltimo = function () {
  pedido.removerUltimo();
};