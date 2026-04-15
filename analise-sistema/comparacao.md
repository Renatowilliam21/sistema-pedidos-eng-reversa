# **PARTE 5 – COMPARAÇÃO COM SISTEMA DIDÁTICO (REVISADA)**

## **Critério: Arquitetura**

No sistema real, a arquitetura é orientada principalmente à funcionalidade e à experiência do usuário, sendo possível inferir uma estrutura cliente-servidor com possível mistura entre camadas em alguns pontos, especialmente no fluxo de carrinho e checkout.

Já no sistema didático, a arquitetura é definida de forma explícita e organizada, geralmente baseada em padrões consolidados como MVC, com separação clara entre apresentação, lógica de negócio e persistência de dados.

**Diferença principal:** o sistema real prioriza funcionamento e agilidade de implementação, enquanto o sistema didático prioriza estruturação arquitetural e clareza de responsabilidades.

## **Critério: Coesão**

No sistema real, a coesão é predominantemente funcional, ou seja, os módulos são organizados com base nas funcionalidades (produtos, carrinho, pedido), mas internamente ainda podem concentrar múltiplas responsabilidades, especialmente em processos de personalização.

No sistema didático, a coesão tende a ser alta, pois cada módulo é construído com uma responsabilidade única e bem definida, reduzindo sobreposição de funções.

**Diferença principal:** o sistema didático possui maior granularidade e separação interna, enquanto o sistema real agrupa mais responsabilidades dentro dos mesmos fluxos funcionais.

## **Critério: Acoplamento**

No sistema real, o acoplamento é moderado, com dependência perceptível entre interface e lógica de negócio, principalmente em operações dinâmicas como atualização do carrinho e cálculo de valores.

No sistema didático, busca-se baixo acoplamento, onde cada camada ou módulo depende minimamente dos outros, facilitando manutenção e testes isolados.

**Diferença principal:** o sistema didático favorece independência entre componentes, enquanto o sistema real apresenta maior dependência entre camadas funcionais.

## **Critério: Organização**

No sistema real, a organização é orientada ao uso prático, priorizando a entrega de funcionalidades ao usuário final, o que pode resultar em menor padronização interna e estrutura menos rígida.

No sistema didático, a organização segue padrões de engenharia de software, com estrutura bem definida, nomenclatura consistente e divisão clara de responsabilidades.

**Diferença principal:** o sistema didático é projetado para clareza estrutural, enquanto o sistema real é otimizado para funcionamento direto.

## **Critério: Flexibilidade**

No sistema real, a flexibilidade é moderada a baixa, pois alterações em funcionalidades centrais podem impactar múltiplas partes do sistema, especialmente quando há dependência entre interface e lógica de negócio.

No sistema didático, a flexibilidade é alta, pois a separação em camadas e o uso de padrões arquiteturais permitem alterações com menor impacto colateral.

**Diferença principal:** o sistema didático é mais adaptável a mudanças, enquanto o sistema real possui maior impacto em cascata em caso de alterações.

## **Conclusão geral da comparação**

O sistema real e o sistema didático possuem objetivos distintos: o sistema real prioriza funcionamento e experiência do usuário final, enquanto o sistema didático prioriza organização, clareza arquitetural e aplicação de boas práticas de engenharia de software.

Essa diferença resulta em maior simplicidade e pragmatismo no sistema real, porém com menor nível de estruturação interna quando comparado ao modelo didático.

