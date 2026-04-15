# **Parte 1 a 4 – Análise do Sistema Real e Design**

## **Parte 1 – Análise do Sistema Real**

**1\. Qual é o objetivo do sistema?**

O sistema tem como objetivo principal funcionar como um cardápio/catálogo digital interativo, permitindo que os clientes visualizem os produtos da pizzaria/lanchonete, montem os seus pedidos e os enviem de forma estruturada para o estabelecimento.

**2\. Quais funcionalidades ele oferece?**

* Listagem de produtos divididos por categorias.  
* Visualização de detalhes e preços dos produtos.  
* Adição e remoção de itens num carrinho de compras.  
* Cálculo do valor total do pedido.  
* Redirecionamento do pedido finalizado para um canal de atendimento (geralmente WhatsApp).

**3\. Como o utilizador interage com o sistema?**

A interação ocorre maioritariamente através de cliques (ou toques em dispositivos móveis) para navegação entre categorias. O utilizador seleciona o item, ajusta a quantidade, adiciona ao carrinho virtual, revê o carrinho num painel lateral ou *modal* e clica no botão para finalizar, o que aciona o envio dos dados da sessão.

**4\. Como os produtos estão organizados?**

Os produtos estão agrupados em secções/categorias semânticas (ex: Pizzas Tradicionais, Pizzas Especiais, Hambúrgueres, Bebidas, Combos), facilitando a navegação com menus de âncora ou abas.

## **Parte 2 – Análise de Arquitetura**

* **Tipo de arquitetura:** Provavelmente trata-se de uma arquitetura Cliente-Servidor (Client-Server), possivelmente implementada como uma *Single Page Application (SPA)* no frontend, que consome dados de uma API RESTful.  
* **Possível divisão em camadas:**  
  * **Camada de Apresentação (Frontend):** Responsável por renderizar a interface, gerir o estado do carrinho na sessão do browser (ex: *LocalStorage*).  
  * **Camada de Lógica de Negócio (Backend/API):** Fornece o catálogo de produtos e os preços atualizados.  
  * **Camada de Dados:** Base de dados onde o menu e informações da loja estão armazenados.  
* **Existência de separação de responsabilidades:**  
  **Justificativa:** É percetível a separação, pois a interface responde de forma muito rápida ao adicionar itens ao carrinho sem recarregar a página. Isto indica que o frontend trata a interação do utilizador, enquanto o backend é chamado de forma assíncrona apenas para carregar os dados iniciais.

## **Parte 3 – Análise de Design**

* **Coesão:** Alta nos componentes visuais (ex: um "Cartão de Produto" tem a única função de exibir e adicionar aquele item ao carrinho).  
* **Acoplamento:** Aparenta ser baixo entre o catálogo e a finalização, assumindo que usam *endpoints* distintos. Contudo, se a aplicação for monolítica e renderizada no servidor (SSR), o acoplamento entre o HTML e a lógica de produtos pode ser maior.  
* **Separação de responsabilidades:** O sistema de carrinho parece estar bem isolado do sistema de listagem de produtos.

## **Parte 4 – Padrões de Projeto (Inferência)**

**1\. O sistema aparenta utilizar padrões?**

Sim. Em sistemas web modernos, certos padrões emergem naturalmente devido aos *frameworks* utilizados.

**2 e 3\. Onde poderiam existir e ser aplicados?**

* **Singleton:** No gestão do "Carrinho de Compras". Só pode existir uma instância do carrinho ativa por sessão de utilizador para evitar perda ou duplicação de itens selecionados.  
* **Factory:** Na criação de instâncias de produtos na interface. Uma ProdutoFactory no frontend pode receber o JSON da API e criar os componentes visuais adequados (um componente de Pizza pode ter campos para "Metade/Metade", enquanto um Hambúrguer não).  
* **MVC (Model-View-Controller):** Na arquitetura global. O **Model** gere as regras dos preços e carrinho, a **View** exibe os botões e fotos, e o **Controller** interceta o clique de "Adicionar", atualizando o Model e instruindo a View a renderizar o novo total.