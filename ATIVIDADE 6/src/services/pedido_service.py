from patterns.observer_base import Subject
from patterns.pedido_factory import PedidoFactory

class PedidoService(Subject):
    def __init__(self):
        super().__init__()
        self.pedido_atual = PedidoFactory.criar_pedido()

    def adicionar_produto(self, produto, qtd):
        from models.pedido_item import ItemPedido 
        
        item = ItemPedido(produto, qtd)
        self.pedido_atual.adicionar_item(item)
        self.notificar(self.pedido_atual) 

    def obter_pedido(self):
        return self.pedido_atual