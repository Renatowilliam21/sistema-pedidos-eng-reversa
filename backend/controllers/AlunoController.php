<?php

class AlunoController 
{
    // Listar todos os alunos (index)
    public function index() 
    {
        return "Simulando CRUD Alunos: Listando todos os alunos registrados.";
    }

    // Exibir o formulário de criação (create)
    public function create() 
    {
        return "Simulando CRUD Alunos: Exibindo formulário de cadastro de aluno.";
    }

    // Simular o salvamento dos dados (store)
    public function store($nome) 
    {
        return "Simulando CRUD Alunos: Aluno '{$nome}' salvo com sucesso!";
    }

    // Exibir um aluno específico por ID (show)
    public function show($id) 
    {
        return "Simulando CRUD Alunos: Exibindo detalhes do aluno com ID " . $id;
    }
}
