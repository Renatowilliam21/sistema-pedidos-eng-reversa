export class WhatsappService {

    // Agora recebe os dois números dinamicamente
    enviarPedido(resultadoPedido, telefoneCliente, telefoneEstabelecimento) {
        let mensagem = `*Novo Pedido - Pastelaria do Zé*\n\n`;

        resultadoPedido.itens.forEach(item => {
            mensagem += `- ${item.quantidade}x ${item.produto.nome} (R$ ${item.subtotal.toFixed(2)})\n`;
        });

        mensagem += `\n*TOTAL FINAL:* R$ ${resultadoPedido.totalFinal.toFixed(2)}`;

        const textoCodificado = encodeURIComponent(mensagem);

        // 1. Envia para o Estabelecimento (obrigatório)
        if (telefoneEstabelecimento && telefoneEstabelecimento.length >= 10) {
            const urlEstabelecimento = `https://web.whatsapp.com/send?phone=${telefoneEstabelecimento}&text=${textoCodificado}`;
            window.open(urlEstabelecimento, "_blank");
        }

        // 2. Envia para o Cliente (se ele tiver preenchido)
        if (telefoneCliente && telefoneCliente.length >= 10) {
            const urlCliente = `https://web.whatsapp.com/send?phone=${telefoneCliente}&text=${encodeURIComponent("*Resumo do seu pedido:*\n" + mensagem)}`;

            // Espera 1 segundo para abrir a segunda aba, evitando que o navegador bloqueie
            setTimeout(() => window.open(urlCliente, "_blank"), 1000);
        }
    }
}
