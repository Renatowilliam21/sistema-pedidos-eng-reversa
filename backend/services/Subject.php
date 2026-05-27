<?php

class Subject {

    private $observers = [];

    public function addObserver($observer) {
        $this->observers[] = $observer;
    }

    public function notify($data) {
        foreach ($this->observers as $observer) {
            $observer->update($data);
        }
    }
}
