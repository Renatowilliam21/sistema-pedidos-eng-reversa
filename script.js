class ProdutoFactory {
    static criarProduto(nome) {
        let preco = 0;
        switch (nome) {
            case "pastel": preco = 5; break;
            case "caldo": preco = 7; break;
            case "refrigerante": preco = 4; break;
            case "suco": preco = 6; break;
            default: throw new Error("Produto não cadastrado");
        }
        return { nome, preco };
    }
}

class ItemPedido {
    constructor(produto, quantidade) {
        this.produto = produto.nome;
        this.quantidade = parseInt(quantidade);
        this.subtotal = produto.preco * this.quantidade;
    }
}

class GerenciadorPedidos {
    static instance;
    constructor() {
        if (GerenciadorPedidos.instance) return GerenciadorPedidos.instance;
        this.itens = [];
        this.totalGeral = 0;
        GerenciadorPedidos.instance = this;
    }
    adicionarItem(produtoNome, quantidade) {
        const produto = ProdutoFactory.criarProduto(produtoNome);
        const novoItem = new ItemPedido(produto, quantidade);
        this.itens.push(novoItem);
        this.calcularTotalGeral();
    }
    calcularTotalGeral() {
        this.totalGeral = this.itens.reduce((acc, item) => acc + item.subtotal, 0);
    }
    calcularFinal(total) {
        let desconto = 0;
        if (total > 100) desconto = total * 0.2;
        else if (total > 50) desconto = total * 0.1;
        const taxa = total * 0.05;
        return total - desconto + taxa;
    }
    limpar() {
        this.itens = [];
        this.totalGeral = 0;
    }
}

const gerenciador = new GerenciadorPedidos();

function adicionar() {
    const produtoNome = document.getElementById("produto").value;
    const qtd = document.getElementById("qtd").value;
    if (!qtd || qtd <= 0) { alert("Quantidade inválida"); return; }
    gerenciador.adicionarItem(produtoNome, qtd);
    atualizarUI();
}

function atualizarUI() {
    const listaUI = document.getElementById("lista");
    const totalUI = document.getElementById("total");
    listaUI.innerHTML = "";
    gerenciador.itens.forEach(item => {
        const li = document.createElement("li");
        li.innerText = `${item.produto} | Qtd: ${item.quantidade} | R$ ${item.subtotal.toFixed(2)}`;
        listaUI.appendChild(li);
    });
    totalUI.innerText = gerenciador.totalGeral.toFixed(2);
}

function finalizar() {
    const totalFinal = gerenciador.calcularFinal(gerenciador.totalGeral);
    alert(`Total final: R$ ${totalFinal.toFixed(2)}`);
    localStorage.setItem("ultimoPedido", totalFinal);
    gerenciador.limpar();
    atualizarUI();
}