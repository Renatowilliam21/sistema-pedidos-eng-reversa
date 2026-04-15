//  Factory: criação de produtos 
const ProdutoFactory = (() => {
  const catalogo = {
    pastel:       { nome: 'Pastel',       preco: 5 },
    caldo:        { nome: 'Caldo',        preco: 7 },
    refrigerante: { nome: 'Refrigerante', preco: 4 },
    suco:         { nome: 'Suco',         preco: 6 },
  };

  function criar(tipo, quantidade) {
    const info = catalogo[tipo];
    if (!info) throw new Error(`Produto desconhecido: ${tipo}`);
    const qtd      = parseInt(quantidade, 10);
    const subtotal = info.preco * qtd;
    return { tipo, nome: info.nome, preco: info.preco, qtd, subtotal };
  }

  return { criar };
})();


// Singleton: gerenciador do pedido 
const GerenciadorPedido = (() => {
  let instancia = null;

  function criar() {
    let itens = [];

    function adicionarItem(item)  { itens.push(item); }
    function removerUltimo()      { itens.pop(); }
    function limpar()             { itens = []; }
    function getItens()           { return [...itens]; }

    function calcularTotal() {
      return itens.reduce((soma, item) => soma + item.subtotal, 0);
    }

    function calcularDesconto(total) {
      if (total > 100) return total * 0.2;
      if (total > 50)  return total * 0.1;
      return 0;
    }

    function calcularTotalFinal() {
      const total    = calcularTotal();
      const desconto = calcularDesconto(total);
      const taxa     = total * 0.05;
      return total - desconto + taxa;
    }

    function salvar(totalFinal) {
      localStorage.setItem('total', calcularTotal());
      if (totalFinal !== undefined)
        localStorage.setItem('ultimoPedido', totalFinal);
    }

    return {
      adicionarItem, removerUltimo, limpar,
      getItens, calcularTotal, calcularTotalFinal, salvar
    };
  }

  function getInstance() {
    if (!instancia) instancia = criar();
    return instancia;
  }

  return { getInstance };
})();


// UI: leitura de entradas 
function lerEntrada() {
  const tipo = document.getElementById('produto').value;
  const qtd  = document.getElementById('qtd').value;
  return { tipo, qtd };
}

function validarEntrada(qtd) {
  if (!qtd || parseInt(qtd) <= 0) {
    alert('Quantidade inválida');
    return false;
  }
  return true;
}


// UI: renderização 
function renderizarLista() {
  const pedido = GerenciadorPedido.getInstance();
  const lista  = document.getElementById('lista');

  lista.innerHTML = '';

  const itens = pedido.getItens();

  if (itens.length === 0) {
    document.getElementById('total').innerText = '0';
    pedido.salvar();
    return;
  }

  itens.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = item.nome + ' | Qtd: ' + item.qtd + ' | R$ ' + item.subtotal;
    lista.appendChild(li);
  });

  document.getElementById('total').innerText = pedido.calcularTotal();
  pedido.salvar();
}


// Ações 
function adicionarItem() {
  const { tipo, qtd } = lerEntrada();
  if (!validarEntrada(qtd)) return;

  try {
    const item = ProdutoFactory.criar(tipo, qtd);
    GerenciadorPedido.getInstance().adicionarItem(item);
    renderizarLista();
  } catch (e) {
    alert(e.message);
  }
}

function removerUltimoItem() {
  GerenciadorPedido.getInstance().removerUltimo();
  renderizarLista();
}

function finalizarPedido() {
  const pedido     = GerenciadorPedido.getInstance();
  const totalFinal = pedido.calcularTotalFinal();

  alert('Total final: R$ ' + totalFinal.toFixed(2));

  pedido.salvar(totalFinal);
  pedido.limpar();
  renderizarLista();
}