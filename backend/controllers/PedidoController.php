<?php
require_once __DIR__ . '/../models/Pedido.php';
require_once __DIR__ . '/../models/ItemPedido.php';
require_once __DIR__ . '/../models/Produto.php';
require_once __DIR__ . '/../repositories/PedidoRepository.php';

class PedidoController {
    private $repository;

    public function __construct() {
        $this->repository = PedidoRepository::getInstancia();
    }

    public function criar($dados) {
        $novoPedido = new Pedido();
        
        foreach ($dados['itens'] as $item) {
            $produto = new Produto($item['produto'], (float)$item['preco']);
            $itemPedido = new ItemPedido($produto, (int)$item['qtd']);
            $novoPedido->adicionarItem($itemPedido);
        }

        $this->repository->salvar([
            'id' => $novoPedido->id,
            'itens' => $dados['itens'],
            'total' => $novoPedido->total,
            'data' => date('Y-m-d H:i:s')
        ]);

        return ["status" => "sucesso", "pedido_id" => $novoPedido->id];
    }

    public function listar() {
        return $this->repository->listarTodos();
    }
}
?>