class Pedido:
    def __init__(self):
        self.itens = []
        self.total = 0.0

    def adicionar_item(self, item):
        self.itens.append(item)

    def calcular_total(self, estrategia_desconto=None):
        valor_bruto = sum(item.subtotal() for item in self.itens)
        if estrategia_desconto:
            self.total = estrategia_desconto.aplicar(valor_bruto)
        else:
            self.total = valor_bruto
        return self.total