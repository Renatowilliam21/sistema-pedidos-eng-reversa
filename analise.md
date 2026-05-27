### Parte 1 – Análise do Sistema Real

* **1.1 Objetivo:** Sistema de pedidos para otimizar o atendimento em estabelecimento comercial, reduzindo a necessidade de atendimento humano direto e mitigando gargalos operacionais na recepção.
* **1.2 Escopo Funcional (Cliente):** * Visualização de cardápio (itens, combos e promoções).
    * Customização de itens com validação de campos obrigatórios antes da inserção no carrinho (ex: seleção de sabores e bordas).
    * Persistência de dados cadastrais (endereço e telefone) via *local storage*.
    * Cálculo automatizado de taxas de entrega com base na modalidade (Delivery ou Retirada).
    * Registro do método de pagamento (PIX, Crédito, Débito ou Dinheiro com cálculo de troco); o processamento do pagamento é estritamente presencial (checkout offline).
    * Bloqueio de requisições fora do horário de funcionamento com redirecionamento de rota.
* **1.3 Fluxo de Navegação:** Cardápio (Categorias/Promoções/Descontos) -> Customização e Observações do Item -> Carrinho de Compras -> Checkout (Definição de entrega e pagamento) -> Envio do pedido.
* **1.4 Estrutura do Cardápio:** * *Categorias:* Produtos individuais tratados de forma isolada (ex: tamanhos de pizza gerenciados como SKUs distintos).
    * *Combos:* Produtos base acoplados a extras com acréscimos de valor fixo (R$10 ou R$12).
    * *Promoções:* Seção destinada a itens com desconto aplicado.

---

### Parte 2 – Análise de Arquitetura

* **Padrão Arquitetural Base:** Características compatíveis com **MVC (Model-View-Controller)**. A View (camada de apresentação) captura interações; o Controller processa as requisições de rota e lógica; o Model gerencia o estado do pedido e regras de negócio.
* **Modelo de Comunicação:** **Cliente-Servidor**. Utiliza chamadas de API para atualização de status de pedidos ("Em produção", "Saiu para entrega") e acoplamento com API de terceiros (WhatsApp) para notificações ao cliente.
* **Padrão Estrutural:** Indícios de **Arquitetura Monolítica em Camadas**. Apresenta baixo reaproveitamento de componentes e alto acoplamento físico.
* **Débito Técnico Identificado:** * *Alto acoplamento e baixa coesão:* Inconsistências na renderização de preços de combos e redundância de elementos na interface de checkout (ex: botões duplicados).
    * *Deficiência na Separação de Responsabilidades (SoC):* Lógica de negócio vazando para a camada de apresentação, resultando em modelagem redundante de variações de produtos (ex: tratar tamanhos de pizza como entidades independentes).

---

### Parte 3 – Análise de Design

* **Coesão (Baixa):** Funções acumulam múltiplas responsabilidades. A validação do horário de funcionamento ocorre de forma tardia (na tela de especificações do produto em vez de bloquear o fluxo na *homepage*). Há duplicidade estrutural de componentes (dois botões idênticos de finalização no checkout).
* **Acoplamento (Alto):** Forte interdependência entre componentes. Telas de especificação e sabores são replicadas de forma isolada para produtos semanticamente similares (sanduíches e hambúrgueres artesanais). Variações de tamanho de um mesmo produto geram entidades totalmente distintas no catálogo.
* **Separação de Responsabilidades (Precária):** Falta de isolamento entre a lógica de persistência, regras de negócio e renderização de interface, limitando a escalabilidade e a manutenibilidade do software.
