from abc import ABC, abstractmethod

class EstrategiaDesconto(ABC):
    @abstractmethod
    def aplicar(self, valor):
        pass

class DescontoNatal(EstrategiaDesconto):
    def aplicar(self, valor):
        return valor * 0.90