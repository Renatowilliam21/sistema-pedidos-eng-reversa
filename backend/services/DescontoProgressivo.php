<?php

require_once 'DescontoStrategy.php';

class DescontoProgressivo implements DescontoStrategy {
    public function calcular($total) {

        if ($total > 100) {
            return $total * 0.8;
        }

        if ($total > 50) {
            return $total * 0.9;
        }

        return $total;
    }
}
