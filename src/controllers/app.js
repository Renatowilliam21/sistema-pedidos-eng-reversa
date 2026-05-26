import { PedidoService } from '../services/PedidoService.js';
import { PedidoController } from './PedidoController.js';
import { PedidoView } from '../views/PedidoView.js';

// Inicializa o sistema unindo as camadas
const service = new PedidoService();
const controller = new PedidoController(service);
const view = new PedidoView(controller);

controller.setView(view);