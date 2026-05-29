import { PedidoService } from '../services/PedidoService.js';
import { PedidoView } from '../views/PedidoView.js';
import { WhatsappService } from '../services/WhatsappService.js';
import { PedidoRepository } from '../repositories/PedidoRepository.js';

export class PedidoController {
    constructor() {
        this.service = new PedidoService();
        this.view = new PedidoView();
        this.whatsapp = new WhatsappService();
        this.repository = PedidoRepository.getInstancia(); 

        this.service.inscrever((pedidoAtualizado) => {
            this.view.atualizar(pedidoAtualizado);
        });

        // O Controller avisa à View quais funções rodar quando clicarem nos botões
        this.view.bindAdicionarItem(() => this.adicionarItem());
        this.view.bindFinalizarPedido(() => this.finalizarPedido());
    }

    adicionarItem() {
        const dados = this.view.getDadosItem(); // Pede os dados para a View

        try {
            this.service.adicionarItem(dados.produto, dados.quantidade);
            this.view.limparCampos();
        } catch (error) {
            this.view.exibirMensagem(error.message);
        }
    }

    finalizarPedido() {
        const telefones = this.view.getTelefones(); // Pede os telefones para a View

        if (this.service.pedidoAtual.itens.length === 0) {
            this.view.exibirMensagem("Adicione itens antes de finalizar.");
            return;
        }

        if (!telefones.estabelecimento) {
            this.view.exibirMensagem("Por favor, digite o número do estabelecimento!");
            return;
        }

        const resultado = this.service.finalizarPedido();
        this.repository.salvar(resultado);

        this.whatsapp.enviarPedido(resultado, telefones.cliente, telefones.estabelecimento);

        this.service.limparPedido();
        this.view.limparTelefones();
        this.view.exibirMensagem("Pedido enviado com sucesso!");
    }
}