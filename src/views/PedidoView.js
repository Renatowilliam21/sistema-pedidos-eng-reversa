export class PedidoView {
    constructor() {
        this.listaEl = document.getElementById("lista");
        this.totalEl = document.getElementById("total");
    }

    // Esta função será chamada automaticamente pelo Observer!
    atualizar(pedido) {
        this.listaEl.innerHTML = "";

        pedido.itens.forEach(item => {
            let li = document.createElement("li");
            li.textContent = `${item.produto.nome} | Qtd: ${item.quantidade} | R$ ${item.subtotal.toFixed(2)}`;
            this.listaEl.appendChild(li);
        });

        this.totalEl.textContent = pedido.total.toFixed(2);
    }

    exibirMensagem(mensagem) {
        alert(mensagem);
    }
}
