export class PedidoView {
    constructor() {
        // Elementos de saída
        this.listaEl = document.getElementById("lista");
        this.totalEl = document.getElementById("total");

        // Elementos de entrada (Mapeando o DOM aqui!)
        this.produtoEl = document.getElementById("produto");
        this.qtdEl = document.getElementById("qtd");
        this.telUsuarioEl = document.getElementById("telUsuario");
        this.telEstabelecimentoEl = document.getElementById("telEstabelecimento");

        // Botões
        this.btnAdicionar = document.getElementById("btnAdicionar");
        this.btnFinalizar = document.getElementById("btnFinalizar");
    }

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

    limparCampos() {
        this.qtdEl.value = "";
    }

    limparTelefones() {
        this.telUsuarioEl.value = "";
        this.telEstabelecimentoEl.value = "";
    }

    // Métodos para o Controller pegar os dados (Sem sujar o Controller com HTML)
    getDadosItem() {
        return { produto: this.produtoEl.value, quantidade: this.qtdEl.value };
    }

    getTelefones() {
        return {
            cliente: this.telUsuarioEl.value.replace(/\D/g, ''),
            estabelecimento: this.telEstabelecimentoEl.value.replace(/\D/g, '')
        };
    }

    // Binds para os botões delegarem a ação ao Controller
    bindAdicionarItem(handler) {
        this.btnAdicionar.addEventListener("click", handler);
    }

    bindFinalizarPedido(handler) {
        this.btnFinalizar.addEventListener("click", handler);
    }
}