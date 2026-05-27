# Comparação Arquitetural

A tabela abaixo ilustra as diferenças estruturais e operacionais entre o sistema antes e depois da refatoração para a Arquitetura Modular.

| Critério | MVC Tradicional (Anterior) | Arquitetura Modular (Atual) |
| :--- | :--- | :--- |
| **Organização** | Técnica (agrupada por camadas: Model, View, Controller). | Orientada ao Domínio (agrupada por negócio: Orders, Auth, Products). |
| **Escalabilidade** | Baixa. A adição de novas funcionalidades inflaciona as pastas principais. | Alta. Novas funcionalidades são acopladas como novos módulos independentes. |
| **Acoplamento** | Elevado. Módulos distintos cruzam chamadas facilmente. | Baixo. Cada módulo encapsula as suas próprias regras e entidades. |
| **Reutilização** | Difícil. Regras e serviços estão dispersos pelo sistema. | Elevada. Os módulos (ou o código em `shared/`) podem ser reutilizados facilmente. |
| **Facilidade de manutenção** | Moderada a baixa. Requer saltar entre diretórios distantes. | Elevada. Todo o contexto de uma funcionalidade reside na mesma pasta. |
| **Separação de responsabilidades** | Foca apenas em separar a interface dos dados (Frontend vs Backend). | Foca na independência total entre os diferentes contextos do negócio. |
| **Facilidade de navegação** | Confusa em projetos grandes, devido à quantidade de ficheiros por pasta. | Excelente e muito intuitiva, seguindo a lógica do negócio. |