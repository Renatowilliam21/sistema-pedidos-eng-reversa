# Problemas Identificados, Melhorias Propostas e Reflexão Crítica

> **Partes 7 e 10 da Atividade**

---

## Parte 7 – Problemas Identificados

### 1. Alto acoplamento entre carrinho e interface

O estado do carrinho é exibido em todas as páginas via sessão PHP, sem encapsulamento. Qualquer alteração na lógica do carrinho pode quebrar o cabeçalho de todas as páginas simultaneamente.

### 2. Ausência de API separada

O sistema não expõe uma API REST. Isso impossibilita o desenvolvimento futuro de um aplicativo mobile nativo, integração com sistemas de delivery (iFood, Rappi) ou qualquer outro cliente que não seja o navegador web.

### 3. Sem autenticação de cliente

Não há sistema de login para o usuário final. Isso impede funcionalidades como: histórico de pedidos, pedidos favoritos, endereços salvos e notificações de status do pedido.

### 4. Painel administrativo exposto publicamente

O link `/sistema` é visível no rodapé da página pública. Embora provavelmente haja autenticação, a exposição do caminho do painel facilita ataques de força bruta e varreduras automatizadas.

### 5. Escalabilidade limitada

A arquitetura monolítica dificulta a adição de novas funcionalidades sem risco de regressão. Adicionar um sistema de cupons de desconto, por exemplo, provavelmente exigiria modificar múltiplos arquivos sem uma estrutura clara.

### 6. Sem feedback de status do pedido

Após finalizar o pedido, o cliente não recebe nenhuma confirmação visual, número de pedido ou atualização de status. Isso gera incerteza sobre se o pedido foi recebido corretamente.

### 7. Dependência de estrutura de diretórios do painel

As imagens dos produtos são carregadas diretamente de `/sistema/painel/images/`. Mover ou reestruturar o painel quebraria todas as imagens do frontend.

### 8. Dificuldade de manutenção

Sem separação de camadas, uma correção simples (como ajustar o cálculo de frete) pode exigir alterações em locais inesperados do código.

---

## Melhorias Propostas

| Problema | Melhoria Proposta |
|---|---|
| Alto acoplamento | Encapsular o carrinho em uma classe `Carrinho` com interface bem definida, desacoplada da apresentação |
| Sem API | Criar uma API RESTful para separar backend do frontend, permitindo múltiplos clientes |
| Sem autenticação | Implementar sistema de cadastro/login com JWT ou sessão segura |
| Painel exposto | Mover o painel para um subdomínio (`admin.tropykalypizzas.com.br`) com autenticação robusta |
| Sem status de pedido | Implementar página de acompanhamento com atualização via WebSocket ou polling |
| Imagens acopladas | Criar um serviço de storage separado para mídia (ex: S3, Cloudflare R2) |
| Baixa manutenibilidade | Migrar para arquitetura MVC com camadas bem definidas |

---

## Parte 10 – Reflexão Crítica

### 1. É possível modelar um sistema sem ver o código?

**Sim.** A engenharia reversa baseada em comportamento demonstrou que é possível inferir a estrutura de um sistema apenas pela sua interface e fluxo de navegação. As URLs revelam o esquema de roteamento, os nomes dos caminhos revelam as entidades do domínio, e o comportamento das páginas revela as regras de negócio.

O modelo resultante pode não ser idêntico ao código real, mas representa fielmente o **domínio do problema** — e muitas vezes isso é mais valioso do que o código em si, pois é o domínio que deve guiar as decisões de design.

### 2. Qual a importância da modelagem?

A modelagem serve como uma **linguagem comum** entre todos os envolvidos no projeto — desenvolvedores, analistas, clientes e gestores. Ela:

- Força o entendimento estruturado do sistema antes de qualquer linha de código
- Revela inconsistências e ambiguidades que passariam despercebidas no código
- Facilita a comunicação entre membros da equipe
- Serve de base para decisões de manutenção e evolução
- Documenta intenções de design que normalmente ficam implícitas

Modelar é compreender. Quando se consegue modelar um sistema, demonstra-se que sua lógica foi internalizada.

### 3. Diferença entre sistema real e didático?

O **sistema real** prioriza entrega e funcionamento imediato. Decisões são tomadas com base em custo, prazo e recursos disponíveis. A dívida técnica é acumulada conscientemente ou por falta de conhecimento, e a manutenção futura é sacrificada pela velocidade presente.

O **sistema didático** prioriza clareza, padrões e manutenibilidade. É construído para ser lido, compreendido e modificado — não necessariamente para funcionar no menor tempo possível. Pode parecer excessivamente estruturado para problemas simples.

Na prática profissional, o ideal é o equilíbrio: aplicar boas práticas proporcionalmente à complexidade e ao ciclo de vida esperado do sistema. Um sistema que será mantido por anos merece mais investimento em arquitetura do que um MVP descartável.
