import { Item } from "../models/Item.js";
import { Pedido } from "../models/Pedido.js";

export class PedidoController {
  constructor(view, service, repository) {
    this.view = view;
    this.service = service;
    this.repository = repository;
    this.pedido = new Pedido(); 
  }


  adicionarItem() {
    const { produto, qtd } = this.view.getDadosInput();

    if (!qtd || qtd <= 0) {
      this.view.mostrarMensagem("Quantidade inválida!");
      return;
    }


    const novoItem = new Item(produto, qtd);
    this.pedido.adicionarItem(novoItem);


    this.view.renderizar(this.pedido);
    this.view.limparInputs();
  }

 
  removerUltimo() {
    this.pedido.removerUltimoItem();
    this.view.renderizar(this.pedido);
  }

 
  async finalizarPedido() {
    if (this.pedido.itens.length === 0) {
      this.view.mostrarMensagem("O pedido está vazio!");
      return;
    }

    const total = this.pedido.total;
    const desconto = this.service.calcularDesconto(total);
    const taxa = this.service.calcularTaxa(total);
    const totalFinal = total - desconto + taxa;


    const pedidoDados = {
      itens: this.pedido.itens,
      subtotal: total,
      desconto: desconto,
      taxa: taxa,
      totalFinal: totalFinal,
      data: new Date().toISOString()
    };


    this.view.mostrarMensagem("Salvando pedido no servidor...");
    await this.repository.salvarPedido(pedidoDados);

    const foneCliente = "5588999999999"; 
    const foneLoja = "5588888888888";

    const linkCliente = this.service.gerarLinkWhatsapp(this.pedido, foneCliente, false);
    const linkLoja = this.service.gerarLinkWhatsapp(this.pedido, foneLoja, true);

    this.view.mostrarMensagem(`Pedido Finalizado! Total: R$ ${totalFinal.toFixed(2)}\n\nAbrindo WhatsApp do Cliente...`);
    window.open(linkCliente, "_blank");
    
    setTimeout(() => {
      window.open(linkLoja, "_blank");
    }, 1000);

  
    this.pedido.limpar();
    this.view.renderizar(this.pedido);
  }
}