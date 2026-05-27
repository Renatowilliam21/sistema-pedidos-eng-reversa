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
            // Repassa para o controller modular
            this.controller.adicionarItem(this.produtoSelect.value, parseInt(this.qtdInput.value, 10));
        });

        this.btnFinalizar.addEventListener('click', () => {
            // Criando um objeto fake que simula uma requisição HTTP com os headers/token para o Middleware testar
            const dadosRequisicaoFake = {
                headers: {
                    'authorization': 'token-fake-valido' // Se mudar isso, o Middleware barra!
                }
            };
            this.controller.finalizarPedido(dadosRequisicaoFake);
        });
    }

    render(pedido) {
        this.listaUl.innerHTML = "";
        if (!pedido.itens || pedido.itens.length === 0) {
            this.totalSpan.innerText = "0.00";
            return;
        }

        pedido.itens.forEach(item => {
            const li = document.createElement("li");
            li.innerHTML = `${item.produto.nome} | Qtd: ${item.quantidade} | Subtotal: R$ ${item.subtotal.toFixed(2)}`;
            this.listaUl.appendChild(li);
        });

        this.totalSpan.innerText = pedido.totalFinal.toFixed(2);
    }

    dispararWhatsApp(pedido) {
        const resumo = `*Novo Pedido Modular!*\nTotal Final: R$ ${pedido.totalFinal.toFixed(2)}`;
        const url = `https://wa.me/5588999074921?text=${encodeURIComponent(resumo)}`;
        window.open(url, '_blank');
    }

    mostrarSucesso(mensagem) {
        console.log(`[SUCESSO]: ${mensagem}`);
    }

    mostrarErro(mensagem) {
        alert(mensagem);
    }
}