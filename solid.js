// ==========================================
// QUESTÃO 4 - Estratégias de Desconto (OCP)
// ==========================================
class EstrategiaDesconto {
    aplicar(total) {
        return total;
    }
}

class DescontoVip extends EstrategiaDesconto {
    aplicar(total) {
        return total * 0.8;
    }
}

class DescontoCupom10 extends EstrategiaDesconto {
    aplicar(total) {
        return total * 0.9;
    }
}

class SemDesconto extends EstrategiaDesconto {
    aplicar(total) {
        return total;
    }
}

class CalculadoraDesconto {
    calcular(total, estrategiaDesconto) {
        return estrategiaDesconto.aplicar(total);
    }
}


// ==========================================
// QUESTÃO 11 - Segregação de Interfaces (ISP)
// ==========================================
class Imprimivel {
    imprimir(conteudo) {
        throw new Error("Método imprimir não implementado");
    }
}

class Exportavel {
    exportar(conteudo) {
        throw new Error("Método exportar não implementado");
    }
}


// ==========================================
// QUESTÃO 12 - Classe Pedido Refatorada (DIP)
// ==========================================
class Pedido {
    constructor(id, cliente, itens, repository, notificationService) {
        this.id = id;
        this.cliente = cliente;
        this.itens = itens;
        this.status = 'pendente';
        // Injeção de dependências
        this.repository = repository;
        this.notificationService = notificationService;
    }

    calcularTotal() {
        return this.itens.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
    }

    salvar() {
        this.repository.salvar(this);
    }

    notificarCliente() {
        this.notificationService.enviar(this.cliente.email, `Pedido ${this.id} confirmado!`);
    }
}


// ==========================================
// QUESTÃO 13 - Simulação de Teste com Mocks
// ==========================================
// Criando os mocks para Injeção de Dependência
const repositoryMock = {
    chamouSalvar: false,
    salvar(pedido) {
        this.chamouSalvar = true;
    }
};

const notificationMock = {
    enviar(email, mensagem) {
        // Simula o envio de notificação
    }
};

// Instanciando o pedido com os mocks
const pedido = new Pedido(
    1,
    { email: 'teste@email.com' },
    [], // Lista de itens vazia para o teste
    repositoryMock,
    notificationMock
);

// Acionando o método salvar
pedido.salvar();

// Validando se o mock do repositório foi chamado corretamente
console.assert(repositoryMock.chamouSalvar === true, "Erro: O repositório deveria ter sido acionado.");
