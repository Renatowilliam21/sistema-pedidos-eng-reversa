<?php
declare(strict_types=1);

class PedidoService
{
    public function __construct(private PedidoRepository $repository)
    {
    }

    public function listar(): array
    {
        return array_map(
            fn(Pedido $p) => $p->toArray(),
            $this->repository->all()
        );
    }

    public function criar(array $payload): array
    {
        $cliente = trim((string)($payload['cliente'] ?? ''));
        $itensPayload = $payload['itens'] ?? [];

        if ($cliente === '') {
            throw new InvalidArgumentException('O campo cliente é obrigatório.');
        }
        if (!is_array($itensPayload) || count($itensPayload) === 0) {
            throw new InvalidArgumentException('O pedido deve possuir ao menos 1 item.');
        }

        $itens = array_map(
            fn(array $i) => ItemPedido::fromArray($i),
            $itensPayload
        );

        $pedido = new Pedido(null, $cliente, $itens);
        return $this->repository->create($pedido)->toArray();
    }

    public function remover(int $id): bool
    {
        if ($id <= 0) {
            throw new InvalidArgumentException('ID inválido.');
        }
        return $this->repository->deleteById($id);
    }
}