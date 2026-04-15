# Problemas e Melhorias

## Parte 7 – Problemas Identificados
1. **Limitação de Arquitetura:** Dependência excessiva do WhatsApp; se a API cair, o fluxo de fechamento trava.
2. **Dificuldade de Manutenção:** Por ter muitos produtos variados (Pizzas, Sanduíches, Vitaminas), se não houver um padrão Factory, o código de criação de objetos fica inflado (alto acoplamento).

## Parte 10 – Reflexão Crítica
1. **É possível modelar sem ver o código?** Sim, através da Engenharia Reversa comportamental. Observando entradas e saídas, inferimos as classes necessárias.
2. **Importância da Modelagem:** Evita retrabalho e permite prever erros de lógica antes da implementação.
3. **Diferença:** O sistema real precisa lidar com exceções (falha de rede, pagamento recusado), o didático foca no "caminho feliz".