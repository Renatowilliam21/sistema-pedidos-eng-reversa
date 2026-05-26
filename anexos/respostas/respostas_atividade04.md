1. Quais problemas foram resolvidos?
Foi eliminado o alto acoplamento entre a lógica de negócio e a interface (DOM). Resolvemos o problema de variáveis globais e funções com múltiplas responsabilidades (God Functions), distribuindo o código em camadas especializadas.

2. Como a arquitetura melhorou o sistema?
A arquitetura em camadas permitiu o desacoplamento. Agora é possível alterar a interface (frontend) sem risco de quebrar as regras de cálculo (backend/service), facilitando a manutenção e a inserção de novas funcionalidades.

3. Onde os padrões foram aplicados?

    Factory: Na criação padronizada de objetos ItemPedido.

    Singleton: No PedidoRepository, garantindo uma única instância para persistência no JSON Server.

    Strategy: No cálculo de descontos variados, isolando as regras em classes separadas.

    Observer: Para atualizar a interface automaticamente sempre que o estado do pedido muda no Service.

4. Quais benefícios foram obtidos?
Obtivemos um código mais limpo (Clean Code), reutilizável e preparado para crescimento (escalabilidade). Além disso, o sistema tornou-se testável de forma isolada e a integração com serviços externos (WhatsApp) ficou centralizada e organizada.