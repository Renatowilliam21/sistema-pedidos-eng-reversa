import { ProdutoFactory } from "../factories/produtoFactory.js";
import { ItemPedido } from "../models/itemPedido.js";
import { PedidoService } from "../services/pedidoService.js";
import { PedidoRepository } from "../repositories/pedidoRepository.js";

export class PedidoController {
  constructor(view) {
    this.view = view;
    this.service = new PedidoService();
    this.repository = new PedidoRepository(); // Singleton
    this.itens = [];
  }

  adicionarItem(tipo, qtd) {
    if (qtd <= 0 || !qtd) return this.view.mostrarMensagem("Quantidade inválida");

    const produto = ProdutoFactory.criar(tipo);
    const item = new ItemPedido(produto, qtd);
    
    this.itens.push(item);
    
    const total = this.service.calcularTotal(this.itens);
    this.view.atualizarLista(this.itens, total);
    this.view.limparFormulario();
  }

  removerItem(index) {
  
    this.itens.splice(index, 1);
    

    const total = this.service.calcularTotal(this.itens);
    

    this.view.atualizarLista(this.itens, total);
  }

  finalizar() {
    if (this.itens.length === 0) return this.view.mostrarMensagem("Sua lista está vazia!");

    const total = this.service.calcularTotal(this.itens);
   
    this.view.exibirCheckout(total);
}

async enviarWhatsApp() {
    const { nome, fone } = this.view.obterDadosCheckout();
    
    if (!nome || !fone) {
        return this.view.mostrarMensagem("Preencha nome e telefone, por favor!");
    }

    const total = this.service.calcularTotal(this.itens);
    const desconto = this.service.calcularDesconto(total);
    const taxa = this.service.calcularTaxa(total);
    const totalFinal = total - desconto + taxa;


    const link = this.service.gerarLinkWhatsApp(nome, fone, this.itens, totalFinal);

 
    const dadosPedido = {
        cliente: nome,
        whatsapp: fone,
        itens: this.itens,
        totalPago: totalFinal,
        data: new Date().toISOString()
    };

    await this.repository.salvar(dadosPedido);
        window.open(link, "_blank");


    this.itens = [];
    this.view.atualizarLista(this.itens, 0);
    this.view.voltarParaPedido(); 
    this.view.mostrarMensagem("Pedido finalizado com sucesso!");
}
}