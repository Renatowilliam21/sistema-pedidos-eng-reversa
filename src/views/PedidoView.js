export class PedidoView {
    constructor(controller) {
        this.controller = controller;
        this.produtoSelect = document.getElementById("produto");
        this.qtdInput = document.getElementById("qtd");
        this.btnAdicionar = document.getElementById("btn-adicionar");
        this.btnFinalizar = document.getElementById("btn-finalizar");
        this.listaUl = document.getElementById("lista");
        this.totalSpan = document.getElementById("total");

        this.bindEvents();
    }

    bindEvents() {
        this.btnAdicionar.addEventListener('click', () => {
            this.controller.adicionarItem(this.produtoSelect.value, parseInt(this.qtdInput.value));
        });

        this.btnFinalizar.addEventListener('click', () => {
            this.controller.finalizarPedido();
        });
    }

    // Método chamado pelo Observer quando o estado muda
    render(pedido) {
        this.listaUl.innerHTML = "";
        pedido.itens.forEach(item => {
            const li = document.createElement("li");
            li.innerHTML = `${item.produto.nome} | Qtd: ${item.quantidade} | Subtotal: R$ ${item.subtotal.toFixed(2)}`;
            this.listaUl.appendChild(li);
        });

        this.totalSpan.innerText = pedido.totalFinal.toFixed(2);
    }

    mostrarErro(mensagem) {
        alert(mensagem);
    }
}