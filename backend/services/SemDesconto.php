<?php

require_once 'DescontoStrategy.php';

class SemDesconto implements DescontoStrategy {
    public function calcular($total) {
        return $total;
    }
}
