# Padrões de Projeto e Proposta de Arquitetura

> **Partes 4, 8 e 9 da Atividade**

---

## Parte 4 – Padrões de Projeto

### O sistema aparenta utilizar padrões?

De forma **implícita e informal**. Não há evidência de padrões arquiteturais formais implementados conscientemente. No entanto, alguns conceitos emergem naturalmente da estrutura observada — como a separação entre categorias e produtos, que remete à ideia de hierarquia e agrupamento presente em padrões como Composite.

### Onde poderiam existir Factory, Singleton e MVC?

#### MVC (Model-View-Controller)

Atualmente o padrão MVC **não é aplicado claramente**. A lógica de apresentação, negócio e dados está misturada. Poderia ser introduzido da seguinte forma:

- **Model:** Classes `Produto`, `Pedido`, `Categoria`, `Carrinho`
- **View:** Templates HTML separados para cada página (lista de produtos, detalhe, carrinho, finalização)
- **Controller:** Classes responsáveis por receber a requisição, chamar o Model e retornar a View correta — ex: `ProdutoController`, `CarrinhoController`, `PedidoController`

#### Factory

Poderia ser aplicado na **criação de objetos `Produto`**, pois o sistema possui múltiplos tipos com comportamentos diferentes (pizza tem tamanho, hambúrguer tem tipo de carne, bebida não tem adicional). Uma `ProdutoFactory` centralizaria essa lógica:

```php
class ProdutoFactory {
    public static function criar(string $tipo, array $dados): Produto {
        return match($tipo) {
            'pizza'      => new Pizza($dados),
            'hamburguer' => new Hamburguer($dados),
            'bebida'     => new Bebida($dados),
            default      => new Produto($dados),
        };
    }
}
```

Isso evita que o código cliente precise conhecer qual classe concreta instanciar.

#### Singleton

Poderia ser aplicado em dois pontos críticos:

1. **Conexão com o banco de dados** – garantindo que apenas uma instância de conexão exista por requisição, evitando múltiplas conexões desnecessárias.
2. **Gerenciamento do carrinho** – garantindo que exista apenas uma instância do carrinho por sessão de usuário.

```php
class Carrinho {
    private static ?Carrinho $instancia = null;

    private function __construct() {}

    public static function getInstance(): Carrinho {
        if (self::$instancia === null) {
            self::$instancia = new Carrinho();
        }
        return self::$instancia;
    }
}
```

---

## Parte 8 – Proposta de Arquitetura

### Organização em Camadas com MVC

A proposta é migrar o sistema para uma arquitetura **MVC em camadas**, separando claramente as responsabilidades:

```
┌─────────────────────────────────────────────────┐
│              CAMADA DE APRESENTAÇÃO              │
│         (View – Templates HTML/CSS/JS)           │
│  Renderiza o conteúdo; não contém lógica         │
├─────────────────────────────────────────────────┤
│              CAMADA DE CONTROLE                  │
│    (Controller – Recebe e roteia requisições)    │
│  ProdutoController, CarrinhoController,          │
│  PedidoController                                │
├─────────────────────────────────────────────────┤
│            CAMADA DE NEGÓCIO                     │
│        (Service – Regras de negócio)             │
│  ProdutoService, PedidoService, ComboService     │
├─────────────────────────────────────────────────┤
│            CAMADA DE DADOS                       │
│     (Repository – Acesso ao banco de dados)      │
│  ProdutoRepository, PedidoRepository             │
├─────────────────────────────────────────────────┤
│              BANCO DE DADOS                      │
│             (MySQL / MariaDB)                    │
└─────────────────────────────────────────────────┘
```

### Componentes Principais

| Componente | Responsabilidade |
|---|---|
| `ProdutoController` | Recebe requisição de listagem/detalhe de produto e retorna a View correta |
| `CarrinhoController` | Gerencia adição, remoção e atualização de itens no carrinho |
| `PedidoController` | Processa a finalização do pedido |
| `ProdutoService` | Aplica regras de negócio: validar combo, calcular preço com adicional |
| `PedidoService` | Valida o pedido antes de salvar (mínimo de itens, campos obrigatórios) |
| `ProdutoRepository` | Busca produtos por categoria, por ID, com filtros |
| `PedidoRepository` | Persiste e consulta pedidos no banco de dados |

### Separação de Responsabilidades

- A **View** nunca acessa o banco de dados diretamente
- O **Controller** nunca contém regras de negócio
- O **Service** não sabe como os dados são armazenados
- O **Repository** não conhece as regras de negócio

---

## Parte 9 – Aplicação de Padrões de Projeto

### Factory – ProdutoFactory

**Problema a resolver:** O sistema tem múltiplos tipos de produto com comportamentos distintos. Sem Factory, o código cliente precisa decidir qual classe instanciar, gerando acoplamento.

**Aplicação:** A `ProdutoFactory` recebe o tipo do produto e retorna o objeto correto, sem que o chamador precise conhecer as classes concretas.

```php
// Sem Factory (problemático):
if ($tipo === 'pizza') {
    $produto = new Pizza($dados);
} elseif ($tipo === 'hamburguer') {
    $produto = new Hamburguer($dados);
}

// Com Factory (limpo):
$produto = ProdutoFactory::criar($tipo, $dados);
```

**Benefício:** Ao adicionar um novo tipo de produto (ex: `Sobremesa`), basta criar a nova classe e adicionar uma linha na Factory — o restante do sistema não muda.

---

### Singleton – Carrinho e ConexaoDB

**Problema a resolver:** Sem controle, múltiplas partes do código poderiam criar instâncias diferentes do carrinho ou da conexão com o banco, causando inconsistências ou desperdício de recursos.

**Aplicação no Carrinho:**

```php
class Carrinho {
    private static ?Carrinho $instancia = null;
    private array $itens = [];

    private function __construct() {}

    public static function getInstance(): Carrinho {
        if (self::$instancia === null) {
            self::$instancia = new Carrinho();
        }
        return self::$instancia;
    }

    public function adicionar(ItemCarrinho $item): void {
        $this->itens[] = $item;
    }

    public function calcularTotal(): float {
        return array_sum(array_map(fn($i) => $i->calcularSubtotal(), $this->itens));
    }
}
```

**Benefício:** Garante que todos os pontos do sistema que acessam o carrinho estão manipulando o mesmo objeto, evitando estados inconsistentes entre páginas.
