<?php

require_once __DIR__ . '/../models/Pedido.php';

class PedidoSingleton {

    private static $instance = null;
    private $pedido;

    private function __construct() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        if (isset($_SESSION['pedido'])) {
            $this->pedido = unserialize($_SESSION['pedido']);
        } else {
            $this->pedido = new Pedido(1);
        }
    }

    public static function getInstance() {
        if (self::$instance == null) {
            self::$instance = new PedidoSingleton();
        }

        return self::$instance->pedido;
    }

    public function getPedido() {
        return $this->pedido;
    }

    public function adicionar($item) {
        $this->pedido->adicionarItem($item);
        $_SESSION['pedido'] = serialize($this->pedido);
    }

    public static function limpar() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        unset($_SESSION['pedido']);
        self::$instance = null;
    }
}
