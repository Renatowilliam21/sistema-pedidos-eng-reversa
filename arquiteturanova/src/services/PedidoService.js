import { ItemPedido } from "../models/ItemPedido.js";
import { ProdutoFactory } from "../factories/ProdutoFactory.js";
import { DescontoService } from "./DescontoService.js";

export class PedidoService {
  constructor(pedido) {
    this.pedido = pedido;
    this.observers = [];
  }

  adicionarObserver(observer) {
    this.observers.push(observer);
  }

  notificar() {
    this.observers.forEach(observer => observer.atualizar(this.pedido));
  }

  adicionar(nome, qtd) {
    if (!qtd || qtd <= 0) {
      throw new Error("Quantidade inválida");
    }

    const produto = ProdutoFactory.criarProduto(nome);
    const item = new ItemPedido(produto, qtd);

    this.pedido.adicionarItem(item);
    this.notificar();
  }

  removerUltimo() {
    this.pedido.removerUltimo();
    this.notificar();
  }

  calcularTotal() {
    return this.pedido.calcularTotal();
  }

  finalizar() {
    const total = this.calcularTotal();

    const desconto = DescontoService.aplicarDesconto(total);
    const taxa = total * 0.05; // Exemplo de taxa fixa de 5%

    return total - desconto + taxa;
  }

  limpar() {
    this.pedido.limpar();
    this.notificar();
  }
}