# Comparação entre Sistema Real e Sistema Didático

## Parte 5 – Comparação com Sistema Didático

| Critério | Sistema Real (Tropykaly) | Sistema Didático |
|:---|:---|:---|
| **Arquitetura** | Cliente-Servidor distribuída, provavelmente baseada em nuvem | Monolítico, executado localmente |
| **Coesão** | Alta, componentes com responsabilidades bem definidas | Baixa, lógicas misturadas em um mesmo arquivo |
| **Acoplamento** | Baixo, comunicação via API entre frontend e backend | Alto, dependência direta entre camadas |
| **Organização** | Provável uso de padrões como MVC e REST | Estrutura procedural sem padrão definido |
| **Flexibilidade** | Alta, fácil de escalar e adicionar funcionalidades | Baixa, qualquer alteração pode causar quebras |

**Explicação das principais diferenças:**

O sistema real da Tropykaly foi construído para operar em produção, suportando múltiplos usuários simultâneos com segurança e estabilidade. Isso exige uma arquitetura bem estruturada, com separação clara entre frontend e backend e uso de padrões consolidados.

O sistema didático, por sua vez, foi desenvolvido com foco no aprendizado de conceitos básicos, priorizando simplicidade em vez de escalabilidade. As responsabilidades estão concentradas em poucos arquivos, o que facilita o entendimento inicial mas dificulta a manutenção e evolução do sistema.

A principal diferença está na maturidade arquitetural: enquanto o sistema real é preparado para crescer e se adaptar, o sistema didático serve como ponto de partida para compreender os problemas que motivam o uso de boas práticas.

## Parte 10 – Reflexão Crítica

**1. É possível modelar um sistema sem ver o código?**

Sim. Por meio da engenharia reversa comportamental, é possível mapear as entradas, saídas, fluxos de navegação e regras de negócio visíveis na interface para inferir a estrutura interna do sistema. Observar como o sistema se comporta já revela muito sobre como ele foi projetado.

**2. Qual a importância da modelagem?**

A modelagem permite criar uma representação abstrata do sistema, facilitando a comunicação entre desenvolvedores, a identificação de problemas estruturais e o planejamento de melhorias. Ela é essencial para documentar sistemas existentes e guiar o desenvolvimento de novos.

**3. Diferença entre sistema real e didático?**

Sistemas reais precisam lidar com segurança, performance, escalabilidade e manutenção contínua, exigindo arquiteturas robustas e uso de padrões de projeto. Sistemas didáticos são ambientes controlados, criados para ilustrar conceitos específicos, sem a preocupação com os desafios de um ambiente de produção.
