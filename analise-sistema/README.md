# Atividade 2 -Engenharia Reversa, Arquitetura e Modelagem
# Aluno: João Paulo de Albuquerque Alves 
## Docente
Prof. Dr. Renato William Rodrigues de Souza

## Instituição
IFCE Campus Boa Viagem

## Curso
Análise e Desenvolvimento de Sistemas

## Contexto
Você já analisou um sistema didático com problemas estruturais. Nesta etapa, deverá analisar um sistema real em produção:

<https://tropykalypizzaselanches.com.br/>

Diferentemente da atividade anterior, este sistema:
- está em uso real;
- não possui código-fonte disponível;
- deve ser analisado por meio de engenharia reversa baseada no comportamento observado.

## Objetivo Geral
Aplicar conceitos de:
- Arquitetura de Software;
- Design de Software;
- Engenharia Reversa;
- Modelagem UML;
- Padrões de Projeto.

## Parte 1 - Análise do Sistema Real
1. Qual é o objetivo do sistema?
2. Quais funcionalidades ele oferece?
3. Como o usuário interage com o sistema?
4. Como os produtos estão organizados?

## Parte 2 - Análise de Arquitetura
Identifique e justifique:
- tipo de arquitetura;
- possível divisão em camadas;
- existência de separação de responsabilidades.

## Parte 3 - Análise de Design
Avalie:
- coesão;
- acoplamento;
- separação de responsabilidades.

## Parte 4 - Padrões de Projeto
1. O sistema aparenta utilizar padrões de projeto?
2. Onde poderiam existir os padrões Factory, Singleton e MVC?
3. Em quais pontos esses padrões poderiam ser aplicados?

## Parte 5 - Comparação com Sistema Didático
Compare os sistemas com base nos seguintes critérios:
- arquitetura;
- coesão;
- acoplamento;
- organização;
- flexibilidade.

Explique as principais diferenças encontradas.

## Parte 6 - Modelagem do Sistema
### Identificação de Entidades
Liste as entidades do sistema (exemplos: Produto, Pedido, Categoria).

### Definição de Classes
Defina atributos e métodos para as classes identificadas.

### Diagrama de Classes
Crie um diagrama UML contendo:
- classes;
- relacionamentos;
- multiplicidade.

### Justificativa
Explique as escolhas realizadas na modelagem.

## Parte 7 - Problemas Identificados
Liste problemas observados, tais como:
- limitações de arquitetura;
- alto acoplamento;
- dificuldade de manutenção.

## Parte 8 - Proposta de Arquitetura
Proponha:
- organização em camadas ou MVC;
- separação de responsabilidades;
- componentes principais.

## Parte 9 - Aplicação de Padrões
Explique como aplicar os padrões:
- Factory;
- Singleton.

## Parte 10 - Reflexão Crítica
1. É possível modelar um sistema sem acesso ao código-fonte?
2. Qual é a importância da modelagem?
3. Qual é a diferença entre um sistema real e um sistema didático?

## Orientações
- A modelagem deve ser baseada em inferência.
- Justifique as respostas apresentadas.
- Utilize os conceitos vistos em aula.
- Não existe resposta única.

## Entrega com Git e GitHub
A entrega da atividade deve ser realizada utilizando Git e GitHub, simulando um ambiente profissional de desenvolvimento de software.

### Fluxo Geral da Entrega
Cada aluno (ou grupo) deverá:
1. clonar o repositório base;
2. criar uma branch de trabalho;
3. desenvolver a atividade;
4. realizar commits organizados;
5. enviar as alterações para o GitHub;
6. criar um Pull Request.

### Estrutura do Repositório
Organize os arquivos conforme a estrutura abaixo:

```text
/analise-sistema
	README.md
	analise.md
	comparacao.md
	modelagem.png (ou modelagem.pdf)
	arquitetura.md
	melhorias.md
```

### Descrição dos Arquivos
- README.md: identificação do aluno e descrição da atividade;
- analise.md: análise do sistema real (Partes 1, 2 e 3);
- comparacao.md: comparação entre os sistemas;
- modelagem.png ou modelagem.pdf: diagrama UML;
- arquitetura.md: proposta de arquitetura;
- melhorias.md: problemas identificados e melhorias propostas.

### Passo a Passo
Clonar o repositório:

```bash
git clone LINK_DO_REPOSITORIO
cd sistema-pedidos-eng-reversa
```

Criar uma branch:

```bash
git checkout -b atividade-analise
```

Realizar alterações e commits:

```bash
git add .
git commit -m "Análise do sistema real concluída"
git commit -m "Comparação com sistema didático"
git commit -m "Adição do diagrama UML"
```

Enviar para o GitHub:

```bash
git push origin atividade-analise
```

### Pull Request
Após finalizar:
- acesse o repositório no GitHub;
- clique em "Compare & Pull Request";
- preencha o template corretamente;
- envie para avaliação.

### Critérios de Avaliação no Git
- organização dos arquivos;
- qualidade da análise;
- clareza dos commits;
- estrutura do Pull Request;
- coerência da modelagem.

## Boas Práticas de Commit
Exemplo inadequado:

```bash
git commit -m "mudanças"
```

Exemplos adequados:

```bash
git commit -m "Separação da análise do sistema real"
git commit -m "Adição da comparação entre sistemas"
git commit -m "Inclusão do diagrama UML"
```

## Regras Importantes
- Cada commit deve representar uma etapa da atividade.
- Não realizar apenas um commit final.
- Utilizar nomes claros para as mensagens de commit.
- Preencher corretamente o Pull Request.

## Penalidades
- apenas 1 commit: -0,5 ponto;
- sem Pull Request: -1,0 ponto;
- Pull Request sem descrição: -0,5 ponto.

## Mensagem Final
"Se você consegue modelar um sistema sem ver o código, você realmente entendeu como ele funciona."