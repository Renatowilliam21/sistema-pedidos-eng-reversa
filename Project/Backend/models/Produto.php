<?php
declare(strict_types=1);

class Produto
{
    public function __construct(
        public int $id,
        public string $nome,
        public float $preco
    ) {
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'nome' => $this->nome,
            'preco' => $this->preco,
        ];
    }

    public static function fromArray(array $data): self
    {
        return new self(
            (int) ($data['id'] ?? 0),
            (string) ($data['nome'] ?? ''),
            (float) ($data['preco'] ?? 0.0)
        );
    }
}