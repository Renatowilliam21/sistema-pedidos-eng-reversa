import { ItemPedido } from "../models/ItemPedido.js";
import { ProdutoFactory } from "../models/ProdutoFactory.js";
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
    
    const totalBruto = this.calcularTotal() || 0;

    
    const valorDesconto = DescontoService.aplicarDesconto(totalBruto) || 0;

    
    const taxa = totalBruto * 0.05;

    this.pedido.desconto = valorDesconto;
    return totalBruto - valorDesconto + taxa;

  }


  limpar() {
    this.pedido.limpar();
    this.notificar();
  }
}