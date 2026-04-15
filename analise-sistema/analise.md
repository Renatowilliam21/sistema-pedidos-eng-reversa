# **PARTE 1 – ANÁLISE DO SISTEMA REAL**

## **1\. Objetivo do sistema**

O sistema do site da **Tropykaly Pizzas e Lanches** tem como objetivo permitir que clientes realizem pedidos de alimentos online, como pizzas, hambúrgueres e bebidas. Ele fornece um ambiente digital para seleção, personalização e finalização de pedidos, substituindo processos manuais como pedidos por telefone ou atendimento presencial.

---

## **2\. Funcionalidades**

O sistema oferece funcionalidades relacionadas ao processo de compra online. O usuário pode navegar por categorias como produtos, combos e promoções, visualizar itens disponíveis e personalizá-los conforme suas preferências.

No caso das pizzas, é possível configurar atributos como tamanho, tipo de borda (com possível acréscimo de valor), sabores e adicionais, além da inserção de observações personalizadas.

Nos combos, o sistema permite seleção e remoção de itens específicos, além do controle de quantidade por meio de incrementação e decrementação.

O sistema também mantém um carrinho de compras dinâmico, que atualiza automaticamente o subtotal conforme os itens são adicionados ou removidos.

O fluxo de finalização do pedido é estruturado em etapas sequenciais:

* Identificação do cliente  
* Escolha do tipo de entrega (retirada ou delivery)  
* Definição de endereço ou unidade de retirada  
* Seleção da forma de pagamento (Pix, dinheiro, crédito, débito e cupom)

Além disso, o sistema exibe informações operacionais como status de funcionamento, endereço físico e canais de contato.

---

## **3\. Interação do usuário**

A interação ocorre por meio de uma interface web baseada em eventos de clique e seleção.

O usuário navega entre categorias de produtos, visualiza itens e realiza personalizações dinâmicas.

Ao selecionar um produto, é aberta uma interface de configuração que permite ajustes antes da adição ao carrinho. Após a confirmação, o item é inserido no carrinho, que atualiza automaticamente os valores totais.

O fluxo de checkout segue uma sequência obrigatória de etapas, garantindo a coleta de todas as informações necessárias para o processamento do pedido.

---

## **4\. Organização dos produtos**

Os produtos estão organizados em categorias principais, como pizzas, combos e bebidas.

Cada categoria agrupa itens com características semelhantes:

* Produtos simples → variações limitadas  
* Pizzas → alto nível de personalização

Os combos funcionam como agregações de múltiplos itens, permitindo configuração conjunta.

---

# **PARTE 2 – ANÁLISE DE ARQUITETURA**

## **1\. Tipo de arquitetura**

O sistema segue o modelo de arquitetura cliente-servidor, típico de aplicações web, onde:

* Cliente (navegador) → interface e interação  
* Servidor → regras de negócio e dados

---

## **2\. Divisão em camadas**

É possível inferir três camadas principais:

* **Camada de apresentação (frontend)** → interface do usuário  
* **Camada de lógica de negócio (backend)** → regras, cálculos e fluxo  
* **Camada de persistência de dados** → armazenamento de dados

---

## **3\. Separação de responsabilidades**

Existe separação funcional entre interface, lógica de negócio e dados, porém não de forma rígida.

Em alguns pontos (como carrinho e checkout), há interação direta entre interface e lógica de cálculo, reduzindo o isolamento entre camadas.

---

# **PARTE 3 – ANÁLISE DE DESIGN**

## **1\. Coesão**

A coesão é classificada como **média a boa**.

* Nível macro → boa separação (catálogo, carrinho, checkout)  
* Nível interno → problemas em componentes complexos (ex: personalização de pizzas)

**Conclusão:** boa coesão geral, mas com fragilidade interna em alguns módulos.

---

## **2\. Acoplamento**

O sistema apresenta **acoplamento moderado**.

* Forte dependência entre interface e lógica no carrinho  
* Dependência sequencial no checkout  
* Indícios de lógica dentro da interface

**Conclusão:** acoplamento moderado com pontos de risco.

---

## **3\. Separação de responsabilidades**

Existe separação conceitual:

* **Interface (View)**  
* **Lógica de negócio**  
* **Persistência de dados**

Porém, há sobreposição em:

* Carrinho  
* Personalização de produtos

**Conclusão:** separação parcial, não totalmente isolada.

---

# **PARTE 4 – PADRÕES DE PROJETO**

## **1\. Uso de padrões**

Não há evidência de uso formal, mas há compatibilidade com boas práticas.

---

## **2\. Possíveis padrões identificados**

### **MVC (Model–View–Controller)**

* **View:** interface (catálogo, carrinho, checkout)  
* **Model:** produto, pedido, cliente, pagamento, cupom  
* **Controller:** lógica de ações

---

### **Factory**

Aplicável na criação de diferentes tipos de produtos:

* Pizzas  
* Combos  
* Bebidas

---

### **Singleton**

Aplicável ao:

* Carrinho de compras  
* Sessão do usuário

---

## **3\. Possíveis aplicações**

* MVC → melhor separação de camadas  
* Factory → criação padronizada de objetos  
* Singleton → controle de estado global

---

## **Conclusão da Parte 4**

O sistema não implementa padrões formalmente, mas é compatível com eles. Sua adoção melhoraria:

* Organização  
* Escalabilidade  
* Manutenção

---

# **PARTE 6 – MODELAGEM DO SISTEMA**

## **1\. Identificação de Entidades**

* Cliente  
* Pedido  
* ItemPedido  
* Produto  
* Categoria  
* Pagamento  
* Endereço  
* Cupom  
* WhatsAppService

---

## **2\. Definição de Classes**

### **Cliente**

* **Atributos:** nome, telefone  
* **Métodos:** validarDados()

---

### **Pedido**

* **Atributos:** id, data, total, status  
* **Métodos:** adicionarItem(), removerItem(), calcularTotal(), enviarPedido()

---

### **ItemPedido**

* **Atributos:** quantidade, subtotal  
* **Métodos:** calcSub()

---

### **Produto**

* **Atributos:** id, nome, preço, descrição  
* **Métodos:** calcularPreco(), obterDetalhes()

---

### **Categoria**

* **Atributos:** id, nome  
* **Métodos:** listarProdutos()

---

### **Pagamento**

* **Atributos:** tipo, valor  
* **Métodos:** processar()

---

### **Endereço**

* **Atributos:** rua, número, cidade  
* **Métodos:** validar()

---

### **Cupom**

* **Atributos:** código, desconto  
* **Métodos:** aplicar()

---

### **WhatsAppService**

* **Atributos:** apiUrl, token  
* **Métodos:** enviarMensagem()

---

## **3\. Justificativa**

As classes foram definidas com base no fluxo real do sistema de pedidos.

* **Pedido** é o núcleo do sistema  
* **ItemPedido** permite múltiplos produtos  
* **Produto \+ Categoria** organizam o cardápio  
* **Pagamento** representa formas de pagamento  
* **Endereço** atende delivery  
* **Cupom** aplica descontos  
* **WhatsAppService** integra com API externa

---

## **4\. Relacionamentos (Multiplicidades)**

* Cliente → Pedido → **1:N**  
* Pedido → ItemPedido → **1:N**  
* ItemPedido → Produto → **N:1**  
* Produto → Categoria → **N:1**  
* Pedido → Pagamento → **1:1**  
* Pedido → Cupom → **0:1**  
* Pedido → Endereço → **1:1**  
* Pedido → WhatsAppService → **1:1**

---

## **Conclusão**

A modelagem representa de forma estruturada o funcionamento real do sistema, seguindo princípios de organização e separação de responsabilidades.

