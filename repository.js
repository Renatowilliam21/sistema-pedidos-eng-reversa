const Repository = {
  salvarUltimoPedido(totalFinal) {
    localStorage.setItem('ultimoPedido', totalFinal);
  },

  salvarTotal(total) {
    localStorage.setItem('total', total);
  },

  carregarUltimoPedido() {
    return localStorage.getItem('ultimoPedido');
  },

  limpar() {
    localStorage.removeItem('total');
    localStorage.removeItem('ultimoPedido');
  }
};
