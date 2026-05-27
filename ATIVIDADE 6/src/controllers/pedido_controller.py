from services.pedido_service import PedidoService
from services.pedido_whats import WhatsAppService
from repositories.database import DatabaseRepository

class PedidoController:
    def __init__(self, view):
        self.service = PedidoService()
        self.repository = DatabaseRepository()
        self.whats_service = WhatsAppService(telefone_estabelecimento="5588982192242")
        self.view = view
        self.service.anexar(self.view)

    def adicionar_produto(self, produto, quantidade):
        self.service.adicionar_produto(produto, quantidade)

    def finalizar_pedido(self, estrategia_desconto=None):
        pedido = self.service.obter_pedido()
        if estrategia_desconto:
            pedido.calcular_total(estrategia_desconto)
        else:
            pedido.calcular_total()
            
        self.repository.salvar(pedido)
        link = self.whats_service.gerar_link_pedido(pedido)
        print(f"\nLink WhatsApp: {link}")