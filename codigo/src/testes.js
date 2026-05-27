import { PedidoService } from './services/PedidoService.js';

function executarTestes() {
    console.log("--- INICIANDO TESTES DE LÓGICA ---");
    const service = new PedidoService();

    // Teste 1: Cálculo de Total Bruto
    service.adicionarItem('pastel', 2); // 2x R$ 5,00 = 10,00
    console.assert(service.pedidoAtual.totalBruto === 10, "Erro: Total bruto devia ser 10");

    // Teste 2: Aplicação de Desconto Strategy (Acima de R$ 50 -> 10%)
    service.adicionarItem('caldo', 10); // + R$ 70,00 = Total 80,00
    service.calcularTotais(); // Dispara o Strategy
    const descontoEsperado = 8; // 10% de 80
    console.assert(service.pedidoAtual.desconto === descontoEsperado, `Erro: Desconto devia ser ${descontoEsperado}`);

    console.log("--- TESTES FINALIZADOS ---");
}

executarTestes();