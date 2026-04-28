<?php

require_once 'Observer.php';

class LoggerObserver implements Observer {

    public function update($data) {
        file_put_contents("log.txt", json_encode($data) . PHP_EOL, FILE_APPEND);
    }
}
