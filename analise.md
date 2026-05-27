# Análise Arquitetural: Problemas do MVC Tradicional

1. **Controllers Gordos:** No MVC tradicional, o `PedidoController` acumulava lógica de validação de formulários, chamadas do service, tratamento de erros e redirecionamentos.
2. **Organização Limitada por Tipo:** Agrupar arquivos por "o que eles são" (todos os controllers juntos, todos os models juntos) dificulta a manutenção. Para alterar a feature de Pedidos, o desenvolvedor precisa abrir pastas completamente distantes uma da outra.
3. **Crescimento Desordenado:** Se a equipe crescer e 5 desenvolvedores precisarem trabalhar em features diferentes (um em pagamentos, outro em produtos), haverá conflitos constantes de merge nos mesmos controllers centrais.