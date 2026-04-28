<?php

require_once __DIR__ . '/../services/DescontoProgressivo.php';

$strategy = new DescontoProgressivo();

// Teste 1: acima de 100 → 20% de desconto
$resultado = $strategy->calcular(200);
if ($resultado == 160) {
    echo "TESTE DESCONTO ACIMA DE 100 OK\n";
} else {
    echo "FALHA - Valor: " . $resultado . "\n";
}

// Teste 2: entre 50 e 100 → 10% de desconto
$resultado = $strategy->calcular(80);
if ($resultado == 72) {
    echo "TESTE DESCONTO ENTRE 50 E 100 OK\n";
} else {
    echo "FALHA - Valor: " . $resultado . "\n";
}

// Teste 3: abaixo de 50 → sem desconto
$resultado = $strategy->calcular(30);
if ($resultado == 30) {
    echo "TESTE SEM DESCONTO OK\n";
} else {
    echo "FALHA - Valor: " . $resultado . "\n";
}
