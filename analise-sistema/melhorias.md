# Problemas Identificados e Melhorias Propostas

## Parte 7 – Problemas Identificados

Ao analisar o comportamento do sistema da Tropykaly, foram identificados os seguintes problemas e riscos:

**Limitações de arquitetura:**
Caso o sistema seja construído de forma monolítica, um pico de acessos em horários de grande movimento (como fins de semana à noite) pode sobrecarregar o servidor e derrubar simultaneamente tanto o cardápio quanto o processo de finalização de pedidos, impactando diretamente a experiência do cliente e as vendas do estabelecimento.

**Alto acoplamento entre interface e backend:**
Se a interface estiver fortemente atrelada ao backend atual, qualquer evolução do sistema — como o lançamento de um aplicativo nativo para Android ou iOS — exigirá uma reestruturação significativa, aumentando o custo e o tempo de desenvolvimento.

**Regras de negócio no frontend:**
Sistemas desenvolvidos rapidamente tendem a concentrar regras de negócio, como cálculo de taxas e descontos, diretamente no JavaScript do frontend. Isso gera duplicação de código, dificulta a manutenção e representa um risco de segurança, pois essas regras podem ser manipuladas pelo usuário.

**Ausência de autenticação:**
O sistema não aparenta possuir área de login para clientes, o que impede funcionalidades como histórico de pedidos, fidelização e personalização da experiência.

---

## Parte 6 – Modelagem do Sistema

### Entidades Identificadas

- **Produto**: representa cada item do cardápio
- **Categoria**: agrupa os produtos (Pizza, Lanche, Bebida)
- **ItemCarrinho**: representa um produto adicionado ao carrinho com quantidade
- **Carrinho**: conjunto de itens selecionados pelo cliente
- **Pedido**: resultado final do carrinho com dados de entrega
- **Cliente**: dados do usuário que realiza o pedido
- **Entrega**: informações sobre o tipo e taxa de entrega

### Definição de Classes

**Produto**
- Atributos: `id`, `nome`, `descricao`, `preco`, `foto`, `categoria`
- Métodos: `getNome()`, `getPreco()`, `getCategoria()`

**Categoria**
- Atributos: `id`, `nome`
- Métodos: `getNome()`, `getProdutos()`

**ItemCarrinho**
- Atributos: `produto`, `quantidade`
- Métodos: `getSubtotal()`, `getQuantidade()`

**Carrinho**
- Atributos: `itens`, `total`
- Métodos: `adicionarItem()`, `removerItem()`, `calcularTotal()`, `limpar()`

**Pedido**
- Atributos: `carrinho`, `cliente`, `entrega`, `total`
- Métodos: `finalizar()`, `enviarWhatsApp()`

**Cliente**
- Atributos: `nome`, `telefone`, `endereco`
- Métodos: `getNome()`, `getTelefone()`

**Entrega**
- Atributos: `tipo`, `taxa`, `endereco`
- Métodos: `calcularTaxa()`, `getTipo()`

### Relacionamentos
- Uma `Categoria` possui vários `Produto`
- Um `Carrinho` possui vários `ItemCarrinho`
- Um `ItemCarrinho` referencia um `Produto`
- Um `Pedido` possui um `Carrinho`, um `Cliente` e uma `Entrega`

---

## Melhorias Propostas

1. **Adotar abordagem API-First**: desacoplar completamente o frontend do backend, permitindo que a mesma API seja consumida por um site, aplicativo mobile ou outros canais no futuro.

2. **Implementar autenticação de clientes**: permitir login para acesso ao histórico de pedidos e programa de fidelidade.

3. **Adicionar cache no cardápio**: utilizar uma solução de cache (como Redis) para reduzir requisições ao banco de dados, já que o cardápio raramente muda.

4. **Mover regras de negócio para o backend**: garantir que cálculos de taxa e desconto sejam processados exclusivamente no servidor, aumentando a segurança e evitando duplicação de código.

5. **Implementar sistema de notificações**: notificar o cliente sobre o status do pedido em tempo real via WhatsApp ou push notification.
