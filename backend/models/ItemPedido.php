<?php
require_once 'Produto.php';

class ItemPedido {
    public Produto $produto;
    public int $quantidade;

    public function __construct(Produto $produto, int $quantidade) {
        $this->produto = $produto;
        $this->quantidade = $quantidade;
    }

    public function getSubtotal(): float {
        return $this->produto->preco * $this->quantidade;
    }
}
?>