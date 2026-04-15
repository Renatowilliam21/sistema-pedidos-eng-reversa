## Parte 1 – Compreensão do Sistema

### 1.1 Qual é o objetivo do sistema?

O sistema tem como objetivo gerenciar pedidos de uma lanchonete/pastelaria (a "Pastelaria do Zé"), permitindo que o atendente registre os itens consumidos pelo cliente, calcule o valor total com descontos progressivos e taxa de serviço, e finalize o pedido com o valor a ser cobrado. Trata-se de um sistema de frente de caixa (PDV simplificado) que funciona inteiramente no navegador, sem necessidade de servidor ou banco de dados externo.

### 1.2 Quais são suas principais funcionalidades?

- Seleção de produto do cardápio (Pastel, Caldo, Refrigerante, Suco) com preços fixos
- Adição de itens ao pedido com quantidade informada pelo usuário
- Exibição em tempo real da lista de itens com subtotal de cada um
- Cálculo e exibição do total acumulado do pedido
- Finalização do pedido com desconto automático (10% acima de R$50; 20% acima de R$100) e taxa de serviço de 5%
- Remoção do último item adicionado (função `removerUltimo` existe no JS, mas sem botão na interface)
- Limpeza completa do pedido após finalização
- Persistência temporária do total no `localStorage` do navegador

### 1.3 Como o usuário interage com o sistema?

A interação ocorre por meio de uma interface web simples, acessível via navegador. O usuário:

1. Seleciona o produto em um menu `<select>`
2. Informa a quantidade em um campo numérico
3. Clica em **Adicionar** para inserir o item na lista
4. Clica em **Finalizar Pedido** para concluir — o sistema exibe o total com descontos e taxa em um `alert` e limpa o pedido

Não há login, autenticação, cadastro de clientes ou histórico persistente. Toda a interação é efêmera e ocorre em uma única tela.

---

## Parte 2 – Identificação de Elementos

### 2.1 Quais são as principais funções do sistema?

| Função | Responsabilidade | Problema identificado |
|---|---|---|
| `adicionar()` | Lê DOM, define preço, calcula subtotal, insere item | Múltiplas responsabilidades misturadas |
| `atualizarLista()` | Recria HTML da lista E recalcula o total | Renderização misturada com cálculo |
| `salvarTotal()` | Persiste o total no localStorage | Responsabilidade isolada sem camada de repositório |
| `finalizar()` | Aplica desconto/taxa, exibe total, limpa pedido | Regras de negócio embutidas diretamente |
| `limparTudo()` | Zera dados e limpa o DOM | Mistura reset de estado com manipulação de interface |
| `removerUltimo()` | Remove o último item do array | Sem botão no HTML — inacessível pelo usuário |
| `calcularTotal()` | Soma os subtotais dos itens | Duplicação: mesma lógica já existe em `atualizarLista()`; **nunca é chamada** |

### 2.2 Quais dados são manipulados?

- `itens`: array global com objetos `{produto, qtd, subtotal}` de cada item do pedido
- `total`: variável global numérica que acumula o valor total
- `produto`: string com o nome do produto selecionado no `<select>`
- `qtd`: número inteiro informado pelo usuário
- `preco`: valor unitário do produto, definido por `if-else` no código
- `subtotal`: resultado de `preco × qtd` para cada item
- `desconto`: calculado com base em faixas do total (>R$50 → 10%; >R$100 → 20%)
- `taxa`: 5% sobre o total bruto
- `totalFinal`: `total - desconto + taxa`, exibido no `alert` de finalização
- `localStorage`: chaves `'total'` e `'ultimoPedido'` persistidas no navegador

## Parte 3 – Arquitetura

### 3.1 O sistema possui arquitetura definida? Justifique.

**Não.** O sistema não possui arquitetura claramente definida. Todo o código reside em um único arquivo JavaScript (`script.js`), com variáveis globais livres, funções soltas e manipulação direta do DOM misturada com lógica de negócio. Não há separação entre camadas, módulos ou responsabilidades. É um código procedural sem estrutura arquitetural intencional.

### 3.2 Ele segue algum padrão (MVC, camadas, etc.)?

Não segue nenhum padrão arquitetural reconhecível. O que existe se aproxima do antipadrão **"Big Ball of Mud"**: código sem organização onde qualquer função acessa e modifica qualquer dado ou elemento da interface diretamente. Não há separação entre:

- **Model** (dados/regras de negócio)
- **View** (interface/DOM)
- **Controller** (coordenação de ações)

Tudo coexiste no mesmo escopo global.

### 3.3 Como você classificaria esse sistema?

O sistema pode ser classificado como uma **aplicação web front-end monolítica e procedural**, com as seguintes características:

- **Arquitetura**: ausente — Big Ball of Mud
- **Paradigma**: procedural — funções soltas operando sobre variáveis globais
- **Camada única**: lógica de negócio, dados, persistência e interface no mesmo escopo
- **Tecnologia**: HTML + CSS + JavaScript puro (vanilla), sem frameworks ou módulos
- **Persistência**: `localStorage`, usado de forma pontual e não estruturada

---

## Parte 4 – Modelagem (Diagrama de Classes UML)

Diagrama de Classes UML proposto para a versão refatorada do sistema:

```
┌──────────────────────────┐
│        Produto           │
├──────────────────────────┤
│ – nome: string           │
│ – preco: number          │
├──────────────────────────┤
│ + getNome(): string      │
│ + getPreco(): number     │
└──────────────────────────┘
           ▲
           │ associação (1..1)
           │
┌──────────────────────────────┐
│         ItemPedido           │
├──────────────────────────────┤
│ – produto: Produto           │
│ – quantidade: number         │
│ – subtotal: number           │
├──────────────────────────────┤
│ + calcularSubtotal(): number │
│ + toString(): string         │
└──────────────────────────────┘
           ▲
           │ agregação (0..*)
           │
┌──────────────────────────────────────────────┐
│            Pedido  «Singleton»               │
├──────────────────────────────────────────────┤
│ – instancia: Pedido  {static}                │
│ – itens: ItemPedido[]                        │
├──────────────────────────────────────────────┤
│ + getInstance(): Pedido  {static}            │
│ + adicionarItem(item: ItemPedido): void      │
│ + removerUltimo(): void                      │
│ + calcularTotal(): number                    │
│ + calcularDesconto(total: number): number    │
│ + calcularTaxa(total: number): number        │
│ + finalizar(): number                        │
│ + limpar(): void                             │
│ + getItens(): ItemPedido[]                   │
└──────────────────────────────────────────────┘

┌────────────────────────────────────────────────┐
│          ProdutoFactory  «Factory»             │
├────────────────────────────────────────────────┤
│ – catalogo: Map<string, number>  {static}      │
├────────────────────────────────────────────────┤
│ + criar(nome: string): Produto  {static}       │
│ + listar(): string[]  {static}                 │
└────────────────────────────────────────────────┘
           │ cria
           ▼
        Produto

┌──────────────────────────────────────────────────┐
│                  PedidoView                      │
├──────────────────────────────────────────────────┤
│ + renderizarLista(itens: ItemPedido[]): void     │
│ + atualizarTotal(valor: number): void            │
│ + obterProdutoSelecionado(): string              │
│ + obterQuantidade(): number                      │
│ + exibirMensagem(msg: string): void              │
│ + limpar(): void                                 │
└──────────────────────────────────────────────────┘
```

**Relacionamentos:**
- `ProdutoFactory` ──cria──> `Produto` (dependência de criação — Factory)
- `Pedido` ◇──agrega──> `ItemPedido` (agregação 0..*)
- `ItemPedido` ──associa──> `Produto` (associação 1..1)
- `Pedido` é Singleton (apenas uma instância ativa no sistema)
- `PedidoView` ──usa──> `Pedido` (dependência de leitura)

---

## Parte 5 – Análise de Problemas

### Coesão

**Problema:** Baixa coesão em praticamente todas as funções. A função `adicionar()` realiza múltiplas tarefas ao mesmo tempo: lê o DOM, valida entrada, define o preço via `if-else`, calcula o subtotal e insere o item no array. Ela deveria ter uma única responsabilidade. O mesmo ocorre em `atualizarLista()`, que recalcula o total E atualiza a interface simultaneamente.

### Acoplamento

**Problema:** Alto acoplamento entre lógica e interface. Todas as funções acessam diretamente elementos do DOM (`document.getElementById`) e variáveis globais (`itens`, `total`). Qualquer renomeação de `id` no HTML quebra o JavaScript. Não há abstração entre camadas — a lógica de negócio está colada à interface.

### Separação de Responsabilidades

**Problema:** Regras de negócio (faixas de desconto, taxa de 5%), manipulação de dados (array `itens`), persistência (`localStorage`) e renderização (DOM) estão todas misturadas nas mesmas funções, sem qualquer separação em camadas ou módulos.

### Duplicação de Código

**Problema:** A lógica de somar os subtotais existe em dois lugares distintos: dentro de `atualizarLista()` e na função `calcularTotal()` — que, além de duplicada, **nunca é chamada** em nenhum ponto do código. O cálculo do total é refeito também dentro de `finalizar()`. Isso viola o princípio DRY (Don't Repeat Yourself).

### Organização Geral

**Problemas identificados:**
- Sem módulos, classes ou namespaces — tudo no escopo global
- Variáveis globais (`itens`, `total`) modificadas livremente por qualquer função
- Preços dos produtos hardcoded com `if-else` em vez de uma estrutura centralizada
- O `return` após o `alert` de validação está **ausente** em `adicionar()`, fazendo o código continuar mesmo com entrada inválida
- A função `removerUltimo()` não tem botão correspondente no HTML — existe no JS mas é completamente inacessível pelo usuário

---

## Parte 6 – Propostas de Melhoria

### Organização em Camadas

O sistema deve ser reorganizado em camadas lógicas separadas em arquivos distintos:

- `model.js` — Classes `Produto`, `ItemPedido`, `Pedido`: dados e regras de negócio
- `factory.js` — `ProdutoFactory`: criação centralizada de produtos
- `view.js` — `PedidoView`: atualização exclusiva do DOM
- `controller.js` — funções que recebem ações do usuário e coordenam Model e View
- `repository.js` — persistência no `localStorage` (para expansão futura)

### Criação de Classes

- **Produto**: encapsula nome e preço, eliminando os `if-else` hardcoded
- **ItemPedido**: encapsula produto + quantidade + subtotal com método `calcularSubtotal()`
- **Pedido (Singleton)**: centraliza o estado do pedido e todas as regras de cálculo em um único objeto controlado
- **ProdutoFactory (Factory)**: centraliza a criação de produtos a partir de um catálogo

### Aplicação de Padrões de Projeto

- **Factory**: `ProdutoFactory.criar('pastel')` retorna um objeto `Produto` já configurado, eliminando os `if-else` espalhados
- **Singleton**: `Pedido.getInstance()` garante que apenas um pedido esteja ativo, evitando estados inconsistentes

### Melhorias no Código

- Substituir `if-else` de preços por um objeto/`Map` de catálogo centralizado
- Adicionar `return` imediato após o `alert` de validação inválida em `adicionar()`
- Separar a renderização do cálculo em funções distintas
- Centralizar o cálculo do total em um único método (`calcularTotal` na classe `Pedido`)
- Adicionar botão "Remover Último" no HTML para tornar a funcionalidade acessível
- Exibir desconto e taxa detalhados antes de confirmar a finalização

---

## Parte 7 – Refatoração

Foram criado novos arquivos

## Parte 8 – Aplicação de Padrões de Projeto

### Factory — `ProdutoFactory`

**Onde foi aplicado:** Na classe `ProdutoFactory`, que centraliza a criação de objetos do tipo `Produto`. No sistema original, os preços estavam espalhados em uma cadeia de `if-else` dentro de `adicionar()`. Com o Factory, basta chamar `ProdutoFactory.criar('pastel')` para obter um objeto `Produto` devidamente configurado.

**Por que foi utilizado:** O Factory elimina a duplicação e o hardcoding de preços em múltiplos lugares do código. Se um novo produto for adicionado ou um preço for alterado, a mudança é feita em um único ponto — o catálogo estático da factory. Isso desacopla o código cliente da lógica de criação de objetos, tornando o sistema mais extensível e fácil de manter.

```javascript
// ANTES — preços hardcoded com if-else:
if (produto == 'pastel')       preco = 5;
if (produto == 'caldo')        preco = 7;
if (produto == 'refrigerante') preco = 4;
if (produto == 'suco')         preco = 6;

// DEPOIS — com Factory, centralizado e extensível:
const produto = ProdutoFactory.criar(nomeProduto);
// → retorna automaticamente new Produto('pastel', 5)
```

### Singleton — `Pedido`

**Onde foi aplicado:** Na classe `Pedido`, com o método estático `getInstance()` que garante que apenas uma instância exista em toda a aplicação. Essa instância é criada na primeira chamada e reutilizada em todas as chamadas subsequentes pelo Controller.

**Por que foi utilizado:** No sistema original, o estado do pedido era mantido em variáveis globais soltas (`itens` e `total`), modificáveis por qualquer função de forma imprevisível. O Singleton encapsula esse estado em um único objeto controlado com métodos bem definidos, garantindo consistência e evitando estados corrompidos durante o ciclo de vida do pedido.

```javascript
// ANTES — variáveis globais soltas, qualquer função pode modificar:
let itens = [];
let total = 0;

// DEPOIS — com Singleton, estado encapsulado e controlado:
class Pedido {
  static instancia = null;

  static getInstance() {
    if (!Pedido.instancia) Pedido.instancia = new Pedido();
    return Pedido.instancia;
  }
}

// Uso no Controller — sempre a mesma instância:
const pedido = Pedido.getInstance();
pedido.adicionarItem(item);  // seguro
pedido.calcularTotal();      // seguro
```
