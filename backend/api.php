<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once __DIR__ . '/controllers/PedidoController.php';

$controller = new PedidoController();
$metodo = $_SERVER['REQUEST_METHOD'];

if ($metodo === 'POST') {
    $json = file_get_contents('php://input');
    $dados = json_decode($json, true);
    
    $resposta = $controller->criar($dados);
    echo json_encode($resposta);
} elseif ($metodo === 'GET') {
    echo json_encode($controller->listar());
}
?>