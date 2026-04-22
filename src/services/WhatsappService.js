class WhatsAppService {
  static enviarResumo(pedido, numeroDestino) {
    let mensagem = `*Novo Pedido - Pastelaria do Zé* 🍴\n\n`;
    
    pedido.itens.forEach(item => {
      mensagem += `🔸 ${item.qtd}x ${item.produto} (Subtotal: R$ ${item.subtotal.toFixed(2)})\n`;
    });
    mensagem += `\n*💰 Total a pagar:* R$ ${pedido.totalPago.toFixed(2)}`;

    let textoCodificado = encodeURIComponent(mensagem);
    let ehCelular = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    let linkWhatsApp = ehCelular
      ? `https://wa.me/${numeroDestino}?text=${textoCodificado}` 
      : `https://web.whatsapp.com/send?phone=${numeroDestino}&text=${textoCodificado}`;

    // Abre a aba do WhatsApp
    window.open(linkWhatsApp, '_blank');
  }
}