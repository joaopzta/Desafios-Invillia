CREATE TABLE Pessoa (
	codigo BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(80) NOT NULL,
    cidade VARCHAR(100),
    uf VARCHAR(2),
	email VARCHAR(100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO Pessoa (nome, cidade, uf, email) VALUES ('Paulo Amaral', 'João Pessoa', 'PA', 'paulo.amaral@gmail.com');
INSERT INTO Pessoa (nome, cidade, uf, email) VALUES ('Maria Joana', 'Petralha', 'RO', 'maria.joana@gmail.com');
INSERT INTO Pessoa (nome, cidade, uf, email) VALUES ('Jonas Almeida','Coral', 'MT', 'jonas.almeida@gmail.com');