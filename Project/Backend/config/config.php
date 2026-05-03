<?php
declare(strict_types=1);

// 1. Autoload de classes
spl_autoload_register(function ($class) {
    $path = __DIR__ . '/../' . str_replace('\\', '/', $class) . '.php';
    if (file_exists($path)) {
        require_once $path;
    }
});

// 2. Carregamento explícito das dependências
require_once __DIR__ . '/../models/Produto.php';
require_once __DIR__ . '/../models/ItemPedido.php';
require_once __DIR__ . '/../models/Pedido.php';
require_once __DIR__ . '/../repositories/PedidoRepository.php';
require_once __DIR__ . '/../services/PedidoService.php';
require_once __DIR__ . '/../controllers/PedidoController.php';

// 3. Headers CORS e Content-Type
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// 4. Tratamento de preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// 5. Roteamento
$uri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?? '/';
$path = '/' . ltrim(trim($uri, '/'), '/');

// Injeção de dependências
$repository = new PedidoRepository();
$service = new PedidoService($repository);
$controller = new PedidoController($service);

// 6. Rotas
if ($path === '/' || $path === '/config/' || $path === '/config/config.php') {
    echo json_encode(['message' => 'Backend ativo', 'version' => '1.0.0']);
    exit;
}

if ($path === '/pedidos') {
    match ($_SERVER['REQUEST_METHOD'] ?? 'GET') {
        'GET' => $controller->listar(),
        'POST' => $controller->criar(),
        'DELETE' => $controller->remover(),
        default => $controller->responder(['error' => 'Método não permitido'], 405),
    };
    exit;
}

$controller->responder(['error' => 'Rota não encontrada'], 404);