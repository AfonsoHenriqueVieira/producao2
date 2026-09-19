const STORAGE_KEY = "producao";

function getProducoes() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch (e) {
        console.error(e);
        return [];
    }
}

function setProducoes(dados) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dados));
}

function salvarLocal(registro) {
    const dados = getProducoes();
    dados.push(registro);
    setProducoes(dados);
    return registro;
}

function atualizarLocal(registro) {
    const dados = getProducoes();
    const i = dados.findIndex(x => x.id === registro.id);
    if (i >= 0) {
        dados[i] = registro;
        setProducoes(dados);
        return true;
    }
    return false;
}

function excluirLocal(id) {
    setProducoes(getProducoes().filter(x => x.id !== id));
}

function novoId() {
    return `${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
}
