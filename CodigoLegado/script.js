// Padrão Factory

class ProductFactory {
    static createProduct(type, quantity) {
        const menu = {
            'pastel': 5.0,
            'caldo': 7.0,
            'refrigerante': 4.0,
            'suco': 6.0
        };

        const qty = parseInt(quantity);
        if (!menu[type]) throw new Error("Produto não existe no menu.");
        if (isNaN(qty) || qty <= 0) throw new Error("Quantidade inválida.");

        return {
            name: type.charAt(0).toUpperCase() + type.slice(1),
            price: menu[type],
            quantity: qty,
            subtotal: menu[type] * qty
        };
    }
}



// Padrão Singleton

class OrderManager {
    constructor() {
        if (OrderManager.instance) return OrderManager.instance;
        this.items = [];
        this.totalBruto = 0;
        OrderManager.instance = this;
    }

    addItem(product) {
        this.items.push(product);
        this.updateTotals();
    }

    updateTotals() {
        this.totalBruto = this.items.reduce((acc, item) => acc + item.subtotal, 0);
    }

    calculateFinalState() {
        let desconto = 0;
        if (this.totalBruto > 100) desconto = this.totalBruto * 0.2;
        else if (this.totalBruto > 50) desconto = this.totalBruto * 0.1;

        const taxa = this.totalBruto * 0.05;
        const totalFinal = this.totalBruto - desconto + taxa;

        return {
            bruto: this.totalBruto,
            desconto: desconto,
            taxa: taxa,
            final: totalFinal
        };
    }

    clear() {
        this.items = [];
        this.totalBruto = 0;
    }
}

// Instância única do Singleton
const orderManager = new OrderManager();

//Funções da Interface

function adicionar() {
    const produtoSelect = document.getElementById("produto").value;
    const qtdInput = document.getElementById("qtd").value;

    try {
        const novoProduto = ProductFactory.createProduct(produtoSelect, qtdInput);
        orderManager.addItem(novoProduto);
        renderizarLista();
    } catch (error) {
        alert(error.message); // Resolve o erro de quantidade negativa/vazia
    }
}

function renderizarLista() {
    const listaUl = document.getElementById("lista");
    listaUl.innerHTML = "";

    orderManager.items.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${item.name} | Qtd: ${item.quantity} | Subtotal: R$ ${item.subtotal.toFixed(2)}`;
        listaUl.appendChild(li);
    });

    document.getElementById("total").innerText = orderManager.totalBruto.toFixed(2);
}

function finalizar() {
    if (orderManager.items.length === 0) {
        alert("O carrinho está vazio!");
        return;
    }

    const resumo = orderManager.calculateFinalState();
    
    const mensagem = `
        --- RESUMO DO PEDIDO ---
        Total Bruto: R$ ${resumo.bruto.toFixed(2)}
        Desconto: R$ ${resumo.desconto.toFixed(2)}
        Taxa (5%): R$ ${resumo.taxa.toFixed(2)}
        ------------------------
        TOTAL FINAL: R$ ${resumo.final.toFixed(2)}
    `;

    alert(mensagem);
    localStorage.setItem("ultimoPedido", resumo.final);
    
    orderManager.clear();
    renderizarLista();
}