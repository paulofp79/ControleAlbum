-- ================================================================
-- Copa 2026 Panini — Schema Oracle
-- Execute no Database Actions > SQL Worksheet
-- ================================================================

-- Tabela de usuários
CREATE TABLE copa_users (
    id          VARCHAR2(60)    PRIMARY KEY,
    name        VARCHAR2(100)   NOT NULL,
    emoji       VARCHAR2(20)    DEFAULT '⚽',
    color       VARCHAR2(10)    DEFAULT '#1976D2',
    created_at  TIMESTAMP       DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de dados do álbum (counts armazenado como JSON)
CREATE TABLE copa_user_data (
    user_id     VARCHAR2(60)    PRIMARY KEY,
    counts      CLOB            DEFAULT '{}',
    updated_at  TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_data
        FOREIGN KEY (user_id)
        REFERENCES copa_users(id)
        ON DELETE CASCADE,
    CONSTRAINT chk_counts_json
        CHECK (counts IS JSON)
);

-- Índice auxiliar
CREATE INDEX idx_user_data_updated ON copa_user_data(updated_at);

-- Confirmação
SELECT 'Tabelas criadas com sucesso!' AS status FROM DUAL;
