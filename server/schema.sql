CREATE DATABASE IF NOT EXISTS controle_producao
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE controle_producao;

CREATE TABLE IF NOT EXISTS producao (
    id VARCHAR(60) PRIMARY KEY,
    linha VARCHAR(10) NOT NULL,
    codigo_produto VARCHAR(30) NOT NULL,
    etiqueta_inicial INT NOT NULL,
    etiqueta_final INT NOT NULL,
    formato_palete INT NOT NULL,
    sobra INT NOT NULL DEFAULT 0,
    refugo_maculatura DECIMAL(12,3) NOT NULL DEFAULT 0,
    refugo_filme_impresso DECIMAL(12,3) NOT NULL DEFAULT 0,
    refugo_filme_liso DECIMAL(12,3) NOT NULL DEFAULT 0,
    refugo_papel DECIMAL(12,3) NOT NULL DEFAULT 0,
    quantidade_paletes INT NOT NULL,
    quantidade_produzida INT NOT NULL,
    peso_total_refugo DECIMAL(12,3) NOT NULL DEFAULT 0,
    responsavel VARCHAR(150) NOT NULL,
    data_hora DATETIME NOT NULL
);
