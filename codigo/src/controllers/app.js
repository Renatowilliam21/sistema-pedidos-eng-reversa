import { PedidoService } from '../modules/orders/services/PedidoService.js';
import { PedidoController } from '../modules/orders/controllers/PedidoController.js';
import { PedidoView } from '../views/PedidoView.js';

const service = new PedidoService();
const controller = new PedidoController(service);
const view = new PedidoView(controller);

controller.setView(view);
console.log("[SISTEMA]: Inicializado com sucesso na Arquitetura Modular por Módulos.");