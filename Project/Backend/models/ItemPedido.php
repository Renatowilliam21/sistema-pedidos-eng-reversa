<?php
declare(strict_types=1);

class ItemPedido
{
    public function __construct(
        public Produto $produto,
        public int $quantidade,
        public float $desconto = 0.0
    ) {
    }

    public function calcularSubtotal(): float
    {
        return $this->produto->preco * $this->quantidade;
    }

    public function calcularDesconto(): float
    {
        return $this->calcularSubtotal() * ($this->desconto / 100);
    }

    public function calcularTotal(): float
    {
        return $this->calcularSubtotal() - $this->calcularDesconto();
    }

    public function toArray(): array
    {
        return [
            'produto' => $this->produto->toArray(),
            'quantidade' => $this->quantidade,
            'desconto' => $this->desconto,
            'subtotal' => $this->calcularSubtotal(),
            'descontoValor' => $this->calcularDesconto(),
            'total' => $this->calcularTotal(),
        ];
    }

    public static function fromArray(array $data): self
    {
        $produto = Produto::fromArray($data['produto'] ?? []);
        return new self(
            $produto,
            (int) ($data['quantidade'] ?? 1),
            (float) ($data['desconto'] ?? 0.0)
        );
    }
}