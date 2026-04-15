# Análise do Sistema de Pedidos – Pastelaria do Zé

---

## Parte 1 – Compreensão do Sistema

### 1. Qual é o objetivo do sistema?
O sistema é um gerenciador de pedidos para uma pastelaria ("Pastelaria do Zé"). Ele permite que o operador selecione produtos de um cardápio, defina a quantidade desejada e gere um pedido com cálculo automático de total, desconto e taxa de serviço.

### 2. Quais são suas principais funcionalidades?
- Seleção de produtos (Pastel, Caldo, Refrigerante, Suco) com preços fixos
- Definição da quantidade de cada produto
- Adição de itens ao pedido
- Exibição da lista de itens e do total parcial
- Cálculo de desconto progressivo (10% acima de R$50, 20% acima de R$100)
- Cálculo de taxa de serviço (5%)
- Finalização do pedido com valor final
- Persistência do total no `localStorage`

### 3. Como o usuário interage com o sistema?
O usuário interage por meio de uma interface web com:
- Um `<select>` para escolher o produto
- Um `<input type="number">` para definir a quantidade
- Um botão **Adicionar** para incluir o item no pedido
- Um botão **Finalizar Pedido** para calcular e exibir o valor final

---

## Parte 2 – Identificação de Elementos

### 1. Quais são as principais funções do sistema (código original)?
| Função | Responsabilidade |
|---|---|
| `adicionar()` | Lê inputs, calcula preço, cria item e atualiza lista |
| `atualizarLista()` | Renderiza a lista de itens e recalcula o total |
| `salvarTotal()` | Salva o total no localStorage |
| `finalizar()` | Calcula desconto, taxa e total final |
| `limparTudo()` | Reseta o estado do sistema |
| `removerUltimo()` | Remove o último item adicionado |
| `calcularTotal()` | Calcula soma dos subtotais (duplicada) |

### 2. Quais dados são manipulados?
- **Produto**: nome (string) e preço (number)
- **Item do pedido**: produto, quantidade e subtotal
- **Pedido**: coleção de itens, total, desconto, taxa
- **Persistência**: total e último pedido no `localStorage`

### 3. Quais entidades podem ser extraídas?
- **Produto** – representa um item do cardápio (nome, preço)
- **ItemPedido** – representa um produto com quantidade em um pedido (produto, quantidade, subtotal)
- **Pedido** – agrega itens e é responsável por cálculos de total, desconto e taxa

---

## Parte 3 – Arquitetura

### 1. O sistema original possui arquitetura definida? Justifique.
**Não.** O sistema original consiste em um único arquivo `script.js` com funções globais que misturam lógica de negócio (cálculos de preço, desconto), manipulação de DOM (renderização da lista) e persistência de dados (`localStorage`). Não há separação de camadas ou módulos.

### 2. Ele segue algum padrão (MVC, camadas, etc.)?
**Não segue nenhum padrão reconhecido.** Todas as responsabilidades estão concentradas nas funções globais do script: a apresentação (view), a lógica de negócio (model) e o controle de fluxo (controller) estão acoplados no mesmo arquivo.

### 3. Como você classificaria esse sistema?
É um sistema **monolítico procedural** — todo o código reside em um único script sem modularização, encapsulamento ou separação de responsabilidades. Pode ser classificado como uma aplicação de página única (SPA) simples sem framework.

---

## Parte 4 – Modelagem (Diagrama de Classes UML)

```
┌───────────────────────────┐
│         Produto           │
├───────────────────────────┤
│ - nome: string            │
│ - preco: number           │
├───────────────────────────┤
│ + getNome(): string       │
│ + getPreco(): number      │
└───────────────────────────┘
            ▲
            │ usa
┌───────────────────────────┐
│       ItemPedido          │
├───────────────────────────┤
│ - produto: Produto        │
│ - quantidade: number      │
├───────────────────────────┤
│ + getSubtotal(): number   │
│ + toString(): string      │
└───────────────────────────┘
            ▲
            │ 1..*
┌───────────────────────────┐
│         Pedido            │
├───────────────────────────┤
│ - itens: ItemPedido[]     │
├───────────────────────────┤
│ + adicionarItem(item)     │
│ + getItens(): ItemPedido[]│
│ + calcularTotal(): number │
│ + calcularDesconto(): num │
│ + calcularTaxa(): number  │
│ + finalizar(): number     │
│ + limpar(): void          │
└───────────────────────────┘
            ▲
            │ gerencia
┌───────────────────────────┐
│   PedidoManager           │
│   «Singleton»             │
├───────────────────────────┤
│ - instancia: PedidoManager│
│ - pedidoAtual: Pedido     │
├───────────────────────────┤
│ + getInstance(): self     │
│ + getPedido(): Pedido     │
│ + novoPedido(): void      │
│ + salvar(): void          │
└───────────────────────────┘

┌───────────────────────────┐
│   ProdutoFactory          │
│   «Factory»               │
├───────────────────────────┤
│ - catalogo: object        │
├───────────────────────────┤
│ + criar(tipo): Produto    │
└───────────────────────────┘
```

### Relacionamentos
- `ItemPedido` **depende de** `Produto` (composição)
- `Pedido` **contém** `ItemPedido[]` (agregação 1..*)
- `PedidoManager` **gerencia** `Pedido` (associação)
- `ProdutoFactory` **cria** `Produto` (dependência de criação)

---

## Parte 5 – Análise de Problemas (código original)

### Coesão
- **Baixa coesão**: a função `adicionar()` faz múltiplas coisas — lê o DOM, decide o preço com base no tipo, calcula o subtotal, cria o objeto e atualiza a lista. Cada uma dessas deveria ser uma responsabilidade separada.
- A função `atualizarLista()` mistura renderização com cálculo de total e persistência (`salvarTotal()`).

### Acoplamento
- **Alto acoplamento com o DOM**: todas as funções acessam diretamente `document.getElementById()`, tornando impossível testar a lógica de negócio isoladamente.
- **Alto acoplamento com `localStorage`**: a persistência está misturada com a lógica de apresentação.

### Separação de responsabilidades
- **Inexistente**: lógica de negócio (preços, descontos), interface (DOM) e persistência (localStorage) estão todas no mesmo escopo, sem nenhuma separação.

### Duplicação de código
- A função `calcularTotal()` duplica exatamente o que `atualizarLista()` já faz internamente (somar os subtotais dos itens).
- A variável global `total` é recalculada em `atualizarLista()` mas também existe uma função separada para o mesmo cálculo.

### Organização geral
- Variáveis globais (`itens`, `total`) acessíveis por todas as funções
- Nenhuma modularização — tudo em um único arquivo
- Falta de validação consistente (ex: `adicionar()` não retorna após validação falhar, continua adicionando o item mesmo com quantidade inválida)
- Uso de `==` ao invés de `===`

---

## Parte 6 – Propostas de Melhoria

### Organização em camadas
Separar o código em 3 camadas:
1. **Entidades (Models)** – `src/entities/models.js`: classes `Produto`, `ItemPedido`, `Pedido`
2. **Serviços (Services)** – `src/services/services.js`: `ProdutoFactory`, `PedidoManager`
3. **Interface (UI)** – `src/main.js`: manipulação de DOM e event listeners

### Criação de classes
- **Produto**: encapsula nome e preço com campos privados
- **ItemPedido**: encapsula produto e quantidade, calcula subtotal
- **Pedido**: agrega itens, centraliza cálculos de total/desconto/taxa

### Aplicação de padrões de projeto
- **Factory** (`ProdutoFactory`): centraliza a criação de produtos a partir de um catálogo, eliminando os `if` encadeados no código original
- **Singleton** (`PedidoManager`): garante uma única instância do gerenciador de pedidos na aplicação

### Melhorias no código
- Usar `const`/`let` ao invés de `var`
- Validação com `return` antecipado
- Encapsulamento com campos privados (`#`)
- Remoção de duplicação (`calcularTotal` centralizado na classe `Pedido`)
- Uso de ES Modules (`import`/`export`)
- Event listeners ao invés de `onclick` inline

---

## Parte 7 – Refatoração (Resumo)

A refatoração aplicada reorganizou o código original da seguinte forma:

| Antes | Depois |
|---|---|
| `script.js` (arquivo único) | `src/entities/models.js` + `src/services/services.js` + `src/main.js` |
| Variáveis globais `itens` e `total` | Encapsuladas dentro da classe `Pedido` com campos privados |
| `if/else` para preços em `adicionar()` | Catálogo centralizado no `ProdutoFactory` |
| `atualizarLista()` calcula + renderiza + salva | Cálculo na classe `Pedido`, renderização em `atualizarUI()`, persistência no `PedidoManager` |
| `calcularTotal()` duplicada | Método único `Pedido.calcularTotal()` usando `reduce` |
| `onclick` inline no HTML | Event listeners com `addEventListener` |

---

## Parte 8 – Aplicação de Padrões de Projeto

### Factory – `ProdutoFactory`
**Arquivo**: `src/services/services.js`

**Onde foi aplicado**: na criação de objetos `Produto`.

**Como funciona**: a classe `ProdutoFactory` possui um catálogo privado (`#catalogo`) contendo os dados de cada produto (nome e preço). O método estático `criar(tipo)` recebe o tipo do produto como string e retorna uma nova instância de `Produto` com os dados corretos.

**Por que foi utilizado**:
- Elimina os `if` encadeados que existiam na função `adicionar()` do código original
- Centraliza o conhecimento sobre tipos de produto e seus preços em um único local
- Facilita a adição de novos produtos sem modificar a lógica de criação
- Separa a responsabilidade de criação de objetos da lógica de interface

```javascript
// Uso:
const produto = ProdutoFactory.criar("pastel");
// Retorna: Produto { nome: "Pastel", preco: 5 }
```

### Singleton – `PedidoManager`
**Arquivo**: `src/services/services.js`

**Onde foi aplicado**: no gerenciamento do pedido atual do sistema.

**Como funciona**: a classe `PedidoManager` possui um campo estático privado `#instancia` inicializado como `null`. O método `getInstance()` verifica se já existe uma instância; se não, cria uma nova. Todas as chamadas subsequentes retornam a mesma instância.

**Por que foi utilizado**:
- Garante que exista apenas um pedido ativo por vez, evitando inconsistências
- Substitui as variáveis globais `itens` e `total` do código original
- Centraliza a persistência (`localStorage`) em um único ponto
- Fornece um ponto de acesso global controlado ao estado do pedido

```javascript
// Uso:
const manager = PedidoManager.getInstance(); // sempre a mesma instância
manager.getPedido().adicionarItem(item);
manager.salvar();
```

---

## Estrutura Final do Projeto

```
sistema-pedidos-eng-reversa/
├── index.html              ← Interface do usuário
├── style.css               ← Estilos visuais
├── src/
│   ├── main.js             ← Camada de interface (event listeners, DOM)
│   ├── entities/
│   │   └── models.js       ← Camada de entidades (Produto, ItemPedido, Pedido)
│   └── services/
│       └── services.js     ← Camada de serviços (ProdutoFactory, PedidoManager)
├── ANALISE.md              ← Este documento
└── README.md               ← Descrição do projeto
```
