# Refatoração: MVC para Arquitetura Modular

Este Pull Request (PR) consolida a refatoração completa do sistema de gestão de pedidos, transitando de uma arquitetura baseada em camadas técnicas (MVC Monolítico) para uma **Arquitetura Modular (Orientada a Domínios)**.

## Melhorias Obtidas
A transição para a arquitetura modular permitiu:
* Reorganizar o projeto pelas suas áreas de negócio (`auth`, `orders`, `products`, `payments`).
* Extrair lógicas transversais (como padrões e utilitários) para um diretório partilhado (`/shared`), garantindo a política de D.R.Y (Don't Repeat Yourself).
* Preparar o terreno para uma futura transição para microsserviços.

## Decisões Arquiteturais e Padrões
* **Fronteiras de Contexto:** Cada módulo passou a ser dono exclusivo dos seus controladores, serviços, repositórios e entidades.
* **Middleware Global:** Foi adicionado um middleware para controlo de acesso (auth) na pasta `shared`.
* **Padrões de Projeto:** Mantivemos e distribuímos corretamente o `Service Pattern`, `Repository Pattern`, `Factory` e `Singleton` pelos respetivos módulos.

## Problemas Encontrados e Dificuldades
* **Dificuldade da Migração:** Desentrelaçar os ficheiros antigos exigiu uma verificação atenta de importações partidas (broken imports), uma vez que a movimentação de `models/pedido.py` para `modules/orders/entities/pedido.py` afetou várias dependências no sistema.
* **Redundância Inicial:** Criar a estrutura completa (4 subpastas por cada módulo) num sistema que ainda tem poucas entidades gera a sensação de um "over-engineering" temporário, contudo, o benefício a longo prazo compensa este esforço.