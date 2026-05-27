<?php

class CursoController 
{
    // Exercício 1: Retornar a mensagem "Lista de cursos"
    public function index() 
    {
        return "Lista de cursos";
    }

    // Exercício 2: Retornar a view cursos.create (Simulando)
    public function create() 
    {
        return "Simulando renderização da view: Cadastro de Curso";
    }

    // Exercício 3: Envio de dados (Array de pelo menos 3 cursos)
    public function listagem() 
    {
        $cursos = ["Análise e Desenvolvimento de Sistemas", "Redes de Computadores", "Sistemas de Informação"];
        
        // Simulando a exibição com foreach
        $html = "<h1>Listagem de Cursos</h1><ul>";
        foreach ($cursos as $curso) {
            $html .= "<li>{$curso}</li>";
        }
        $html .= "</ul>";
        return $html;
    }

    // Exercício 4: Controller com Parâmetro ID
    public function show($id) 
    {
        return "Curso selecionado: ID " . $id;
    }
}

    // Exercício 5: Receber dados via POST (Simulado)
    public function store($nome) 
    {
        return "Curso cadastrado com sucesso: " . $nome;
    }
