<?php

require_once 'controllers/PedidoController.php';

$controller = new PedidoController();

$action = $_GET['action'] ?? '';

if ($action == "listar") {
    $controller->listar();
}

if ($action == "adicionar") {

    $tipoProduto = $_POST['produto'];
$quantidade = $_POST['quantidade'];

$controller->adicionar($tipoProduto, $quantidade);
}

if ($action == "finalizar") {
    $controller->finalizar();
}
