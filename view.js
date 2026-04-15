const View = {
  renderizarLista(itens) {
    const lista = document.getElementById('lista');
    lista.innerHTML = '';
    itens.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item.toString();
      lista.appendChild(li);
    });
  },
  atualizarTotal(valor) {
    document.getElementById('total').innerText = valor.toFixed(2);
  },
  obterProdutoSelecionado() {
    return document.getElementById('produto').value;
  },
  obterQuantidade() {
    return parseInt(document.getElementById('qtd').value);
  },
  exibirMensagem(msg) { alert(msg); },
  limpar() {
    document.getElementById('lista').innerHTML = '';
    document.getElementById('total').innerText = '0';
  }
};
