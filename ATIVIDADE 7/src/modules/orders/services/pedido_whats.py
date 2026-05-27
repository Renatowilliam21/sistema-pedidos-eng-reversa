import urllib.parse

class WhatsAppService:
    def __init__(self, telefone_estabelecimento: str):
        self.telefone_padrao = telefone_estabelecimento

    def gerar_link_pedido(self, pedido):
        mensagem = "*--- NOVO PEDIDO ---*\n\n"
        
        for item in pedido.itens:
            mensagem += f"• {item.produto.nome} (x{item.quantidade}) - R$ {item.subtotal():.2f}\n"
        
        mensagem += f"\n*Total: R$ {pedido.total:.2f}*"
        
        # Codifica caracteres especiais para URL
        texto_url = urllib.parse.quote(mensagem)
        
        return f"https://wa.me/{self.telefone_padrao}?text={texto_url}"