<?php
declare(strict_types=1);

class Pedido
{
    public function __construct(
        public ?int $id,
        public string $cliente,
        public array $itens = [],
        public string $status = 'aberto',
        public ?string $createdAt = null
    ) {
        $this->createdAt ??= date('c');
    }

    public function calcularTotal(): float
    {
        return array_reduce(
            $this->itens,
            fn ($total, ItemPedido $item) => $total + $item->calcularTotal(),
            0.0
        );
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'cliente' => $this->cliente,
            'itens' => array_map(fn (ItemPedido $item) => $item->toArray(), $this->itens),
            'total' => $this->calcularTotal(),
            'status' => $this->status,
            'createdAt' => $this->createdAt,
        ];
    }

    public static function fromArray(array $data): self
    {
        $itens = array_map(
            fn (array $item) => ItemPedido::fromArray($item),
            $data['itens'] ?? []
        );

        return new self(
            $data['id'] ?? null,
            (string) ($data['cliente'] ?? ''),
            $itens,
            (string) ($data['status'] ?? 'aberto'),
            $data['createdAt'] ?? null
        );
    }
}