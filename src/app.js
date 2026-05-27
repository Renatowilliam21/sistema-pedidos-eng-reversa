import { PedidoView } from './views/PedidoView.js';
import { PedidoController } from './controllers/PedidoController.js';

// Inicialização e acoplamento arquitetural limpo através do padrão MVC
document.addEventListener("DOMContentLoaded", () => {
  const view = new PedidoView();
  new PedidoController(view);
});