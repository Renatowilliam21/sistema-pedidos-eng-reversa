### Parte 6 – Modelagem do Sistema

#### Dicionário de Classes

1.  **`Plataforma`:** Contexto global e núcleo do sistema. Centraliza as regras de negócio, o estado do catálogo, o controle de estado do carrinho e a validação do horário de funcionamento.
2.  **`Administrador`:** Entidade de gerenciamento. Possui privilégios de escrita e alteração no catálogo, preços e configurações globais do sistema através de autenticação restrita.
3.  **`Cliente`:** Entidade consumidora. Armazena dados cadastrais e histórico de pedidos. Implementa operações de CRUD para o perfil do usuário.
4.  **`Pedidos`:** Abstração do carrinho de compras e fechamento de venda. Responsável pelo cálculo do valor total, frete, agregação e manipulação de itens (adição/remoção).
5.  **`API`:** Módulo de integração externa. Formata dados de pedidos novos e despacha *payloads* para serviços de mensageria terceiros (WhatsApp), notificando o Administrador e atualizando o Cliente.
6.  **`ItensEspecificos`:** Superclasse abstrata para os produtos do cardápio. Concentra atributos comuns: preço base, adicionais, observações e categoria.
7.  **Subclasses (`Pizzas`, `Sanduiches`, `Sucos`, etc.):** Classes filhas que herdam de `ItensEspecificos`. Armazenam apenas propriedades e variações exclusivas de cada tipo de produto.

#### Relacionamentos e Multiplicidade

* **Associação Simples:**
    * `Administrador` (1) $\rightarrow$ Gerencia $\rightarrow$ `Plataforma` (1)
    * `Cliente` (1..*) $\rightarrow$ Utiliza $\rightarrow$ `Plataforma` (1)
    * `Plataforma` (1) $\rightarrow$ Renderiza $\rightarrow$ `Pedidos` (0..*)
    * `Plataforma` (1) $\rightarrow$ Dispara dados $\rightarrow$ `API` (1)
    * `API` (1) $\rightarrow$ Notifica $\rightarrow$ `Administrador` (1)
* **Agregação:**
    * `Cliente` (1) $\diamondsuit$ `Pedidos` (0..*): O ciclo de vida do cliente é independente dos seus pedidos realizados.
    * `Pedidos` (1) $\diamondsuit$ `ItensEspecificos` (1..*): O pedido exige pelo menos um item. A destruição do carrinho não elimina o produto do catálogo.
* **Herança:**
    * `ItensEspecificos` $\blacktriangle$ Subclasses (`Pizzas`, `Sanduiches`, `Sucos`, `Refrigerantes`, `HamburgueresArtesanais`, `Vitaminas`, `Porcoes`). Instanciação em memória varia de $0..*$.

#### Diagrama de Classes
O diagrama UML estrutural está representado no arquivo `modelagem.png`.
