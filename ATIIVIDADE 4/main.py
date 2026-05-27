from services.pedido_service import PedidoService
from services.pedido_whats import WhatsAppService
from services.desconto import DescontoNatal
from models.produto import Produto
from views.interface_view import InterfaceView

service = PedidoService()

view = InterfaceView()
service.anexar(view)

p1 = Produto(1, "Hambúrguer", 30.0)
service.adicionar_produto(p1, 2)

pedido = service.obter_pedido()
pedido.calcular_total(DescontoNatal())

whats = WhatsAppService(telefone_estabelecimento="5588982192242")
print(f"\nLink WhatsApp: {whats.gerar_link_pedido(pedido)}")