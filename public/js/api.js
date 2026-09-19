const API_BASE = "/api";

async function enviarParaServidor(registro) {
    try {
        const r = await fetch(`${API_BASE}/producoes`, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(registro)
        });
        if (!r.ok) throw new Error("API não disponível");
        return await r.json();
    } catch (e) {
        console.warn("Modo local: servidor MySQL não conectado.", e);
        return null;
    }
}

async function atualizarNoServidor(registro) {
    try {
        const r = await fetch(`${API_BASE}/producoes/${encodeURIComponent(registro.id)}`, {
            method: "PUT",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(registro)
        });
        if (!r.ok) throw new Error("Falha na atualização");
        return await r.json();
    } catch (e) {
        console.warn(e);
        return null;
    }
}
