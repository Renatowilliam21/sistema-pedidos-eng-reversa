# Estrutura de Modularização e Padrões Aplicados

## Padrões de Projeto (Design Patterns)
Nesta arquitetura modular, garantimos a aplicação rigorosa de padrões para resolver problemas específicos dentro de cada módulo:
* **Service Pattern:** Centralizou as regras de negócio puras (ex: cálculo de totais, lógica de negócio do carrinho), removendo peso dos controladores.
* **Repository Pattern:** Isolou completamente a lógica de persistência de dados (`database.py`), permitindo que a camada de negócio não conheça a tecnologia de armazenamento.
* **Factory:** Utilizado para a criação de instâncias complexas (como o `PedidoFactory`), abstraindo a sua construção.
* **Singleton:** Aplicado para gerir a instância única da configuração da base de dados.
* **Middleware:** Introduzido na pasta `/shared` para intercetar pedidos globais (como a simulação de autenticação).

---

## Perguntas Norteadoras da Evolução

* **O sistema ficou mais organizado?** Sim. O código reflete agora os processos reais do negócio (Autenticação, Pagamentos, Pedidos).

* **A modularização facilitou a navegação?** Imenso. Para corrigir um erro no pedido, o programador abre apenas a pasta `/modules/orders/` e tem lá tudo o que precisa.

* **Os controllers ficaram menores?** Sim, funcionam agora estritamente como recetores de pedidos e emissores de respostas, delegando a inteligência para a pasta `/services` dentro do seu próprio módulo.

* **O sistema ficou mais desacoplado?** Sim. Um módulo não acede diretamente à base de dados do outro, respeitando as fronteiras de domínio.

* **Os módulos possuem responsabilidades claras?** Cada módulo é autossuficiente e trata exclusivamente do seu contexto (ex: o módulo `auth` apenas lida com credenciais e o `orders` com o carrinho).

* **O projeto agora suporta crescimento?** Sim. É possível adicionar o módulo `/shipping` (envios) sem alterar ou correr o risco de quebrar os módulos existentes.

* **Como a arquitetura influencia a equipa?** Permite que diferentes programadores trabalhem em módulos distintos simultaneamente sem gerar conflitos (merge conflicts) nos mesmos ficheiros de controladores globais.