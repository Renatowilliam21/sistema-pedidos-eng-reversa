# Comparação entre o Sistema Real e o Sistema Didático

## 1. Introdução

O sistema real da Tropykaly Pizza foi analisado como um ambiente de produção simples, mas funcional, enquanto o sistema antigo do repositório é um sistema didático de pedidos feito em HTML, CSS e JavaScript puro. A comparação entre os dois evidencia diferenças importantes de arquitetura, coesão, acoplamento, flexibilidade e tratamento de estado.

## 2. Principais diferenças observadas

### 2.1 Finalidade do sistema
O sistema real foi construído para uso em produção e precisa lidar com contexto operacional, como horário de atendimento e disponibilidade de pedidos. Já o sistema didático tem foco pedagógico, servindo para expor problemas de arquitetura e design.

No sistema antigo, os produtos estão hardcoded no próprio seletor HTML, o pedido é montado em memória local e o total é gravado no `localStorage`. Isso mostra que ele foi pensado mais como exercício de lógica e DOM do que como solução real de negócio.

### 2.2 Tratamento de estado
No sistema real, o estado de folga é relevante e altera o comportamento da aplicação. Isso mostra preocupação com regras de negócio reais. No sistema didático, normalmente o comportamento é fixo, sem variações operacionais relevantes.

No código antigo, o estado é apenas interno à tela, controlado por `itens` e `total`. Não existe um estado operacional do estabelecimento, nem bloqueio por funcionamento aberto/fechado.

### 2.3 Experiência do usuário
O sistema real busca ser intuitivo e direto, com navegação simples. O sistema didático tende a ser funcional apenas no sentido básico, sem a mesma preocupação com fluidez e consistência de uso.

O sistema antigo entrega uma experiência mínima: permite adicionar itens, ver a lista, calcular descontos e encerrar o pedido, mas não há categorias reais, busca, carrinho separado ou confirmação de etapas mais ricas como no sistema real.

### 2.4 Manutenção e evolução
O sistema real parece mais preparado para receber ajustes, porque a lógica de bloqueio e exibição pode ser separada. O sistema didático, por outro lado, tende a dificultar alterações, pois apresenta maior dispersão de responsabilidades e maior chance de dependências entre partes distintas.

No sistema antigo, a função `calcularTotal` repete um cálculo que já é feito em `atualizarLista`, e `salvarTotal` apenas grava um valor que poderia ser derivado de outra fonte. Isso é um sinal claro de duplicação de responsabilidade e manutenção mais cara.

### 2.5 Persistência e integração
O sistema real sugere integração com backend e regras centralizadas. O sistema antigo, por sua vez, usa apenas `localStorage`, sem API, sem banco de dados visível e sem camada de persistência formal.

## 3. Conclusão da comparação

A principal diferença entre os dois sistemas está na maturidade de organização. O sistema real demonstra preocupação com uso prático, estados operacionais e clareza para o usuário. O sistema antigo funciona como exemplo didático de uma aplicação simples, útil para estudo justamente porque evidencia o que acontece quando não há separação clara entre interface, regra de negócio e persistência.

