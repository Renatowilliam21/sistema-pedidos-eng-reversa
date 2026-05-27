<?php

require_once 'controllers/PedidoController.php';
require_once 'controllers/CursoController.php';
require_once 'controllers/ProdutoController.php';
require_once 'controllers/AlunoController.php';      // Incluído
require_once 'controllers/DisciplinaController.php'; // Incluído

$pedidoController = new PedidoController();
$cursoController = new CursoController();
$produtoController = new ProdutoController();
$alunoController = new AlunoController();           // Instanciado
$disciplinaController = new DisciplinaController(); // Instanciado

$action = $_GET['action'] ?? '';

// --- ROTAS DO SISTEMA DE PEDIDOS (ORIGINAL) ---
if ($action == "listar") { $pedidoController->listar(); }
if ($action == "adicionar") {
    $tipoProduto = $_POST['produto'];
    $quantidade = $_POST['quantidade'];
    $pedidoController->adicionar($tipoProduto, $quantidade);
}
if ($action == "finalizar") { $pedidoController->finalizar(); }


// --- ROTAS DOS EXERCÍCIOS DE CURSOS (1 ao 5) ---
if ($action == "cursos") { echo $cursoController->index(); }
if ($action == "cursos_novo") { echo $cursoController->create(); }
if ($action == "cursos_listagem") { echo $cursoController->listagem(); }
if ($action == "cursos_show") {
    $id = $_GET['id'] ?? 0;
    echo $cursoController->show($id);
}
if ($action == "cursos_store") {
    $nome = $_POST['nome'] ?? 'Sem nome';
    echo $cursoController->store($nome);
}


// --- ROTAS DA ATIVIDADE DE PRODUTOS ---
if ($action == "produtos_create") { echo $produtoController->create(); }
if ($action == "produtos_store") {
    $nome = $_POST['nome'] ?? 'Sem nome';
    echo $produtoController->store($nome);
}


// --- ROTAS DO EXERCÍCIO 6: ALUNO RESOURCE (CRUD) ---
if ($action == "alunos") { echo $alunoController->index(); }
if ($action == "alunos_novo") { echo $alunoController->create(); }
if ($action == "alunos_store") {
    $nome = $_POST['nome'] ?? 'Sem nome';
    echo $alunoController->store($nome);
}
if ($action == "alunos_show") {
    $id = $_GET['id'] ?? 0;
    echo $alunoController->show($id);
}


// --- ROTAS DO EXERCÍCIO 7: DESAFIO DISCIPLINAS ---
if ($action == "disciplinas") { echo $disciplinaController->listagem(); }
if ($action == "disciplinas_novo") { echo $disciplinaController->create(); }
if ($action == "disciplinas_show") {
    $id = $_GET['id'] ?? 0;
    echo $disciplinaController->show($id);
}
