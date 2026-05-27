<?php

class ProdutoController 
{
    // Exibe o formulário simulado (GET)
    public function create() 
    {
        return "Simulando formulário de Produto em /produtos/create";
    }

    // Recebe o dado simples (POST)
    public function store($nome) 
    {
        return "Produto cadastrado com sucesso: " . $nome;
    }
}
