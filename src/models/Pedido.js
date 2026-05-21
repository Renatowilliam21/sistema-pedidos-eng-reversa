class Pedido {
  constructor(itens, totalPago) {
    this.data = new Date().toLocaleString();
    this.itens = itens;
    this.totalPago = totalPago;
    this.status = "Pendente";
  }
}