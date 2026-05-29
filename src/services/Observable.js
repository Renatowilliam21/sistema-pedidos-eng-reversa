export class Observable {
    constructor() {
        this.observadores = [];
    }

    inscrever(funcaoObservadora) {
        this.observadores.push(funcaoObservadora);
    }

    notificar(dados) {
        this.observadores.forEach(observador => observador(dados));
    }
}
