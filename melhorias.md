# Observações Críticas e Plano de Ação

## Indícios de Vulnerabilidades (Inferências)
Através da interação com a interface da loja virtual, notei alguns comportamentos que podem apontar para dívidas técnicas:
- **Sincronia View/Regra de Negócio:** Em momentos de instabilidade na conexão, o valor total do carrinho demora a refletir as adições feitas na tela. Isso indica que a comunicação entre o frontend e a lógica de precificação pode estar sofrendo de um leve nível de acoplamento indevido.
- **Risco na Etapa de Pagamento (Checkout):** A depender de como os estados da aplicação são guardados, o ato do cliente retornar para páginas anteriores do navegador durante o checkout pode gerar duplicação de ordens ou perda do carrinho.

## Propostas de Refatoração
Para consolidar a estabilidade da aplicação e prevenir bugs críticos, recomendo as seguintes abordagens arquiteturais:
1. **Rigor na aplicação do MVC:** Assegurar que nenhuma lógica matemática (cálculo de rotas de entrega, somatório de itens e deduções de cupons) fique solta. Tudo isso deve estar encapsulado na camada de *Model*, deixando o *Controller* livre para apenas intermediar os fluxos.
2. **Gestão de Sessão com Singleton:** Para contornar os riscos no checkout, o padrão *Singleton* deve ser aplicado no gerenciamento do carrinho. Isso garante que o servidor reconheça e mantenha uma única instância de compra por cliente ativo, bloqueando conflitos de duplicidade de pedidos.
3. **Adição do Padrão Factory:** O sistema de delivery lida com itens que possuem muitos opcionais (adicionais de lanche, frações de pizzas, etc). Centralizar essas variações de instâncias em uma *Factory* aliviará a responsabilidade das classes originais, deixando a arquitetura mais modular e adaptável.
