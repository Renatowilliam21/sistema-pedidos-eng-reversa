from models.pedido import Pedido

class PedidoFactory:
    @staticmethod
    def criar_pedido():
        return Pedido()