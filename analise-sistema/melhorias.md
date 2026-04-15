# **PARTE 7 – PROBLEMAS IDENTIFICADOS**

## **Limitações de arquitetura**

O sistema apresenta uma arquitetura funcional voltada principalmente para entrega rápida, com forte dependência da interface web para execução de regras de negócio.

Observa-se ausência de uma separação arquitetural rigidamente estruturada em camadas formais. Em diversos fluxos, especialmente na personalização de produtos e no carrinho de compras, a interface do usuário participa diretamente de regras como cálculo de valores, atualização de subtotal e controle de itens.

Além disso, o fluxo de checkout é implementado de forma sequencial (dados do cliente → entrega → pagamento), o que indica dependência entre etapas e reduz flexibilidade para reutilização ou alteração isolada de módulos.

## **Alto acoplamento**

O sistema apresenta acoplamento moderado a alto entre interface e lógica de negócio.

Um exemplo claro é o carrinho de compras, que precisa atualizar imediatamente o subtotal sempre que um item é adicionado, removido ou alterado. Isso cria dependência direta entre a camada de apresentação e as regras de cálculo.

Outro ponto é o fluxo de personalização de produtos (principalmente pizzas), onde a seleção de tamanho, borda, adicionais e sabores influencia diretamente o preço final, exigindo atualização contínua de múltiplos componentes ao mesmo tempo.

## **Dificuldade de manutenção**

A manutenção do sistema tende a ser dificultada pela mistura de responsabilidades na interface e pela dependência entre módulos.

Alterações em regras de preço, por exemplo, podem impactar diretamente o carrinho e a tela de produtos simultaneamente. Além disso, a falta de separação clara entre lógica de negócio e interface pode dificultar a evolução do sistema, especialmente para novos desenvolvedores que não conhecem o fluxo interno.

# **PARTE 10 – REFLEXÃO CRÍTICA**

## **1\. É possível modelar um sistema sem ver o código?**

Sim. É possível realizar modelagem por meio de engenharia reversa, observando o comportamento do sistema, suas interfaces e fluxos de interação. A partir disso, infere-se a estrutura interna e suas possíveis regras de negócio.

## **2\. Qual a importância da modelagem?**

A modelagem é fundamental para organizar e compreender sistemas complexos. Ela permite visualizar a estrutura antes da implementação ou modificação do código, facilitando a comunicação entre desenvolvedores e reduzindo erros de projeto.

Além disso, auxilia na identificação de problemas arquiteturais e na definição de melhorias antes de alterações no sistema.

## **3\. Diferença entre sistema real e didático**

O sistema real é construído com foco em funcionamento, desempenho e entrega rápida, podendo apresentar limitações arquiteturais e menor padronização.

Já o sistema didático é desenvolvido com foco educacional, priorizando clareza, organização, boas práticas de engenharia de software e separação correta de responsabilidades, como no padrão MVC.

