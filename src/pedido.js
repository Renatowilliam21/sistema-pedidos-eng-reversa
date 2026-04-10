import { Itens } from "./itens.js";

export class Pedido {
  constructor() {
    if (Pedido.instancia) {
      return Pedido.instancia;
    }

    this.itens = [];
    this.total = 0;

    Pedido.instancia = this;
  }

  adicionar() {
    let produto = document.getElementById("produto").value;
    let qtd = document.getElementById("qtd").value;

    if (qtd == "" || qtd <= 0) {
      alert("Quantidade inválida");
    }

    let item = Itens.criarItem(produto, qtd);

    this.itens.push(item);

    this.atualizarLista();
  }

  atualizarLista() {
    let lista = document.getElementById("lista");
    lista.innerHTML = "";

    this.total = 0;

    for (let i = 0; i < this.itens.length; i++) {
      let item = this.itens[i];

      let li = document.createElement("li");
      li.innerHTML = item.produto + " | Qtd: " + item.qtd + " | R$ " + item.subtotal;

      lista.appendChild(li);

      this.total = this.total + item.subtotal;
    }

    document.getElementById("total").innerText = this.total;

    this.salvarTotal();
  }

  salvarTotal() {
    localStorage.setItem("total", this.total);
  }

  finalizar() {
    let desconto = 0;

    if (this.total > 100) {
      desconto = this.total * 0.2;
    } else if (this.total > 50) {
      desconto = this.total * 0.1;
    }

    let taxa = this.total * 0.05;

    let totalFinal = this.total - desconto + taxa;

    alert("Total final: " + totalFinal);

    localStorage.setItem("ultimoPedido", totalFinal);

    this.limparTudo();
  }

  limparTudo() {
    this.itens = [];
    this.total = 0;

    document.getElementById("lista").innerHTML = "";
    document.getElementById("total").innerText = 0;
  }

  removerUltimo() {
    this.itens.pop();
    this.atualizarLista();
  }

  calcularTotal() {
    let soma = 0;

    for (let i = 0; i < this.itens.length; i++) {
      soma += this.itens[i].subtotal;
    }

    return soma;
  }
}