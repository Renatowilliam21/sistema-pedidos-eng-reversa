<?php
declare(strict_types=1);

class PedidoRepository
{
    private string $file;

    public function __construct(?string $file = null)
    {
        $this->file = $file ?? __DIR__ . '/../data/pedidos.json';
        $this->ensureStorage();
    }

    /** @return Pedido[] */
    public function all(): array
    {
        $rows = $this->read();
        return array_map(fn(array $r) => Pedido::fromArray($r), $rows);
    }

    public function create(Pedido $pedido): Pedido
    {
        $rows = $this->read();
        $pedido->id = $this->nextId($rows);
        $rows[] = $pedido->toArray();
        $this->write($rows);
        return $pedido;
    }

    public function deleteById(int $id): bool
    {
        $rows = $this->read();
        $before = count($rows);

        $rows = array_values(array_filter(
            $rows,
            fn(array $r) => (int)($r['id'] ?? 0) !== $id
        ));

        if (count($rows) === $before) {
            return false;
        }

        $this->write($rows);
        return true;
    }

    private function read(): array
    {
        $json = file_get_contents($this->file);
        $data = json_decode($json ?: '[]', true);
        return is_array($data) ? $data : [];
    }

    private function write(array $rows): void
    {
        file_put_contents(
            $this->file,
            json_encode($rows, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
        );
    }

    private function nextId(array $rows): int
    {
        $ids = array_map(fn(array $r) => (int)($r['id'] ?? 0), $rows);
        return empty($ids) ? 1 : (max($ids) + 1);
    }

    private function ensureStorage(): void
    {
        $dir = dirname($this->file);
        if (!is_dir($dir)) {
            mkdir($dir, 0777, true);
        }
        if (!file_exists($this->file)) {
            file_put_contents($this->file, json_encode([], JSON_PRETTY_PRINT));
        }
    }
}