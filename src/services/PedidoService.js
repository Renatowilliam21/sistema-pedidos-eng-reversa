export class PedidoService {

  calcularDesconto(total) {
    if (total > 100) return total * 0.2; 
    if (total > 50) return total * 0.1;  
    return 0;
  }

 
  calcularTaxa(total) {
    return total * 0.05;
  }

 
  gerarLinkWhatsapp(pedido, telefone, ehParaEstabelecimento = false) {
    const desconto = this.calcularDesconto(pedido.total);
    const taxa = this.calcularTaxa(pedido.total);
    const totalFinal = pedido.total - desconto + taxa;

    let texto = `*🧾 RESUMO DO PEDIDO*\n\n`;
    pedido.itens.forEach(item => {
      texto += `• ${item.produto} x${item.qtd} - R$ ${item.subtotal}\n`;
    });

    texto += `\n*Subtotal:* R$ ${pedido.total.toFixed(2)}`;
    texto += `\n*Desconto:* R$ ${desconto.toFixed(2)}`;
    texto += `\n*Taxa (5%):* R$ ${taxa.toFixed(2)}`;
    texto += `\n*Total Final:* R$ ${totalFinal.toFixed(2)}`;

    if (ehParaEstabelecimento) {
      texto = `*Novo Pedido Recebido!*\n\n${texto}`;
    } else {
      texto = `*Olá! Seu pedido foi confirmado:*\n\n${texto}\n\nObrigado pela preferência!`;
    }

  
    return `https://wa.me/${telefone}?text=${encodeURIComponent(texto)}`;
  }
}