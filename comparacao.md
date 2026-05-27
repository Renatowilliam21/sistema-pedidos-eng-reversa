### Parte 4 – Padrões de Projeto

* **4.1 Diagnóstico:** O padrão **MVC** atua como fundação arquitetural da aplicação. Não há evidências de implementação de outros padrões clássicos do GoF (ex: Factory ou Singleton) na versão em produção.
* **4.2 Localização Camada/Escopo (Proposta de Refatoração):**
    * **MVC:** Estrutura global. View (HTML/CSS/JS no client-side), Controller (rotas e handlers de requisição), Model (regras de negócio e persistência).
    * **Factory:** Camada de domínio/catálogo. Centralizaria a instanciação complexa de produtos de acordo com a categoria (`Pizzas`, `Bebidas`), padronizando a criação.
    * **Singleton:** Camada de serviço/estado da aplicação. Garantiria instância única global para o gerenciamento do Carrinho de Compras e para o pool de conexões.
* **4.3 Impacto Prático da Implementação:**
    * *MVC:* Desacoplamento da interface em relação à lógica de dados, permitindo manutenções visuais sem efeitos colaterais no modelo.
    * *Factory:* Elimina funções de criação espalhadas pelo código, encapsulando validações de customização de itens.
    * *Singleton:* Garante a integridade referencial do pedido ativo, evitando concorrência de dados ou duplicação acidental de carrinhos.

---

### Parte 5 – Comparação: Sistema Real vs. Sistema Didático

| Critério | Sistema Real (Legado) | Sistema Didático (Alvo) |
| :--- | :--- | :--- |
| **Arquitetura** | Incipiente, com alto débito técnico e lógicas redundantes espalhadas pelas camadas. | Camadas bem definidas e isoladas sob o padrão MVC, otimizando o fluxo de dados. |
| **Coesão** | Baixa. Componentes acumulam funções de visualização e validação de regras de negócio. | Alta. Cada método e classe possui responsabilidade única e escopo delimitado. |
| **Acoplamento** | Alto. Forte interdependência entre telas e fluxos de navegação/roteamento de itens. | Baixo. Componentes modulares, independentes e facilmente substituíveis. |
| **Organização** | Inconsistente. Variações de produto tratadas como itens isolados. Telas com botões duplicados. | Domínio normalizado. Estrutura de dados limpa e separação clara de responsabilidades. |
| **Flexibilidade** | Baixíssima. Alterações pontuais geram efeitos cascata em módulos não correlacionados. | Alta. Extensibilidade simplificada, permitindo refatorações seguras e ágeis. |
