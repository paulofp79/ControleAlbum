-- ================================================================
-- Copa 2026 Panini — Configuração ORDS + CORS
-- Execute no Database Actions > SQL Worksheet
-- ================================================================

-- 1. Habilitar ORDS para o schema (mapeado em /ords/copa2026/)
BEGIN
    ORDS.ENABLE_SCHEMA(
        p_enabled             => TRUE,
        p_schema              => SYS_CONTEXT('USERENV', 'CURRENT_SCHEMA'),
        p_url_mapping_type    => 'BASE_PATH',
        p_url_mapping_pattern => 'copa2026',
        p_auto_rest_auth      => FALSE
    );
    COMMIT;
END;
/

-- 2. Auto REST na tabela de usuários  →  /ords/copa2026/users/
BEGIN
    ORDS.ENABLE_OBJECT(
        p_enabled         => TRUE,
        p_schema          => SYS_CONTEXT('USERENV', 'CURRENT_SCHEMA'),
        p_object          => 'COPA_USERS',
        p_object_type     => 'TABLE',
        p_object_alias    => 'users',
        p_auto_rest_auth  => FALSE
    );
    COMMIT;
END;
/

-- 3. Auto REST na tabela de dados  →  /ords/copa2026/userdata/
BEGIN
    ORDS.ENABLE_OBJECT(
        p_enabled         => TRUE,
        p_schema          => SYS_CONTEXT('USERENV', 'CURRENT_SCHEMA'),
        p_object          => 'COPA_USER_DATA',
        p_object_type     => 'TABLE',
        p_object_alias    => 'userdata',
        p_auto_rest_auth  => FALSE
    );
    COMMIT;
END;
/

-- 4. Habilitar CORS (permite acesso do GitHub Pages)
-- Execute SOMENTE se o item acima não bastou para acesso externo
DECLARE
    l_scope  VARCHAR2(100) := 'oracle.dbtools.autorest';
BEGIN
    ORDS_METADATA.SET_MODULE_CORS_SUPPORT(
        p_module_name     => NULL,
        p_support_enabled => TRUE
    );
    COMMIT;
EXCEPTION
    WHEN OTHERS THEN NULL; -- PL/SQL alternativo abaixo
END;
/

-- Alternativa CORS via módulo explícito (execute se o bloco acima falhar)
BEGIN
    ORDS.DEFINE_MODULE(
        p_module_name    => 'copa_cors_module',
        p_base_path      => '/cors/',
        p_items_per_page => 0,
        p_status         => 'PUBLISHED'
    );
    COMMIT;
EXCEPTION
    WHEN OTHERS THEN NULL;
END;
/

-- Confirmação
SELECT
    TABLE_NAME,
    'REST habilitado' AS status
FROM USER_TABLES
WHERE TABLE_NAME IN ('COPA_USERS','COPA_USER_DATA')
ORDER BY 1;
