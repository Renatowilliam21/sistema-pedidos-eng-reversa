<?php

class ItemPedido implements JsonSerializable {
    private $produto;
    private $quantidade;
    private $preco;

    public function __construct($produto, $quantidade, $preco) {
        $this->produto = $produto;
        $this->quantidade = $quantidade;
        $this->preco = $preco;
    }

    public function getProduto() {
        return $this->produto;
    }

    public function getQuantidade() {
        return $this->quantidade;
    }

    public function getPreco() {
        return $this->preco;
    }

    public function getSubtotal() {
        return $this->quantidade * $this->preco;
    }

    public function jsonSerialize(): mixed {
        return [
            "produto" => $this->produto,
            "quantidade" => $this->quantidade,
            "preco" => $this->preco
        ];
    }
}
