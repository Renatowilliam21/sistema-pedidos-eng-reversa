# **PRÁTICA ORIENTADA 01**

Arquitetura de Sistemas  
Prof. Dr. Renato William Rodrigues de Souza  
IFCE Campus Boa Viagem  
Curso: Análise e Desenvolvimento de Sistemas

Tema: Engenharia Reversa e Análise de Design de Software

---

## **Contexto**

Você recebeu um sistema de pedidos desenvolvido por outro programador. O sistema está funcional, porém não possui documentação e apresenta problemas de organização.

---

# **Parte 1 – Compreensão do Sistema**

## **1\. Objetivo do sistema**

Permitir que o usuário registre pedidos, selecionando produtos, informando quantidades e calculando o valor total da compra.

## **2\. Principais funcionalidades**

* Seleção de produtos  
* Inserção de quantidade  
* Adição de itens ao pedido  
* Listagem dos itens  
* Cálculo do total  
* Aplicação de desconto e taxa  
* Finalização do pedido  
* Armazenamento no localStorage

## **3\. Interação do usuário**

O usuário interage através de uma interface web, utilizando um menu de seleção, campo de quantidade e botões para adicionar itens e finalizar o pedido.

# 

# **Parte 2 – Identificação de Elementos**

## **1\. Principais funções**

* adicionar()  
* atualizarLista()  
* salvarTotal()  
* finalizar()  
* limparTudo()  
* removerUltimo()  
* calcularTotal()

## **2\. Dados manipulados**

* Lista de itens  
* Produto  
* Quantidade  
* Subtotal  
* Total do pedido  
* Total final  
* Dados no localStorage

## **3\. Entidades identificadas**

* Produto  
* ItemPedido  
* Pedido

---

# **Parte 3 – Arquitetura**

## **1\. O sistema possui arquitetura definida?**

Não. O sistema não possui arquitetura definida, pois há mistura de lógica de negócio, interface e armazenamento em um único arquivo.

## **2\. Ele segue algum padrão?**

Não segue padrões como MVC ou arquitetura em camadas.

## **3\. Classificação do sistema**

Sistema monolítico, com alto acoplamento e baixa coesão.

## **Problemas Identificados**

* Mistura de responsabilidades  
* Uso de variáveis globais  
* Duplicação de código (cálculo do total)  
* Uso excessivo de estruturas condicionais  
* Falta de organização modular  
* Alto acoplamento com o DOM

# **Parte 4 – Modelagem (UML)**

(Coloque aqui a imagem do seu diagrama UML exportado do Draw.io)

# **Parte 5 – Análise de Problemas**

## **Coesão**

O sistema apresenta baixa coesão, pois as funções realizam múltiplas responsabilidades ao mesmo tempo, como manipulação de dados, cálculo e atualização da interface.

## **Acoplamento**

O sistema possui alto acoplamento, já que a lógica de negócio está diretamente ligada ao DOM (HTML) e ao armazenamento (localStorage), dificultando alterações e reutilização do código.

## **Separação de responsabilidades**

Não há separação clara de responsabilidades. A lógica de cálculo, interface e persistência estão misturadas no mesmo arquivo (script.js).

## **Duplicação de código**

Existe duplicação de lógica no cálculo do total, pois essa operação ocorre tanto na função atualizarLista() quanto na função calcularTotal().

## **Organização geral**

O código está desorganizado, com uso de variáveis globais, falta de modularização e ausência de estrutura orientada a objetos.

# 

# **Parte 6 – Propostas de Melhoria**

## **Organização em camadas**

Separar o sistema em:

* Interface (HTML)  
* Lógica de negócio (JavaScript)  
* Persistência de dados (localStorage ou outro)

## **Criação de classes**

Criar classes para representar as entidades do sistema:

* Produto  
* ItemPedido  
* Pedido

## **Aplicação de padrões de projeto**

### **Factory**

Utilizar para criar produtos sem necessidade de múltiplos if.

### **Singleton**

Utilizar para garantir apenas uma instância do pedido.

## **Melhorias no código**

* Remover variáveis globais  
* Centralizar o cálculo do total em uma única função  
* Melhorar validações  
* Evitar repetição de código  
* Melhorar legibilidade

## **Parte 7 – Refatoração**

**Separação de responsabilidades** A função `adicionar()` original executava múltiplas tarefas ao mesmo tempo: lia o DOM, calculava preço, criava o objeto e atualizava a interface. Após a refatoração, essas responsabilidades foram distribuídas em funções específicas: `lerEntrada()` para leitura do DOM, `validarEntrada()` para validação, `ProdutoFactory.criar()` para criação do produto e `renderizarLista()` para atualização da interface.

**Melhoria de funções** Cada função passou a ter uma única responsabilidade. As regras de negócio como cálculo de desconto e taxa foram encapsuladas dentro do `GerenciadorPedido`, separadas da camada de interface.

**Organização do código** O código foi dividido em três blocos bem definidos: Factory (criação de produtos), Singleton (gerenciamento do pedido) e UI (interação com o DOM). As variáveis globais soltas `itens` e `total` foram eliminadas e seu estado passou a ser gerenciado internamente pelo `GerenciadorPedido`.

**Remoção de duplicação** A função `calcularTotal()` existia duplicada no código original — uma vez dentro do loop de `atualizarLista()` e outra como função separada `calcularTotal()`. Após a refatoração, o cálculo foi centralizado em um único método dentro do `GerenciadorPedido`, usando `reduce()`.

**Redução de acoplamento** A manipulação do DOM ficou restrita às funções de UI (`lerEntrada`, `validarEntrada`, `renderizarLista`), completamente separada da lógica de negócio que vive no `GerenciadorPedido`. Isso permite alterar a interface sem tocar nas regras do sistema, e vice-versa.

**Resultado** A refatoração tornou o código mais limpo, organizado, reutilizável e de fácil manutenção, preparando o sistema para a aplicação dos padrões de projeto.

## **Parte 8 – Aplicação de Padrões de Projeto**

### **Factory — `ProdutoFactory`**

**Onde foi aplicado** Na função `criar()` do objeto `ProdutoFactory`, responsável por gerar o objeto do item com tipo, nome, preço, quantidade e subtotal.

**Por que foi utilizado** No código original, a lógica de preço ficava espalhada em vários `if`s dentro de `adicionar()`. Com o Factory, essa responsabilidade foi centralizada em um catálogo interno. Se um novo produto precisar ser adicionado ou um preço alterado, a mudança ocorre em um único lugar, sem impacto no restante do código.

**Vantagens**

* Centralização da criação e precificação de produtos  
* Validação: se um tipo inválido for passado, o Factory lança um erro explícito em vez de retornar `NaN` silenciosamente  
* Facilidade para adicionar novos produtos  
* Redução de condicionais espalhadas pelo código

### **Singleton — `GerenciadorPedido`**

**Onde foi aplicado** No objeto `GerenciadorPedido`, acessado sempre via `getInstance()`. Ele centraliza todo o estado do pedido: lista de itens, cálculo de total, aplicação de desconto, taxa e persistência no `localStorage`.

**Por que foi utilizado** No código original, `itens` e `total` eram variáveis globais soltas, acessíveis e modificáveis por qualquer parte do código. Com o Singleton, existe garantidamente uma única instância controlando o estado do pedido durante toda a execução. Qualquer módulo que chame `GerenciadorPedido.getInstance()` recebe sempre o mesmo objeto, evitando estados paralelos ou inconsistências.

**Vantagens**

* Controle centralizado e protegido dos dados do pedido  
* Estado interno isolado com cópia defensiva em `getItens()`, evitando modificações externas acidentais  
* Implementação correta do padrão: o uso de `getInstance()` garante de fato uma única instância, ao contrário de abordagens que apenas aparentam ser Singleton  
* Facilita o acesso global sem expor variáveis globais soltas

**Conclusão** A aplicação dos padrões Factory e Singleton contribuiu para melhorar a arquitetura do sistema, tornando o código mais modular, organizado e alinhado com boas práticas de desenvolvimento de software.

