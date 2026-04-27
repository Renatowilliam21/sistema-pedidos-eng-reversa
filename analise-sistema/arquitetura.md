    - - - - -   PROPOSTAS DE ARQUITETURA    - - - - -

Analisando o site, é percepitível que possui algumas falhas, porém na questão de estrutura esse site é bem sólido

O site possui organização em camadas ou o MVC

    • View: O fron-end, o visual, por onde o usuário interage.

    • Model: Onde ficam os preços, descrições dos lanches e dados dos clientes. Fica armazenado em um Banco de Dados no servidor.

    • Controller: É o intermediário entre os dois. Quando um item é adicionado ao carrinho, o Controller recebe esse comando da View, calcula o total e registra no Model.

Separação de responsabilidades

    O sistema também tem uma divisão de responsabilidades apropriada, exemplos como:

        • O site que o cliente acessa não faz cálculos complexos de forma isolada nem guarda o catálogo de forma rígida. Ele apenas tem a responsabilidade de "exibir" informações.

        • A existência do link "Painel Sistema" no rodapé do site confirma que há um sistema totalmente separado responsável apenas pela gestão do negócio

Componentes Pricipais:

    • O Catálogo: Organizado em blocos independentes por categorias.

    • O Gerenciador de Estado: Um componente flutuante e dinâmico que atualiza o subtotal e a contagem de itens em tempo real sem precisar recarregar a página inteira.

    • O Sistema de Checkout: O fluxo final onde o usuário insere seus dados de entrega e o sistema processa o fechamento da compra.

O sistema muito provávelmente também utiliza padrões de projeto como o factory e singleton

    O factory por exemplo é utilizado para "fabricar" itens de forma dinâmica sem precisar repetir o código.

    O Singleton ele armazena e proteje o estado global do carrinho de compras, para que não tenha processamento espelhado, e que quando você atualizar a página, os itens do carrinho não desaparecem

Como aplicar Factory e Singleton?

    • Factory: O objetivo principal do Factory é separar a lógica de criação de um objeto da parte do código que o utiliza. Em vez de você instanciar os objetos espalhando new Produto() pelo código inteiro, você delega essa tarefa para uma classe "Fábrica".

     Como é aplicado no código: Você cria um método central (a fábrica) que recebe um parâmetro a fábrica contém toda a lógica, e devolve o objeto prontinho. Quem pediu o objeto não precisa saber como ele foi feito, só precisa recebê-lo.

    O objetivo principal do Singleton é garantir que uma classe tenha apenas um unico objeto ativo na memória do computador durante toda a vida útil do programa, e que qualquer parte do sistema consiga acessá-la.

     Como é aplicado no código: O programador "bloqueia" a criação livre de novos objetos. Em vez de o sistema dar um new Carrinho() toda hora, ele chama um método estático que verifica: "Já existe um carrinho? Se sim, devolve o que já existe. Se não, cria um e guarda." 
