<?php
class PedidoRepository {
    private static ?PedidoRepository $instancia = null;
    private string $arquivoJson = __DIR__ . '/../dados.json';

    private function __construct() {
        if (!file_exists($this->arquivoJson)) {
            file_put_contents($this->arquivoJson, json_encode([]));
        }
    }

    public static function getInstancia(): PedidoRepository {
        if (self::$instancia === null) {
            self::$instancia = new PedidoRepository();
        }
        return self::$instancia;
    }

    public function salvar($pedidoData) {
        $pedidos = $this->listarTodos();
        $pedidos[] = $pedidoData;
        file_put_contents($this->arquivoJson, json_encode($pedidos, JSON_PRETTY_PRINT));
    }

    public function listarTodos() {
        if (!file_exists($this->arquivoJson)) return [];
        $conteudo = file_get_contents($this->arquivoJson);
        return json_decode($conteudo, true) ?: [];
    }
}
?>