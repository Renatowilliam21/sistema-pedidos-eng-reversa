# ⚖️ Comparação de Sistemas

## 📌 Critérios Avaliados
Os sistemas foram comparados com base nos seguintes critérios:

1. Arquitetura  
2. Coesão  
3. Acoplamento  
4. Organização  
5. Flexibilidade  

---

## 🏗️ 1. Arquitetura

O sistema real apresenta uma arquitetura mais robusta e abrangente, combinando múltiplos padrões arquiteturais, como:

- **MVC (Model-View-Controller)**  
- **Arquitetura Cliente-Servidor**  
- **Arquitetura Orientada a Eventos**

Essa combinação permite maior escalabilidade, integração e suporte a operações em tempo real.

Por outro lado, o sistema didático adota exclusivamente o padrão **MVC**, realizando a separação entre interface, lógica e dados. No entanto, utiliza **armazenamento local (Local Storage)** e não possui integração com um servidor real, sendo executado em ambiente local (localhost), o que limita suas capacidades.

---

## 🔗 2. Coesão

O sistema real apresenta alta coesão, com componentes bem definidos e organizados de forma intuitiva, proporcionando uma experiência de uso fluida e eficiente.

O sistema didático também demonstra boa coesão, com seus elementos corretamente estruturados. A principal diferença está na interface, sendo o sistema real mais elaborado visualmente, enquanto o didático mantém uma abordagem mais simples e funcional.

---

## 🔌 3. Acoplamento

O sistema real possui baixo acoplamento, permitindo que modificações em determinados módulos não impactem negativamente outras partes do sistema, facilitando manutenção e evolução.

O sistema didático também apresenta baixo acoplamento. Como há acesso ao código-fonte, é possível identificar a utilização de padrões de projeto como:

- **Factory**
- **Singleton**

Esses padrões contribuem para a independência entre componentes e melhor organização do código.

---

## 🗂️ 4. Organização

O sistema real se destaca pela organização visual, utilizando:

- Layout em grade (grid);
- Separação por abas;
- Estrutura clara e atrativa para o usuário.

Já o sistema didático possui uma interface mais simples e menos elaborada visualmente. Contudo, seu código é bem estruturado, com aplicação de boas práticas e padrões de projeto que garantem organização interna e funcionamento adequado.

---

## 🔄 5. Flexibilidade

O sistema real tende a apresentar alta flexibilidade, devido à sua arquitetura modular e bem segmentada. Isso facilita adaptações e evoluções conforme as necessidades do negócio.

Em contrapartida, o sistema didático possui menor flexibilidade. Alterações, como a adição de novos itens ao menu, exigem modificações diretas no código por um desenvolvedor, limitando a autonomia do usuário final na gestão do sistema.

---