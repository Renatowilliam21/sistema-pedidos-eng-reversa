<?php

require_once __DIR__ . '/../models/Produto.php';

class ProdutoFactory {

    public static function criar($tipo) {

        switch ($tipo) {
            case "pizza":
                return new Produto("Pizza", 35);

            case "lanche":
                return new Produto("Lanche", 20);

            case "bebida":
                return new Produto("Bebida", 8);

            default:
                return new Produto("Desconhecido", 0);
        }
    }
}
