from views.interface_view import InterfaceView
from controllers.pedido_controller import PedidoController
from models.produto import Produto
from services.desconto import DescontoNatal

view = InterfaceView()
controller = PedidoController(view)
p1 = Produto(1, "Hambúrguer", 30.0)
controller.adicionar_produto(p1, 2)
p2 = Produto(2, "Refrigerante", 10.0)
controller.adicionar_produto(p2, 1)
controller.finalizar_pedido(DescontoNatal())