# Análise do Sistema Tropykaly Pizza

## 1. Análise do Sistema Real

### 1.1 Objetivo do sistema
O sistema tem como objetivo permitir que o cliente conheça a oferta da empresa e realize pedidos de produtos alimentícios pela internet, com uma navegação simples e direta. Pelo comportamento observado, trata-se de um sistema voltado ao varejo de alimentação, com foco em facilitar a consulta do cardápio, a escolha de itens e, quando disponível, o envio do pedido para atendimento.

O público principal é composto por clientes finais, que acessam o site para visualizar produtos, verificar informações básicas e tentar concluir uma compra. Em um segundo plano, o sistema também atende ao fluxo operacional da empresa, pois precisa controlar o momento em que os pedidos podem ou não ser recebidos.

### 1.2 Funcionalidades oferecidas
Durante a exploração, o sistema se mostrou simples e intuitivo, mas com limitações porque estava em regime de folga. Isso significa que algumas funcionalidades que normalmente fariam parte do fluxo completo de compra estavam indisponíveis no momento da análise.

As funcionalidades percebidas ou esperadas no sistema são:

| Funcionalidade | Status | Descrição | Observação |
|---|---|---|---|
| Visualização de produtos | Ativa | Permite consultar os itens oferecidos pelo estabelecimento. | Funcionalidade central do sistema. |
| Navegação por categorias | Ativa | Organiza os produtos de forma visual e facilita a busca. | Reforça a simplicidade da interface. |
| Carrinho de compras | Parcial | Serve para reunir itens antes da finalização do pedido. | Pode ficar limitado quando o sistema está fechado. |
| Finalização de pedido | Desativada | Fluxo de envio do pedido ao estabelecimento. | Bloqueado durante a folga. |
| Pagamento on-line | Desativada | Etapa de pagamento digital ou confirmação da compra. | Não foi possível concluir essa parte. |
| Atendimento ao cliente | Ativa ou parcial | Pode existir por contato direto, mensagens ou instruções de uso. | Depende da configuração do site. |

O ponto mais importante é que a ausência temporária de funcionalidades não indica necessariamente falha, mas sim um mecanismo de controle operacional. Isso revela que o sistema foi pensado para respeitar a rotina do negócio, o que é relevante do ponto de vista de arquitetura e de experiência do usuário.

### 1.3 Interação do usuário
A interação com o sistema é direta. O usuário acessa o site, visualiza o conteúdo principal e percorre as opções de produtos com pouca complexidade de navegação. A interface passa a sensação de ser organizada para reduzir esforço cognitivo, o que é coerente com um sistema de pedidos simples.

Evidência da tela inicial analisada: a página apresenta o nome da pizzaria, menu por categorias, campo de busca de produtos, cards com categorias de itens, carrinho no topo e informações de contato no rodapé. Também exibe o estado operacional do estabelecimento. Esses elementos indicam foco em descoberta rápida de produtos e clareza para navegação do usuário.

O fluxo observado pode ser resumido assim:

Início -> navegação pelo cardápio -> escolha de produto -> tentativa de pedido -> bloqueio ou liberação conforme o estado do sistema

Como o sistema estava em folga, o fluxo completo de compra não pôde ser validado até a etapa final. Mesmo assim, isso ajuda na análise porque evidencia que o sistema possui uma lógica de estado, capaz de alterar o comportamento da interface e impedir ações fora do horário de funcionamento.

### 1.4 Organização dos produtos
Os produtos parecem organizados por grupos ou categorias, com apresentação visual voltada à leitura rápida. Em sistemas desse tipo, é comum encontrar separação por tipo de item, como pizzas, bebidas, lanches e complementos, além de informações básicas como nome, descrição e valor.

A organização sugere uma estrutura orientada à escolha rápida, em vez de uma navegação aprofundada. Isso é adequado para o contexto de vendas alimentícias, porque o usuário geralmente quer localizar um item com poucos cliques.

## 2. Análise de arquitetura

### 2.1 Tipo de arquitetura
Com base no comportamento observado, o sistema aparenta seguir uma arquitetura web com forte separação entre apresentação e processamento, provavelmente apoiada por camadas de frontend e backend. Não há elementos suficientes para afirmar com segurança um MVC clássico no nível visível ao usuário, mas há sinais de organização modular.

A interface tem comportamento intuitivo e orientado a navegação rápida, o que sugere um frontend responsável por apresentar dados e reagir ao estado do sistema, enquanto as regras de negócio mais sensíveis, como abertura e fechamento de pedidos, tendem a estar centralizadas no backend ou em uma API.

### 2.2 Divisão em camadas
A divisão em camadas pode ser entendida da seguinte forma:

| Camada | Função provável |
|---|---|
| Apresentação | Exibe produtos, mensagens, botões e estados da interface. |
| Negócio | Decide se o pedido pode ser realizado, como os itens devem ser tratados e quais regras se aplicam. |
| Dados | Armazena ou fornece os produtos, configurações do sistema e informações de pedidos. |

Essa estrutura é importante porque permite que o sistema seja ajustado sem alterar toda a aplicação. Se a lógica de folga foi tratada corretamente, ela deve estar concentrada em uma camada de regra e não espalhada pela interface inteira.

### 2.3 Separação de responsabilidades
O sistema aparenta ter uma separação razoável de responsabilidades, porque a navegação é simples e o comportamento visual é coerente com o estado do negócio. A interface demonstra preocupação em orientar o usuário, enquanto a regra de disponibilidade impede ações indevidas quando o estabelecimento não está atendendo.

Ainda assim, sem acesso ao código, não é possível afirmar se a separação é ideal. O melhor indício é que o sistema consegue comunicar seu estado operacional sem quebrar a experiência do usuário, o que sugere uma organização funcional minimamente consistente.

### 2.4 Gerenciamento de estado aberto e fechado
O fato de o sistema estar em folga é uma informação muito útil para a análise arquitetural. Isso mostra que ele possui um mecanismo de controle de estado operacional, provavelmente baseado em configuração, regra de negócio ou consulta a dados do estabelecimento.

Quando um sistema se comporta de forma diferente conforme o horário ou disponibilidade, normalmente existe uma regra central que decide se o pedido pode seguir ou não. Se essa regra estiver bem implementada, ela evita duplicação de lógica e melhora a manutenção.

## 3. Análise de design

### 3.1 Coesão
O sistema apresenta boa coesão do ponto de vista funcional, porque os elementos visuais e as ações esperadas parecem estar voltados ao mesmo objetivo: apresentar produtos e viabilizar pedidos. A interface não aparenta misturar muitas finalidades diferentes em uma única tela, o que é positivo.

A folga reforça isso, porque o bloqueio de pedidos não desmonta o restante do sistema. Em vez disso, o site continua cumprindo sua função de exibir informações e organizar o cardápio. Isso indica que a lógica de negócio principal está relativamente concentrada.

### 3.2 Acoplamento
O acoplamento aparenta ser moderado ou baixo no nível de uso, já que o sistema continua operando parcialmente mesmo quando o fluxo de compra está indisponível. Esse é um bom sinal, porque significa que a exibição do cardápio não depende integralmente do mecanismo de pedido.

Por outro lado, a análise completa do acoplamento dependeria do comportamento interno da aplicação. Ainda assim, a percepção externa é de que o sistema tenta isolar a experiência de navegação da lógica de operação comercial.

### 3.3 Qualidade geral do design

| Aspecto | Qualidade | Observação |
|---|---|---|
| Consistência visual | Boa | A interface parece simples e objetiva. |
| Responsividade | Boa ou presumidamente boa | A navegação intuitiva sugere adaptação razoável entre telas. |
| Performance | Satisfatória | Não houve sinais de lentidão relevante na exploração. |
| Usabilidade | Boa | O fluxo é direto e fácil de entender. |

## 4. Padrões de projeto

### 4.1 Padrões observados
Sem acesso ao código-fonte, não é possível confirmar padrões de projeto de forma objetiva, mas o comportamento observado permite levantar hipóteses coerentes.

O sistema pode estar se apoiando em ideias próximas a MVC ou em uma organização por camadas, porque a interface apresenta dados e o controle de disponibilidade de pedidos parece ser tratado por uma regra separada. Também é plausível imaginar algum uso de padrão State, já que o sistema altera seu comportamento entre aberto e fechado.

### 4.2 Onde Factory poderia existir
O padrão Factory faria sentido em pontos como a criação de diferentes tipos de produto, variações de pedido ou geração de objetos de carrinho com regras específicas. Em um sistema de alimentação, isso ajuda quando existem muitos itens com combinações diferentes de tamanho, complemento, observação e valor.

### 4.3 Onde Singleton poderia existir
Singleton poderia ser aplicado em componentes como configuração global do sistema, sessão do usuário, estado do carrinho ou controle do status do estabelecimento. O uso desse padrão faz sentido quando existe um único ponto responsável por coordenar uma informação compartilhada por toda a aplicação.

## 5. Resumo das observações

O sistema é simples, intuitivo e focado em facilitar a navegação do cliente. A principal limitação observada foi o fato de estar em folga, o que impediu a conclusão do fluxo de pedido, mas ao mesmo tempo revelou um comportamento importante: o sistema consegue controlar seu estado operacional.

Isso sugere uma aplicação com boa organização funcional, com separação razoável entre apresentação e regras de negócio. A interface transmite clareza, o que reforça a percepção de um sistema voltado para uso prático e direto.

## 6. Notas técnicas

Tecnologias detectadas:
- Frontend: não confirmado sem inspeção do código.
- Backend: não confirmado sem inspeção do código.
- APIs: presumivelmente utilizadas para dados e regras de operação.
- Banco de dados: não visível na análise de superfície.

Pontos importantes observados:
- sistema orientado a catálogo e pedido;
- navegação simples;
- bloqueio de funcionalidades durante a folga;
- comportamento coerente com regras de negócio centralizadas.
