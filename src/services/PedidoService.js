import { Pedido } from '../models/Pedido.js';
import { ItemPedido } from '../models/ItemPedido.js';
import { ProdutoFactory } from './ProdutoFactory.js';
import { CalculadorDeDesconto } from './DescontoStrategy.js';
import { Observable } from './Observable.js';

export class PedidoService extends Observable {
    constructor() {
        super();
        this.pedidoAtual = new Pedido();
    }

    adicionarItem(tipoProduto, quantidade) {
        if (!quantidade || quantidade <= 0) {
            throw new Error("Quantidade inválida");
        }

        const produto = ProdutoFactory.criarProduto(tipoProduto);
        const item = new ItemPedido(produto, quantidade);

        this.pedidoAtual.adicionarItem(item);

        // Avisa a interface que a lista mudou
        this.notificar(this.pedidoAtual);
    }

    finalizarPedido() {
        const total = this.pedidoAtual.total;
        const strategy = CalculadorDeDesconto.obterStrategy(total);
        const desconto = strategy.calcular(total);
        const taxa = total * 0.05;
        const totalFinal = total - desconto + taxa;

        return {
            totalOriginal: total,
            desconto: desconto,
            taxa: taxa,
            totalFinal: totalFinal,
            itens: this.pedidoAtual.itens
        };
    }

    limparPedido() {
        this.pedidoAtual = new Pedido();
        this.notificar(this.pedidoAtual);
    }
}
