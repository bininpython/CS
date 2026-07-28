-- Script SQL para criar as tabelas no Supabase

-- Tabela de Colaboradores
CREATE TABLE colaboradores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome TEXT NOT NULL,
    registro TEXT NOT NULL,
    equipamento TEXT NOT NULL,
    status TEXT NOT NULL,
    numero_folga INTEGER NOT NULL,
    aniversario TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Solicitações de Folga
CREATE TABLE solicitacoes_folga (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    colaborador_id UUID REFERENCES colaboradores(id) ON DELETE CASCADE,
    nome TEXT NOT NULL,
    turno TEXT NOT NULL,
    equipamento TEXT NOT NULL,
    data TEXT NOT NULL,
    motivo TEXT,
    status TEXT NOT NULL DEFAULT 'Pendente',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Solicitações de Férias
CREATE TABLE solicitacoes_ferias (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    colaborador_id UUID REFERENCES colaboradores(id) ON DELETE CASCADE,
    nome TEXT NOT NULL,
    turno TEXT NOT NULL,
    equipamento TEXT NOT NULL,
    mes INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pendente',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Alocações (Postos de Trabalho)
CREATE TABLE alocacoes_postos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    equipamento TEXT NOT NULL,
    posto TEXT NOT NULL,
    folga_sequence INTEGER NOT NULL,
    texto TEXT NOT NULL,
    mes INTEGER,
    ano INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(equipamento, posto, folga_sequence)
);

-- Habilitando RLS (Opcional, mas recomendado)
ALTER TABLE colaboradores ENABLE ROW LEVEL SECURITY;
ALTER TABLE solicitacoes_folga ENABLE ROW LEVEL SECURITY;
ALTER TABLE solicitacoes_ferias ENABLE ROW LEVEL SECURITY;
ALTER TABLE alocacoes_postos ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso público para prototipação (PERMITE TUDO - altere em produção)
CREATE POLICY "Permitir leitura pública colaboradores" ON colaboradores FOR SELECT USING (true);
CREATE POLICY "Permitir escrita pública colaboradores" ON colaboradores FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir update público colaboradores" ON colaboradores FOR UPDATE USING (true);
CREATE POLICY "Permitir delete público colaboradores" ON colaboradores FOR DELETE USING (true);

CREATE POLICY "Permitir leitura pública folgas" ON solicitacoes_folga FOR SELECT USING (true);
CREATE POLICY "Permitir escrita pública folgas" ON solicitacoes_folga FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir update pública folgas" ON solicitacoes_folga FOR UPDATE USING (true);
CREATE POLICY "Permitir delete pública folgas" ON solicitacoes_folga FOR DELETE USING (true);

CREATE POLICY "Permitir leitura pública ferias" ON solicitacoes_ferias FOR SELECT USING (true);
CREATE POLICY "Permitir escrita pública ferias" ON solicitacoes_ferias FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir update pública ferias" ON solicitacoes_ferias FOR UPDATE USING (true);
CREATE POLICY "Permitir delete pública ferias" ON solicitacoes_ferias FOR DELETE USING (true);

CREATE POLICY "Permitir leitura pública alocacoes" ON alocacoes_postos FOR SELECT USING (true);
CREATE POLICY "Permitir escrita pública alocacoes" ON alocacoes_postos FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir update pública alocacoes" ON alocacoes_postos FOR UPDATE USING (true);
CREATE POLICY "Permitir delete pública alocacoes" ON alocacoes_postos FOR DELETE USING (true);
