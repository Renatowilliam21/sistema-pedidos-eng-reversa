const BASE_URL = "https://sistema-pedidos-eng-reversa-1.onrender.com";
const TAXA_ENTREGA = 5;

async function adicionar() {
  let produto = document.getElementById("produto").value;
  let qtd = document.getElementById("qtd").value;

  if (qtd === "" || parseInt(qtd) <= 0) {
    alert("Quantidade inválida");
    return;
  }

  try {
    await fetch(`${BASE_URL}/backend/api.php?action=adicionar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `produto=${produto}&quantidade=${qtd}`
    });

    atualizarLista();
  } catch (e) {
    console.log("Erro adicionar:", e);
  }
}

async function atualizarLista() {
  try {
    let res = await fetch(`${BASE_URL}/backend/api.php?action=listar`);
    let text = await res.text();
    let data = JSON.parse(text);

    let lista = document.getElementById("lista");
    lista.innerHTML = "";

    let total = 0;

    if (!data.itens) return;

    data.itens.forEach(item => {
      let li = document.createElement("li");
      li.innerHTML =
        item.produto +
        " | Qtd: " +
        item.quantidade +
        " | Subtotal: R$ " +
        item.preco * item.quantidade;

      lista.appendChild(li);
      total += item.preco * item.quantidade;
    });

    document.getElementById("total").innerText = total;
    document.getElementById("taxa").innerText = TAXA_ENTREGA;
    document.getElementById("totalFinal").innerText = total + TAXA_ENTREGA;

  } catch (e) {
    console.log("Erro listar:", e);
  }
}

async function finalizar() {
  try {
    let res = await fetch(`${BASE_URL}/backend/api.php?action=finalizar`);
    let data = await res.json();
    let totalComTaxa = data.totalFinal + TAXA_ENTREGA;
    alert(`Pedido finalizado!\nSubtotal: R$ ${data.totalFinal}\nTaxa de entrega: R$ ${TAXA_ENTREGA}\nTotal: R$ ${totalComTaxa}`);
    atualizarLista();
  } catch (e) {
    console.log("Erro finalizar:", e);
  }
}

function enviarWhatsApp() {
  fetch(`${BASE_URL}/backend/api.php?action=listar`)
    .then(res => res.json())
    .then(data => {
      if (!data.itens || data.itens.length === 0) {
        alert("Nenhum item no pedido!");
        return;
      }

      let linhas = data.itens.map(item =>
        `- ${item.produto} (x${item.quantidade})`
      ).join("\n");

      let totalComTaxa = data.total + TAXA_ENTREGA;
      let mensagem = `Pedido Tropykaly:\n${linhas}\n\nSubtotal: R$ ${data.total}\nTaxa de entrega: R$ ${TAXA_ENTREGA}\nTotal: R$ ${totalComTaxa}`;
      let numero = "5585999999999";

      window.open(`https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`, "_blank");
    })
    .catch(err => console.log("Erro WhatsApp:", err));
}

window.adicionar = adicionar;
window.finalizar = finalizar;
window.enviarWhatsApp = enviarWhatsApp;
