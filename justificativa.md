1. Quais problemas foram resolvidos?

    Inicialmente, o sistema sofria com o acoplamento excessivo, onde a lógica de cálculo, a manipulação do HTML (DOM) e o envio de dados estavam misturados. Isso gerava erros como:

    Sincronização falha: A tela não atualizava corretamente quando os dados mudavam.

    Falta de persistência: Os dados se perdiam ao atualizar a página, pois não havia integração com servidores ou armazenamento local.

2. Como a arquitetura melhorou o sistema?

    Em geral o sistema ficou bem mais pólido e funcional

    Model: Isolou a regra de negócio (preços, itens e descontos), garantindo que o "cérebro" do sistema seja independente da interface.

    View: Ficou responsável apenas por renderizar os dados, facilitando mudanças no design sem quebrar a lógica.

    Controller: Atuou como o maestro, gerenciando o fluxo de entrada do usuário e acionando as classes necessárias (serviços e repositórios).

3. Onde os padrões foram aplicados?

    Singleton: Aplicado no Carrinho.js para garantir que exista apenas uma instância do carrinho em toda a aplicação, evitando duplicação de pedidos.

    Observer: Utilizado para atualizar a interface automaticamente sempre que o estado do carrinho muda, eliminando a necessidade de atualizar o HTML manualmente em cada função.

    Repository: Implementado no PedidoRepository.js para abstrair a comunicação com a API (JSON Server), separando o "como salvar" do "o que salvar".

    Strategy: Aplicado na lógica de descontos, permitindo que novas regras (fixas ou percentuais) sejam criadas sem alterar o código principal do carrinho.

    Service: Usado no WhatsAppService.js para isolar integrações externas de terceiros.

4. Quais beneficios foram obtidos?

    Manutenibilidade: O código ficou modular. Se o preço do pastel mudar ou a API trocar de endereço, sabemos exatamente em qual arquivo mexer.

    Escalabilidade: É fácil adicionar novas funcionalidades (ex: novos cupons de desconto ou um sistema de login) sem risco de efeitos colaterais em outras partes do sistema.

    Profissionalismo: O uso dessas práticas eleva o nível do projeto de um simples script para um software robusto seguindo padrões de engenharia reversa e moderna.
