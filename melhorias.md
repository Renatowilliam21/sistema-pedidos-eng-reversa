### Parte 7 – Problemas Identificados

1.  **Inconsistência de Domínio:** Falha no tratamento de variações de um mesmo produto (tamanhos de pizza modelados de forma avulsa).
2.  **Vazamento de Escopo (Baixa Coesão):** Regras de negócio de validação de horário acopladas incorretamente à navegação de subpáginas.
3.  **Redundância de UI:** Elementos de ação duplicados (dois botões de finalização no checkout) e inconsistência exibição de preços agregados em combos.
4.  **Rigidez Estrutural:** Alto acoplamento gerando efeito cascata em modificações simples, elevando o custo de manutenção.

---

### Parte 8 – Proposta de Arquitetura

* **Isolamento em Camadas:** Refatoração rigorosa do MVC para garantir a Separação de Responsabilidades (SoC) e o Princípio de Responsabilidade Única (SRP).
* **Desacoplamento UI/Negócio:** Implementar *route guards* no front-end para validação imediata do status da loja, impedindo o fluxo de compra antes da seleção de itens.
* **Normalização de Dados:** Centralizar as variações de produtos (tamanhos, sabores) dentro da mesma entidade através de propriedades, eliminando registros duplicados no catálogo.
* **Evolução de Protocolo:** Implementar gateways de pagamento online via API (síncrona), eliminando a dependência exclusiva do checkout offline.

---

### Parte 9 – Aplicação de Padrões

* **Factory Method:** Aplicado na classe `ItensEspecificos` para encapsular a lógica de instanciação e validação de customizações dos produtos. Centraliza e protege o encapsulamento do domínio.
* **Singleton:** Aplicado na classe `Pedidos` (Carrinho de Compras) para assegurar uma instância única global em memória. Previne inconsistência de concorrência e vazamento de memória.

---

### Parte 10 – Reflexão Crítica

* **10.1 Viabilidade:** A engenharia reversa baseada na camada de apresentação é eficaz para abstrair o modelo de domínio e regras de negócio macro, embora limite a validação minuciosa de otimização de código interno.
* **10.2 Valor da Modelagem:** Essencial para documentação, análise de impacto arquitetural pré-codificação e identificação de gargalos de design em processos de refatoração.
* **10.3 Acadêmico vs. Mercado:** Ambientes didáticos isolam variáveis para focar em boas práticas limpas. Sistemas reais operam sob restrições severas de infraestrutura, dados legados, integrações de terceiros e prazos comerciais, tornando o débito técnico um fator crítico a ser gerenciado.
