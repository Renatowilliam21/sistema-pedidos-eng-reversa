export class PedidoService {
  calcularTotal(itens) {
    return itens.reduce((soma, item) => soma + item.subtotal, 0);
  }

  calcularDesconto(total) {
    if (total > 100) return total * 0.2;
    if (total > 50) return total * 0.1;
    return 0;
  }

  calcularTaxa(total) {
    return total * 0.05;
  }

gerarLinkWhatsApp(nome, fone, itens, total) {
  let mensagem = `Olá, meu nome é ${nome}!\n\n`;
  mensagem += `*Resumo do meu Pedido:*\n`;
  
  itens.forEach(item => {
    mensagem += `- ${item.produto.nome} (x${item.qtd}): R$ ${item.subtotal}\n`;
  });
  
  mensagem += `\n*Total Final: R$ ${total.toFixed(2)}*`;
  
 
  const msgUrl = encodeURIComponent(mensagem);
  return `https://wa.me/55${fone}?text=${msgUrl}`;
}}