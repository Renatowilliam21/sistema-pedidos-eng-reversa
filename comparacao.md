# Paralelo entre os Modelos

Abaixo, apresento um quadro comparando as características da plataforma comercial estudada (Tropykaly) em relação ao escopo do projeto pedagógico desenvolvido nas aulas:

| Característica | Plataforma Tropykaly (Uso Real) | Projeto Acadêmico |
| :--- | :--- | :--- |
| **Padrão Arquitetural** | Cliente/Servidor (camadas bem definidas) | Estrutura monolítica e simplificada |
| **Nível de Coesão** | Alto (responsabilidades estritamente divididas) | Baixo (lógicas de diferentes domínios juntas) |
| **Grau de Acoplamento** | Controlado (interação via requisições/Controllers) | Elevado (regras de negócio acopladas às telas) |
| **Manutenibilidade** | Estrutura limpa e escalável | Código desorganizado |
| **Capacidade de Expansão**| Altamente flexível para novos recursos | Difícil manutenção (engessado) |

## O Grande Diferencial
O ponto de divergência mais notável é a **segregação de responsabilidades**. A plataforma real demonstra grande capacidade de escala: inserir uma aba de promoções não comprometerá o design, evidenciando o isolamento entre o *Model* (dados) e a *View* (tela). Por outro lado, o sistema acadêmico sofria de alto acoplamento, onde qualquer alteração estética na interface poderia acidentalmente quebrar a lógica de finalização do pedido.
