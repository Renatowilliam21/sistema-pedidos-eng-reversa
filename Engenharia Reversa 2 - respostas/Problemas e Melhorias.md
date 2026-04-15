# **Parte 7 e 10 – Problemas Identificados e Reflexão**

## **Parte 7 – Problemas Identificados (Análise Crítica)**

Baseando-se no comportamento típico deste tipo de sistema:

* **Limitações de Arquitetura:** O processo de checkout não é totalmente automatizado. Ao transferir o pedido para o WhatsApp, o sistema perde o rastreio (tracking) do pedido (se foi entregue, cancelado ou pago).  
* **Alto Acoplamento (Potencial):** Se o catálogo não vier de uma API (dados embutidos no HTML \- *hardcoded*), há um alto acoplamento entre a apresentação e os dados. Qualquer alteração no preço exigiria alteração no código fonte e *deploy* da aplicação.  
* **Dificuldade de Manutenção:** A dependência da plataforma do WhatsApp para fechar o negócio significa que qualquer mudança nas políticas ou APIs da Meta pode interromper o fluxo de vendas da empresa.

## **Parte 10 – Reflexão Crítica**

**1\. É possível modelar um sistema sem ver o código?**

Sim. A isto chama-se "Engenharia Reversa baseada em comportamento" ou modelagem de "Caixa Preta". Observando os *inputs* (ações do utilizador), os *outputs* (alterações na interface) e as requisições de rede (Network tab do navegador), podemos inferir com grande precisão as entidades de domínio, os fluxos de dados e a arquitetura subjacente. A arquitetura reflete diretamente o comportamento que o sistema tem de ter.

**2\. Qual a importância da modelagem?**

A modelagem serve como a planta (blueprint) de um edifício. Permite às equipas de desenvolvimento comunicarem de forma não ambígua usando uma linguagem comum (UML). Ajuda a prever problemas de design, acoplamento e escalabilidade antes de escrever a primeira linha de código, poupando tempo e recursos financeiros nas fases de implementação e manutenção.

**3\. Diferença entre sistema real e didático?**

Um sistema didático atua num "vácuo": os cenários de erro são limitados, os dados são perfeitos e a infraestrutura é local e simplificada. Um sistema real tem de lidar com a latência de rede, assincronicidade, segurança de dados, acessibilidade, falhas em integrações com terceiros (como o WhatsApp) e mudanças constantes nos requisitos do negócio real em produção.