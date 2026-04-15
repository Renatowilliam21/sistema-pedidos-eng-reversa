# **Parte 5 – Comparação com Sistema Didático**

| Critério | Sistema Real (Tropykaly) | Sistema Didático (Repositório) |
| :---- | :---- | :---- |
| **Arquitetura** | Arquitetura Distribuída / Cliente-Servidor (Frontend SPA comunicando com uma API/Backend). | Arquitetura Monolítica e sem definição clara de camadas (tudo a correr no mesmo processo). |
| **Coesão** | **Alta**. Cada componente da interface (ex: carrinho, lista de pizzas) tem uma responsabilidade única e bem definida. | **Baixa**. Presença provável de "God Classes" (Classes Deus), onde uma única classe gere produtos, calcula preços e processa o pedido simultaneamente. |
| **Acoplamento** | **Baixo**. A interface (View) é independente das regras de negócio do servidor. Comunicam via JSON/Webhooks. | **Alto**. A interface de utilizador, o acesso aos dados e a lógica de negócio estão fortemente entrelaçados (chamadas diretas). |
| **Organização** | Organizado por domínios de negócio e camadas visuais. Separação clara entre o que é catálogo e o que é o *checkout* via WhatsApp. | Ficheiros misturados; código de apresentação junto com regras de negócio e persistência de dados. |
| **Flexibilidade** | **Alta**. É fácil alterar o layout do menu ou adicionar um novo produto no backend sem ter de reescrever a lógica da interface. | **Baixa**. Qualquer pequena alteração na interface corre o risco de quebrar as regras de negócio ou o cálculo do pedido. |

### **Explicação das Principais Diferenças**

A diferença central entre os dois reside na **Separação de Responsabilidades (Separation of Concerns)** e no **Objetivo de Uso**:

1. **O Sistema Didático** foi construído de forma intencionalmente acoplada (ou de forma ingénua) para demonstrar as dores da falta de arquitetura. Quando não usamos padrões como MVC ou Factory, o código torna-se rígido. Uma alteração num requisito simples (como adicionar uma taxa de entrega) obriga a modificar várias partes do sistema, gerando um efeito dominó de *bugs*.  
2. **O Sistema Real (Tropykaly)**, por estar em produção e precisar de atender clientes no browser ou no telemóvel, foi forçado a adotar uma arquitetura de componentes. Ao isolar o "Carrinho" dos "Produtos" e transferir a finalização para o WhatsApp (API externa), o sistema ganha resiliência. Se o WhatsApp estiver em baixo, o cliente ainda consegue ver o menu; no sistema didático fortemente acoplado, um erro numa função poderia fazer o sistema inteiro falhar ("crashar").