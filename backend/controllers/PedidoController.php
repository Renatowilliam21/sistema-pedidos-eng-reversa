<?php
require_once __DIR__ . '/../services/PedidoSingleton.php';
require_once __DIR__ . '/../services/ProdutoFactory.php';
require_once __DIR__ . '/../services/Subject.php';
require_once __DIR__ . '/../services/LoggerObserver.php';
require_once __DIR__ . '/../models/Pedido.php';
require_once __DIR__ . '/../models/ItemPedido.php';
require_once __DIR__ . '/../models/Produto.php';
require_once __DIR__ . '/../repositories/PedidoRepository.php';
require_once __DIR__ . '/../services/SemDesconto.php';
class PedidoController {

    private $pedido;
    private $repo;
    private $desconto;

    public function __construct() {
        $this->pedido = PedidoSingleton::getInstance();
        $this->repo = new PedidoRepository();
        $this->desconto = new SemDesconto();
    }

    public function listar() {
        header('Content-Type: application/json');

        echo json_encode([
            "itens" => $this->pedido->getItens(),
            "total" => $this->pedido->getTotal()
        ]);
    }

    public function adicionar($tipoProduto, $quantidade) {

        $produto = ProdutoFactory::criar($tipoProduto);

        $item = new ItemPedido(
            $produto->getNome(),
            $quantidade,
            $produto->getPreco()
        );

        $this->pedido->adicionarItem($item);
        $_SESSION['pedido'] = serialize($this->pedido);

        echo json_encode(["mensagem" => "Item adicionado"]);
    }

    public function finalizar() {
        $total = $this->pedido->getTotal();
        $totalFinal = $this->desconto->calcular($total);
        if (class_exists('Subject') && class_exists('LoggerObserver')) {
            $subject = new Subject();
            $subject->addObserver(new LoggerObserver());
            $subject->notify($this->pedido);
        }
        $this->repo->salvar($this->pedido);
        PedidoSingleton::limpar();

        echo json_encode([
            "total" => $total,
            "totalFinal" => $totalFinal
        ]);
    }
}
