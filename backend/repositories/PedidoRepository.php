<?php

class PedidoRepository {

    private $file = __DIR__ . '/../../data/pedidos.json';

    public function salvar($pedido) {
        $pedidos = $this->listar();

        $pedidos[] = [
            "total" => $pedido->getTotal(),
            "itens" => $pedido->getItens()
        ];

        file_put_contents($this->file, json_encode($pedidos));
    }

    public function listar() {
        if (!file_exists($this->file)) {
            return [];
        }

        $json = file_get_contents($this->file);
        return json_decode($json, true) ?? [];
    }
}
