# Backlog da Sprint - Migração Arquitetural Modular

1. **TASK-01: Separação do Módulo de Produtos**
   - *Descrição:* Mover a entidade `Produto` e seu catálogo simulado para a pasta `/modules/products`.
2. **TASK-02: Isolamento do Domínio de Pedidos**
   - *Descrição:* Migrar `PedidoController`, `PedidoService` e `PedidoRepository` para o módulo `/orders`.
3. **TASK-03: Criação da Camada Shared e Middlewares**
   - *Descrição:* Implementar os Middlewares de Log e Autenticação Fake na pasta `/shared`.
4. **TASK-04: Tratamento de Erros Global e Logs nos Controllers**
   - *Descrição:* Refatorar os métodos de tratamento do controller para usar a centralização de erros.
5. **TASK-05: Code Review e Validação de Contratos entre Módulos**
   - *Descrição:* Verificar se o módulo de `orders` não está acessando dados internos de `products` sem usar os Services públicos.