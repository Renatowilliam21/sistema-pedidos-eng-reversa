class DatabaseRepository:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(DatabaseRepository, cls).__new__(cls)
        return cls._instance

    def salvar(self, pedido):
        print("Salvando pedido no JSON Server...")