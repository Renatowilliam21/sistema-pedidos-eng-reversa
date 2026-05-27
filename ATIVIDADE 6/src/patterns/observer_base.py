from abc import ABC, abstractmethod

class ViewObserver(ABC):
    @abstractmethod
    def update(self, pedido):
        pass

class Subject:
    def __init__(self):
        self._observers = []

    def anexar(self, observer):
        self._observers.append(observer)

    def notificar(self, pedido):
        for observer in self._observers:
            observer.update(pedido)