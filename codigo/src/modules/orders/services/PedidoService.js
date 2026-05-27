import { Pedido } from '../entities/Pedido.js';
import { ItemPedido } from '../entities/ItemPedido.js';
import PedidoRepository from '../repositories/PedidoRepository.js';

// Estrutura simplificada de Descontos vinculada ao módulo de ordens
class DescontoAcimaDe100 { calcular(total) { return total > 100 ? total * 0.2 : 0; } }
class DescontoAcimaDe50 { calcular(total) { return (total > 50 && total <= 100) ? total * 0.1 : 0; } }

export class PedidoService {
    constructor() {
        this.observers = [];
        this.pedidoAtual = new Pedido();
        this.catalogo = {
            'pastel': { nome: 'Pastel', preco: 5.0 },
            'caldo': { nome: 'Caldo', preco: 7.0 },
            'refrigerante': { nome: 'Refrigerante', preco: 4.0 },
            'suco': { nome: 'Suco', preco: 6.0 }
        };
    }

    subscribe(fn) { this.observers.push(fn); }
    notify(data) { this.observers.forEach(observer => observer(data)); }

    adicionarItem(tipoProduto, quantidade) {
        const prodData = this.catalogo[tipoProduto];
        if (!prodData) throw new Error("Produto não cadastrado no catálogo.");
        
        const produto = { id: tipoProduto, ...prodData };
        const novoItem = new ItemPedido(produto, quantidade);
        
        this.pedidoAtual.itens.push(novoItem);
        this.calcularTotais();
        this.notify(this.pedidoAtual); 
    }

    calcularTotais() {
        this.pedidoAtual.totalBruto = this.pedidoAtual.itens.reduce((acc, item) => acc + item.subtotal, 0);
        
        let desc = 0;
        if (this.pedidoAtual.totalBruto > 100) desc = new DescontoAcimaDe100().calcular(this.pedidoAtual.totalBruto);
        else if (this.pedidoAtual.totalBruto > 50) desc = new DescontoAcimaDe50().calcular(this.pedidoAtual.totalBruto);

        this.pedidoAtual.desconto = desc;
        this.pedidoAtual.taxa = this.pedidoAtual.totalBruto * 0.05;
        this.pedidoAtual.totalFinal = this.pedidoAtual.totalBruto - desc + this.pedidoAtual.taxa;
    }

    async finalizarPedido() {
        if (this.pedidoAtual.itens.length === 0) throw new Error("Carrinho vazio.");
        const dadosSalvos = await PedidoRepository.salvar(this.pedidoAtual);
        
        this.pedidoAtual = new Pedido();
        this.notify(this.pedidoAtual);
        return dadosSalvos;
    }
}