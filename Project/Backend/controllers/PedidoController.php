<?php
declare(strict_types=1);

class PedidoController
{
    public function __construct(private PedidoService $service)
    {
    }

    public function listar(): void
    {
        $this->responder($this->service->listar(), 200);
    }

    public function criar(): void
    {
        $raw = file_get_contents('php://input');
        $payload = json_decode($raw ?: '[]', true);

        if (!is_array($payload)) {
            $this->responder(['error' => 'JSON inválido.'], 400);
            return;
        }

        try {
            $novo = $this->service->criar($payload);
            $this->responder($novo, 201);
        } catch (InvalidArgumentException $e) {
            $this->responder(['error' => $e->getMessage()], 400);
        } catch (Throwable $e) {
            $this->responder(['error' => 'Erro interno.'], 500);
        }
    }

    public function remover(): void
    {
        try {
            $id = (int)($_GET['id'] ?? 0);
            $ok = $this->service->remover($id);

            if (!$ok) {
                $this->responder(['error' => 'Pedido não encontrado.'], 404);
                return;
            }

            $this->responder(['message' => 'Pedido removido com sucesso.'], 200);
        } catch (InvalidArgumentException $e) {
            $this->responder(['error' => $e->getMessage()], 400);
        } catch (Throwable $e) {
            $this->responder(['error' => 'Erro interno.'], 500);
        }
    }

    public function responder(array $data, int $status = 200): void
    {
        http_response_code($status);
        echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    }
}