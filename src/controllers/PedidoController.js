import { PedidoService } from '../services/PedidoService.js';
import { PedidoView } from '../views/PedidoView.js';
import { WhatsappService } from '../services/WhatsappService.js'; // Import novo
import { PedidoRepository } from '../repositories/PedidoRepository.js'; // Import novo

export class PedidoController {
    constructor() {
        this.service = new PedidoService();
        this.view = new PedidoView();
        this.whatsapp = new WhatsappService(); // Instância do serviço
        this.repository = PedidoRepository.getInstancia(); // Singleton

        this.service.inscrever((pedidoAtualizado) => {
            this.view.atualizar(pedidoAtualizado);
        });
    }

    adicionarItem() {
        const produtoEl = document.getElementById("produto");
        const qtdEl = document.getElementById("qtd");

        try {
            this.service.adicionarItem(produtoEl.value, qtdEl.value);
            qtdEl.value = "";
        } catch (error) {
            this.view.exibirMensagem(error.message);
        }
    }
    finalizarPedido() {
        const telClienteInput = document.getElementById("telUsuario");
        const telEstabelecimentoInput = document.getElementById("telEstabelecimento");

        // Pega os valores e limpa tudo que não for número
        const telefoneCliente = telClienteInput.value.replace(/\D/g, '');
        const telefoneEstabelecimento = telEstabelecimentoInput.value.replace(/\D/g, '');

        // Validações antes de enviar
        if (this.service.pedidoAtual.itens.length === 0) {
            this.view.exibirMensagem("Adicione itens antes de finalizar.");
            return;
        }

        if (!telefoneEstabelecimento) {
            this.view.exibirMensagem("Por favor, digite o número do estabelecimento!");
            return;
        }

        const resultado = this.service.finalizarPedido();

        this.repository.salvar(resultado);

        // Passa os DOIS números para o serviço
        this.whatsapp.enviarPedido(resultado, telefoneCliente, telefoneEstabelecimento);

        // Limpa a tela
        this.service.limparPedido();
        telClienteInput.value = "";
        telEstabelecimentoInput.value = "";
        this.view.exibirMensagem("Pedido enviado com sucesso!");
    }
}
