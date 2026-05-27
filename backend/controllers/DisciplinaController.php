<?php

class DisciplinaController 
{
    // Listar as disciplinas com envio de dados simulado
    public function listagem() 
    {
        $disciplinas = ["Programação Web I", "Engenharia de Software", "Banco de Dados"];
        $html = "<h1>Desafio: Disciplinas</h1><ul>";
        foreach ($disciplinas as $d) {
            $html .= "<li>{$d}</li>";
        }
        $html .= "</ul>";
        return $html;
    }

    // Formulário de cadastro de disciplina
    public function create() 
    {
        return "Desafio Disciplinas: Exibindo formulário de nova disciplina.";
    }

    // Visualizar disciplina específica por ID
    public function show($id) 
    {
        return "Desafio Disciplinas: Exibindo disciplina de ID " . $id;
    }
}
