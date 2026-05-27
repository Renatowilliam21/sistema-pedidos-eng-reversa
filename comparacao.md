# Tabela Comparativa: MVC Tradicional vs Arquitetura Modular

| Critério | MVC Tradicional | Arquitetura Modular |
| :--- | :--- | :--- |
| **Organização** | Por tipo de componente técnico. | Por Domínio de Negócio (Contexto Delimitado). |
| **Escalabilidade** | Baixa. Conforme cresce, vira um monólito acoplado. | Altíssima. É possível transformar módulos em microserviços futuramente. |
| **Acoplamento** | Alto. Alterações em um Model quebram múltiplos controllers. | Baixo. Módulos são caixas pretas isoladas. |
| **Reutilização** | Difícil, pois as classes dependem de contextos globais. | Fácil. O módulo de `products` pode ser levado para outro app inteiro. |
| **Facilidade de Manutenção** | Complexa devido ao rastreamento de arquivos espalhados. | Direta. Tudo sobre pedidos está na pasta `/orders`. |
| **Facilidade de Navegação** | Ruim em projetos grandes. | Excelente. Escopo visual reduzido por domínio. |