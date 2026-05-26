import { Pedido } from '../models/Pedido.js';
import { ItemPedido } from '../models/ItemPedido.js';
import { Observable } from '../patterns/Observer.js';
import { DescontoAcimaDe100, DescontoAcimaDe50 } from '../patterns/StrategyDesconto.js';
import PedidoRepository from '../repositories/PedidoRepository.js';

export class PedidoService extends Observable {
    constructor() {
        super();
        this.pedidoAtual = new Pedido();
        // Definindo catálogo simulado
        this.catalogo = {
            'pastel': { nome: 'Pastel', preco: 5.0 },
            'caldo': { nome: 'Caldo', preco: 7.0 },
            'refrigerante': { nome: 'Refrigerante', preco: 4.0 },
            'suco': { nome: 'Suco', preco: 6.0 }
        };
    }

    adicionarItem(tipoProduto, quantidade) {
        const prodData = this.catalogo[tipoProduto];
        if (!prodData) throw new Error("Produto não existe.");
        if (isNaN(quantidade) || quantidade <= 0) throw new Error("Quantidade inválida.");

        // Factory simplificada na criação do Item
        const produto = { id: tipoProduto, ...prodData };
        const novoItem = new ItemPedido(produto, quantidade);
        
        this.pedidoAtual.itens.push(novoItem);
        this.calcularTotais();
        
        // Notifica a View que o pedido mudou (Observer)
        this.notify(this.pedidoAtual); 
    }

    calcularTotais() {
        this.pedidoAtual.totalBruto = this.pedidoAtual.itens.reduce((acc, item) => acc + item.subtotal, 0);
        
        // Aplicando Strategy de desconto
        let desconto = 0;
        if (this.pedidoAtual.totalBruto > 100) {
            desconto = new DescontoAcimaDe100().calcular(this.pedidoAtual.totalBruto);
        } else if (this.pedidoAtual.totalBruto > 50) {
            desconto = new DescontoAcimaDe50().calcular(this.pedidoAtual.totalBruto);
        }

        this.pedidoAtual.desconto = desconto;
        this.pedidoAtual.taxa = this.pedidoAtual.totalBruto * 0.05;
        this.pedidoAtual.totalFinal = this.pedidoAtual.totalBruto - desconto + this.pedidoAtual.taxa;
    }

    async finalizarPedido() {
        if (this.pedidoAtual.itens.length === 0) throw new Error("O carrinho está vazio!");
        
        // Salva no JSON Server via Repository
        await PedidoRepository.salvar(this.pedidoAtual);
        
        // Parte 3: Integração com WhatsApp
        this.enviarWhatsApp();

        // Limpa pedido
        this.pedidoAtual = new Pedido();
        this.notify(this.pedidoAtual);
    }

    enviarWhatsApp() {
        const resumo = `*Novo Pedido!*\nTotal: R$ ${this.pedidoAtual.totalFinal.toFixed(2)}`;
        const url = `https://wa.me/5588999074921?text=${encodeURIComponent(resumo)}`;
        window.open(url, '_blank');
    }
}