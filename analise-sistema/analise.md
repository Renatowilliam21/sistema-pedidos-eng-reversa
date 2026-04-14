# Análise do Sistema Real

> Sistema analisado: [Tropykaly Pizzas e Lanches](https://tropykalypizzaselanches.com.br/)  
> Método: Engenharia reversa baseada no comportamento (sem acesso ao código-fonte)

---

## Parte 1 – Análise do Sistema

### 1. Objetivo do sistema

O sistema é um **cardápio digital com funcionalidade de pedidos online** para a pizzaria/lanchonete Tropykaly Pizzas e Lanches, localizada em Boa Viagem - CE. Seu objetivo principal é permitir que clientes visualizem o cardápio, montem seus pedidos com adicionais e combos, e os finalizem sem necessidade de contato telefônico.

### 2. Funcionalidades identificadas

- Exibição de banner rotativo com promoções e destaques  
- Navegação por categorias de produtos (aba Produtos, Combos e Promoções)  
- Listagem de produtos com foto, nome, descrição e preço  
- Página individual de produto com opção de adicionar combo  
- Adição de itens ao carrinho (visível em todas as páginas)  
- Visualização e edição do carrinho  
- Campo de observações no pedido  
- Finalização do pedido (`/finalizar`)  
- Painel administrativo restrito (`/sistema`)  

### 3. Como o usuário interage com o sistema

O fluxo de interação é linear e intuitivo:

1. O usuário acessa a página principal e visualiza o cardápio organizado por categorias
2. Clica em uma categoria ou produto de destaque
3. Na página do produto, pode adicionar um combo opcional
4. O item é adicionado ao carrinho, visível no cabeçalho
5. O usuário acessa o carrinho, revisa os itens e adiciona observações
6. Clica em "Finalizar Pedido" para concluir

### 4. Organização dos produtos

Os produtos estão organizados em **categorias hierárquicas**, acessíveis pela página inicial:

| Categoria | Descrição |
|---|---|
| Pizza P / M / G / GG | Pizzas separadas por tamanho |
| Esfirras Salgadas | Variedades de esfirras salgadas |
| Esfirras Doces | Variedades de esfirras doces |
| Sanduíches | Opções de sanduíches |
| Hambúrgueres Artesanais | Burgers bovinos, suínos e de frango |
| Sucos | Variedades de sucos naturais |
| Vitaminas | Vitaminas diversas |
| Refrigerantes | Bebidas geladas |
| Porções | Porções para compartilhar |

Há ainda abas separadas para **Combos** (pacotes de produtos) e **Promoções** (ofertas temporárias).

---

## Parte 2 – Análise de Arquitetura

### Tipo de arquitetura

O sistema apresenta arquitetura **monolítica**, com renderização **server-side (SSR)** em PHP. Toda a lógica é processada no servidor e o HTML é entregue pronto ao navegador. Não há evidência de API REST separada ou arquitetura cliente-servidor desacoplada.

**Evidências observadas:**
- URLs semânticas como `/categoria-sabores-pizza-p` e `/adicionais-artesanais-classic-burguer` sugerem roteamento PHP sem framework moderno
- Imagens hospedadas em `/sistema/painel/images/`, indicando que o painel admin e o frontend compartilham o mesmo servidor de arquivos
- Ausência de requisições AJAX visíveis na navegação básica
- Link direto para o painel administrativo no rodapé da página pública

### Possível divisão em camadas

Apesar de não haver separação formal, é possível inferir a seguinte estrutura lógica:

| Camada | Descrição | Evidência |
|---|---|---|
| **Apresentação** | HTML/CSS renderizado pelo servidor, Bootstrap para responsividade | Estrutura visual do site |
| **Lógica de Negócio** | Provavelmente embutida nos arquivos PHP das rotas | Cálculo do carrinho, adicionais e combos |
| **Dados** | Banco de dados relacional (possivelmente MySQL), acessado diretamente pelo PHP | Estrutura de URLs e dados dinâmicos como preços e fotos |

### Existência de separação de responsabilidades

A separação de responsabilidades é **baixa**. Os indícios apontam para uma arquitetura onde apresentação, lógica de negócio e acesso a dados estão misturados nos mesmos arquivos PHP — padrão comum em sistemas desenvolvidos sem framework estruturado.

**Justificativa:** O caminho `/sistema/painel/images/` para as imagens dos produtos indica que o admin e o frontend compartilham diretórios físicos. Isso é uma violação clara da separação de responsabilidades, pois a interface do cliente não deveria ter dependência direta de estruturas do painel administrativo.

---

## Parte 3 – Análise de Design

### Coesão

**Coesão: Média-baixa**

As páginas parecem acumular múltiplas responsabilidades simultaneamente: renderizar HTML, calcular subtotais do carrinho, consultar o banco de dados e controlar o estado da sessão. Isso reduz a coesão dos módulos, pois cada arquivo PHP provavelmente lida com mais de uma preocupação.

Em um sistema coeso, cada módulo teria uma única responsabilidade bem definida — por exemplo, uma classe apenas para gerenciar o carrinho e outra apenas para renderizar produtos.

### Acoplamento

**Acoplamento: Alto**

O sistema apresenta forte interdependência entre seus componentes:

- O carrinho aparece no cabeçalho de **todas** as páginas, indicando que o estado da sessão está acoplado à camada de apresentação
- A página de produto já carrega a lógica de adicionais e combos, misturando exibição com regras de negócio
- As imagens do painel administrativo são referenciadas diretamente pelo frontend (`/sistema/painel/images/`), criando acoplamento físico entre as duas interfaces

### Separação de responsabilidades

**Separação: Deficiente**

Não há evidência de separação clara entre:
- Apresentação (templates HTML) e lógica de negócio
- Regras de aplicação e acesso a dados
- Interface pública e painel administrativo

A ausência de uma arquitetura em camadas formais, como MVC, resulta em código difícil de manter e evoluir. Qualquer alteração em uma funcionalidade pode impactar outras partes não relacionadas do sistema.
