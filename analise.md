# Análise de Engenharia Reversa - Sistema de Pedidos

Este documento apresenta o relatório técnico de engenharia reversa realizado no sistema original estruturado sob o padrão MVC tradicional, identificando as dores e os gargalos arquiteturais antes da migração para a arquitetura modular.

## 1. Organização do MVC Original
O projeto anterior estava dividido estritamente por tipos de arquivos técnicos (camadas genéricas globais):
* `/controllers`: Concentrava o controle das requisições e a orquestração do fluxo.
* `/models`: Guardava a representation das entidades de dados (Pedido, Produto, ItemPedido).
* `/services`: Centralizava regras acessórias (como descontos e envio de WhatsApp).
* `/repositories`: Responsável pelo acesso e persistência no arquivo db.json.
* `/views`: Gerenciava a renderização e padrões como o Observer.

## 2. Problemas Arquiteturais Identificados

### A. Controllers Gordos (Fat Controllers)
O PedidoController.js atuava como um orquestrador centralizado acumulando acoplamento excessivo com múltiplos componentes (Services, Repositories e Views). Isso viola o Princípio da Responsabilidade Única (SRP), tornando o arquivo grande e complexo para manutenção.

### B. Dificuldade de Navegação e Dispersão de Código
Para alterar qualquer funcionalidade elementar do fluxo de "Pedidos", o desenvolvedor era obrigado a navegar por 5 pastas de nível raiz totalmente separadas para modificar uma única lógica de negócio.

### C. Alto Acoplamento (Tight Coupling)
Os limites de domínio não eram claros. O fluxo de produtos e pedidos misturavam-se nas pastas globais, reduzindo a capacidade de reutilização isolada de componentes de software.

### D. Crescimento Desordenado
À medida que novos módulos hipotéticos fossem solicitados (como auth ou payments), a raiz do projeto ficaria superlotada de arquivos desconexos, gerando gargalos para a escalabilidade do sistema e o aumento da equipe.
