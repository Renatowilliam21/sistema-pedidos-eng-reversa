<?php

class Pedido {
    private $id;
    private $itens = [];
    private $total = 0;

    public function __construct($id) {
        $this->id = $id;
    }

    public function getId() {
        return $this->id;
    }

    public function adicionarItem($item) {
        $this->itens[] = $item;
        $this->calcularTotal();
    }

    public function calcularTotal() {
        $this->total = 0;

        foreach ($this->itens as $item) {
            $this->total += $item->getSubtotal();
        }
    }

    public function getTotal() {
        return $this->total;
    }

    public function getItens() {
        return $this->itens;
    }
}
