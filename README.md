# Sistema de Pedidos - Engenharia Reversa

## 🎓 Disciplina
Arquitetura de Sistemas  
**Professor:** Dr. Renato William Rodrigues de Souza  
**Curso:** Análise e Desenvolvimento de Sistemas  
**Instituição:** IFCE - Campus Boa Viagem  

---

## Sobre o Projeto

Este projeto consiste em um sistema de pedidos simples desenvolvido em HTML, CSS e JavaScript.

A versão atual foi refatorada com foco em:

- organização em camadas (Interface, Negócio e Dados)
- separação de responsabilidades via Controller
- uso de classes para entidades de domínio
- aplicação de padrões de projeto Factory e Singleton
- transparência de cálculo (subtotal, desconto, taxa e total final)

---

## Arquitetura aplicada

### 1) Camada de Interface (DOM)
Responsável por capturar eventos da tela e atualizar a visualização.

### 2) Camada de Negócio
Responsável pelas regras de cálculo de desconto, taxa e finalização de pedidos.

### 3) Camada de Dados
Responsável pelas entidades (`Pedido`, `ItemPedido`), catálogo de preços e persistência.

---

## Padrões de Projeto aplicados

### Factory
A classe `EntidadeFactory` centraliza a criação de objetos (`Pedido` e `ItemPedido`).

### Singleton
Foram aplicados singletons para:

- `CatalogoProdutosSingleton` (fonte única de preços)
- `PersistenciaPedidosSingleton` (instância única de acesso ao `localStorage`)

---

## Como executar o projeto

1. Baixe ou clone o repositório
2. Abra o arquivo `index.html` no navegador

---

## 💻 Como clonar o repositório

```bash
git clone LINK_DO_REPOSITORIO
```
