export class Itens{
  static criarItem(produto, qtd) {
    let preco = 0;

    if (produto == "pastel") preco = 5;
    if (produto == "caldo") preco = 7;
    if (produto == "refrigerante") preco = 4;
    if (produto == "suco") preco = 6;

    let subtotal = preco * qtd;

    return {
      produto: produto,
      qtd: qtd,
      subtotal: subtotal
    };
  }
}