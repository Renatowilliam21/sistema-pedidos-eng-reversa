<?php
require_once 'ItemPedido.php';

class Pedido {
    public string $id;
    public array $itens = [];
    public float $total = 0;

    public function __construct() {
        $this->id = uniqid(); 
    }

    public function adicionarItem(ItemPedido $item) {
        $this->itens[] = $item;
        $this->total += $item->getSubtotal();
    }
}
?>  