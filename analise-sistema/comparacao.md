# Comparação entre Sistema Real e Sistema Didático

> **Parte 5 da Atividade**

---

## Tabela Comparativa

| Critério | Sistema Real (Tropykaly) | Sistema Didático |
|---|---|---|
| **Arquitetura** | Monolítica, PHP com SSR, sem separação formal de camadas | Geralmente MVC ou em camadas claramente definidas |
| **Coesão** | Baixa – múltiplas responsabilidades por arquivo/página | Alta – classes com responsabilidade única e bem delimitada |
| **Acoplamento** | Alto – carrinho, sessão e UI fortemente acoplados | Baixo – módulos independentes, comunicação por interfaces |
| **Organização** | Funcional mas sem padrão formal; estrutura intuitiva | Estruturada conforme boas práticas e padrões reconhecidos |
| **Flexibilidade** | Baixa – adicionar funcionalidades exige alterar múltiplos arquivos | Alta – estrutura modular facilita extensões sem quebrar o existente |

---

## Análise das Principais Diferenças

### Arquitetura

O sistema real foi construído com foco em funcionar rapidamente e ser entregue ao cliente. A escolha por PHP monolítico com SSR é pragmática e eficaz para o tamanho do negócio, mas não escala bem. O sistema didático, por sua vez, é projetado para demonstrar boas práticas, utilizando separação em camadas (Model, View, Controller) mesmo que isso adicione complexidade inicial.

### Coesão

No sistema real, uma única página PHP pode ser responsável por: consultar o banco, montar o HTML, calcular o total do carrinho e gerenciar sessões. Em um sistema didático, cada uma dessas responsabilidades seria uma classe ou módulo separado — por exemplo, `CarrinhoService`, `ProdutoRepository`, e um template HTML isolado.

### Acoplamento

O alto acoplamento do sistema real se manifesta na dependência direta entre o estado do carrinho e o HTML de todas as páginas. Em um sistema didático, o carrinho seria encapsulado em uma classe com uma interface bem definida, e a apresentação não saberia como ele funciona internamente.

### Organização

O sistema real organiza os arquivos de forma que funciona — mas sem uma convenção clara. O sistema didático segue convenções como a estrutura MVC, onde qualquer desenvolvedor familiarizado com o padrão pode navegar pelo código sem orientação prévia.

### Flexibilidade

Adicionar um novo tipo de produto no sistema real provavelmente exige editar múltiplos arquivos PHP, HTML e possivelmente SQL espalhados. No sistema didático, bastaria criar uma nova classe que estende a classe base `Produto`, graças ao uso de herança e polimorfismo.

---

## Conclusão

O sistema real não é necessariamente "pior" — ele funciona, atende ao negócio e está em produção. A diferença fundamental está no **propósito**: o sistema real foi feito para funcionar agora, enquanto o sistema didático é feito para ser mantido e evoluído por longo prazo. O ideal em um cenário profissional seria equilibrar os dois: usar boas práticas de design sem criar complexidade desnecessária para o tamanho do projeto.
