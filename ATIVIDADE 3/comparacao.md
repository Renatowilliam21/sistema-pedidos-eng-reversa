# Parte 5 – Comparação com Sistema Didático

# Critério
Arquitetura	    
Coesão	       
Acoplamento	    
Organização	   
Flexibilidade

# Sistema Real
Cliente-Servidor, frontend separado da lógica de negócios e do banco de dados
Alta. Cada componente (tela de carrinho, cardápio) tem uma responsabilidade única e bem definida
Baixo. Módulos se comunicam via APIs ou interfaces bem definidas. Mudar o layout não quebra o banco de dados
Modular e baseada em componentes (arquivos divididos logicamente)
Alta. É fácil adicionar um novo tipo de pagamento ou um novo formato de pizza sem reescrever o sistema inteiro.
# Sistema Didático 
Monolítica, muitas vezes com regras de negócio misturadas na interface.
Baixa. Funções ou classes que tentam fazer tudo exemplo: uma única classe cadastra cliente, faz pedido e imprime nota
Alto. O código da interface está diretamente ligado aos comandos do banco de dados. Uma mudança visual pode quebrar o sistema
Arquivos massivos, falta de separação de pastas e responsabilidades
Baixa. Qualquer alteração gera um efeito dominó de bugs inesperados

A grande diferença está na separabilidade. O sistema real é desenhado para sobreviver a mudanças e manutenções contínuas, isolando o que é tela,
o que é regra de negócio e o que é persistência. Já o sistema didático estruturalmente falho costuma ter essas três áreas misturadas em um mesmo bloco de código,
tornando a manutenção um pesadelo e o reaproveitamento de código quase nulo.
