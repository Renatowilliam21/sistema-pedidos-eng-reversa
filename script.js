/**
 * PADRÃO FACTORY: Responsável pela criação de objetos de produtos.
 * Isola a lógica de atribuição de preços, facilitando a manutenção.
 */
class ProdutoFactory {
    static criarProduto(tipo) {
        const tabelaPrecos = {
            'pastel': 5.00,
            'caldo': 7.00,
            'refrigerante': 4.00,
            'suco': 6.00
        };

        const preco = tabelaPrecos[tipo] || 0;
        
        return {
            nome: tipo.charAt(0).toUpperCase() + tipo.slice(1),
            preco: preco
        };
    }
}

/**
 * PADRÃO SINGLETON: Gerencia o estado único do pedido/carrinho.
 * Centraliza o processamento de dados e cálculos de negócio.
 */
class CarrinhoManager {
    constructor() {
        if (CarrinhoManager.instance) {
            return CarrinhoManager.instance;
        }
        this.itens = [];
        this.total = 0;
        CarrinhoManager.instance = this;
    }

    adicionarItem(tipo, quantidade) {
        const produtoBase = ProdutoFactory.criarProduto(tipo);
        const subtotal = produtoBase.preco * quantidade;

        const novoItem = {
            ...produtoBase,
            quantidade: quantidade,
            subtotal: subtotal
        };

        this.itens.push(novoItem);
        this.calcularTotalGeral();
    }

    calcularTotalGeral() {
        this.total = this.itens.reduce((acumulador, item) => acumulador + item.subtotal, 0);
    }

    limpar() {
        this.itens = [];
        this.total = 0;
    }
}

// Instância única do controlador de dados
const carrinho = new CarrinhoManager();

/**
 * FUNÇÕES DE INTERFACE (UI)
 * Separam a manipulação do HTML da lógica de negócio.
 */

function adicionar() {
    const produtoSelect = document.getElementById("produto").value;
    const qtdInput = document.getElementById("qtd").value;
    const quantidade = parseInt(qtdInput);

    if (isNaN(quantidade) || quantidade <= 0) {
        alert("Por favor, insira uma quantidade válida.");
        return;
    }

    // Delega a criação e cálculo para o Manager
    carrinho.adicionarItem(produtoSelect, quantidade);
    
    atualizarInterface();
}

function atualizarInterface() {
    const listaUI = document.getElementById("lista");
    const totalUI = document.getElementById("total");
    
    listaUI.innerHTML = "";

    carrinho.itens.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.nome} | Qtd: ${item.quantidade} | R$ ${item.subtotal.toFixed(2)}`;
        listaUI.appendChild(li);
    });

    totalUI.innerText = carrinho.total.toFixed(2);
}

function finalizar() {
    if (carrinho.itens.length === 0) {
        alert("O carrinho está vazio!");
        return;
    }

    const total = carrinho.total;
    let desconto = 0;

    // Regras de negócio de desconto
    if (total > 100) {
        desconto = total * 0.20;
    } else if (total > 50) {
        desconto = total * 0.10;
    }

    const taxaEntrega = total * 0.05;
    const valorFinal = total - desconto + taxaEntrega;

    alert(`Resumo do Pedido:
    Subtotal: R$ ${total.toFixed(2)}
    Desconto: R$ ${desconto.toFixed(2)}
    Taxa (5%): R$ ${taxaEntrega.toFixed(2)}
    -------------------------
    TOTAL FINAL: R$ ${valorFinal.toFixed(2)}`);

    localStorage.setItem("ultimoPedido", valorFinal.toFixed(2));
    
    limparTudo();
}

function limparTudo() {
    carrinho.limpar();
    atualizarInterface();
    document.getElementById("qtd").value = "";
}