# Análise Arquitetural: Do MVC Tradicional à Modularização

## Parte 1 - Engenharia Reversa da Arquitetura Atual (MVC)

**1. Como o MVC atual está organizado?**
O sistema está organizado de forma puramente técnica (em camadas). Os ficheiros estão agrupados pelo seu papel no padrão: todos os modelos na pasta `/models`, todos os controladores na pasta `/controllers`, etc.

**2. Onde existem problemas arquiteturais?**
O principal problema reside na dispersão do contexto. Para alterar a funcionalidade de "Pedidos", um programador precisa de navegar por quatro ou cinco diretórios diferentes (`models`, `controllers`, `services`, `repositories`), o que prejudica a manutenção num sistema em crescimento.

**3. Existem controllers gordos?**
Sim. Como o MVC centraliza as ações no `PedidoController`, este ficheiro tem tendência a acumular demasiadas injeções de dependência (WhatsApp, Descontos, Base de Dados), tornando-se um "gargalo" no sistema.

**4. Onde estão as regras de negócio?**
As regras de negócio já foram externalizadas do controlador para a camada de Serviços (ex: `PedidoService`, `desconto.py`), o que foi um bom passo anterior, mas continuam misturadas numa pasta global de serviços.

**5. Existem responsabilidades misturadas?**
A nível de pastas, sim. A infraestrutura (como o `database.py`) e os padrões partilhados (como o `observer_base.py`) partilham espaço e acessos com lógicas que deveriam pertencer exclusivamente a um único domínio (como a lógica de produtos ou pedidos).

**6. O sistema está preparado para crescer?**
Não. À medida que novos domínios forem adicionados (Autenticação, Pagamentos, Integrações), a pasta `/controllers` e a pasta `/models` ficarão insustentáveis. O sistema precisa de fronteiras de contexto claras.

---

## Parte 7 - Problemas do MVC Original a Escalar

Caso o MVC original fosse mantido num cenário de crescimento exponencial, enfrentaríamos os seguintes problemas:
* **Controllers Gordos:** Concentrariam a orquestração de múltiplos domínios (utilizadores, pagamentos, faturas), ferindo o Princípio da Responsabilidade Única (SRP).
* **Dificuldade de manutenção e navegação:** O código estaria agrupado pelo "que é" (tecnicamente) e não pelo "que faz" (funcionalidade), aumentando a carga cognitiva para encontrar ficheiros relacionados a uma única *feature*.
* **Acoplamento Elevado:** Diferentes domínios partilhariam o mesmo espaço, facilitando importações diretas e indevidas entre módulos (ex: o domínio de pedidos aceder diretamente à base de dados de utilizadores).
* **Organização Limitada e Crescimento Desordenado:** A ausência de "módulos" independentes faz com que todo o projeto se torne um bloco monolítico e rígido.