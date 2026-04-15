# 📊 Análise de Sistema de Pedidos

## 🔎 1. Análise do Sistema Real

### 🎯 Objetivo do Sistema
O sistema tem como objetivo otimizar e automatizar o processo de realização de pedidos em um restaurante, proporcionando maior eficiência, organização e praticidade em comparação aos métodos tradicionais, como pedidos por telefone.

### ⚙️ Funcionalidades
A aplicação oferece as seguintes funcionalidades principais:

- Exibição de um cardápio diversificado;
- Carrinho de compras para seleção de produtos;
- Opções de entrega (retirada no local ou delivery);
- Suporte a múltiplos métodos de pagamento.

### 👤 Interação do Usuário
O usuário interage com o sistema principalmente por meio do cardápio digital, onde pode:

- Selecionar produtos;
- Escolher variações (ex: sabores);
- Definir quantidades.

Além disso, há integração com outros canais, como:

- WhatsApp;
- Atendimento presencial no estabelecimento.

### 🗂️ Organização dos Produtos
Os produtos são organizados de forma estruturada para facilitar a navegação:

- Separação por categorias;
- Classificação por tamanho (ex: pizzas);
- Divisão por tipo (ex: esfirras doces e salgadas);
- Seção de combos;
- Área de promoções.

---

## 🏗️ 2. Análise de Arquitetura

### 🧩 Tipo de Arquitetura
Com base na análise, o sistema possivelmente utiliza:

- **MVC (Model-View-Controller):**
  - Separação entre interface, lógica e dados;
  
- **Arquitetura Cliente-Servidor:**
  - O cliente realiza requisições e o servidor processa e responde;

- **Arquitetura Orientada a Eventos:**
  - Ações disparam eventos, como:
    - Confirmação via WhatsApp;
    - Impressão de pedidos;
    - Notificação de entrega.

### 🧱 Estrutura em Camadas
O sistema pode ser dividido em três camadas principais:

- **Camada de Apresentação:** interface com o usuário;
- **Camada de Aplicação:** processamento das regras de negócio;
- **Camada de Dados:** armazenamento das informações.

### 🔐 Separação de Responsabilidades
O sistema apresenta uma divisão clara de responsabilidades:

- **Front-end:**
  - Interface gráfica;
  - Navegação;
  - Exibição do cardápio e carrinho;

- **Back-end:**
  - Processamento de pedidos;
  - Pagamentos;
  - Comunicação com serviços externos;

- **Área Administrativa:**
  - Gerenciamento de produtos;
  - Controle de preços;
  - Acesso restrito por autenticação;

- **Sistema Geral:**
  - Responsividade;
  - Usabilidade;
  - Estabilidade.

---

## 🎨 3. Análise de Design

### 🔗 Coesão
O sistema apresenta alta coesão, com componentes bem definidos e organizados. Cada parte possui uma responsabilidade clara, facilitando a compreensão e o uso.

### 🔌 Acoplamento
O sistema possui baixo acoplamento, permitindo que alterações em um componente não impactem diretamente outros, o que facilita manutenção e evolução.

### 📌 Separação de Responsabilidades
A separação de responsabilidades é bem definida, especialmente entre:

- Interface (front-end);
- Lógica de negócio (back-end);
- Gerenciamento de dados.

Isso contribui para uma arquitetura mais escalável e organizada.