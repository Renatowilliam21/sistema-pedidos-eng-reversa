<?php

require_once __DIR__ . '/../models/Pedido.php';
require_once __DIR__ . '/../models/ItemPedido.php';

$pedido = new Pedido(1);

$item1 = new ItemPedido("Pizza", 2, 35);
$item2 = new ItemPedido("Bebida", 1, 8);

$pedido->adicionarItem($item1);
$pedido->adicionarItem($item2);

$total = $pedido->getTotal();

if ($total == 78) {
    echo "TESTE TOTAL OK";
} else {
    echo "FALHA TOTAL - Valor: " . $total;
}
