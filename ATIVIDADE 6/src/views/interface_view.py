from patterns.observer_base import ViewObserver

class InterfaceView(ViewObserver):
    def update(self, pedido):
        print("\n--- INTERFACE ATUALIZADA ---")
        print(f"Itens no carrinho: {len(pedido.itens)}")
        print(f"Total parcial: R$ {sum(i.subtotal() for i in pedido.itens)}")