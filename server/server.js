require("dotenv").config();
const express = require("express");
const path = require("path");
const pool = require("./db");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.post("/api/producoes", async (req, res) => {
    try {
        const r = req.body;
        const sql = `
        INSERT INTO producao
        (id,linha,codigo_produto,etiqueta_inicial,etiqueta_final,formato_palete,sobra,
         refugo_maculatura,refugo_filme_impresso,refugo_filme_liso,refugo_papel,
         quantidade_paletes,quantidade_produzida,peso_total_refugo,responsavel,data_hora)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
        ON DUPLICATE KEY UPDATE
        linha=VALUES(linha), codigo_produto=VALUES(codigo_produto),
        etiqueta_inicial=VALUES(etiqueta_inicial), etiqueta_final=VALUES(etiqueta_final),
        formato_palete=VALUES(formato_palete), sobra=VALUES(sobra),
        refugo_maculatura=VALUES(refugo_maculatura),
        refugo_filme_impresso=VALUES(refugo_filme_impresso),
        refugo_filme_liso=VALUES(refugo_filme_liso), refugo_papel=VALUES(refugo_papel),
        quantidade_paletes=VALUES(quantidade_paletes),
        quantidade_produzida=VALUES(quantidade_produzida),
        peso_total_refugo=VALUES(peso_total_refugo), responsavel=VALUES(responsavel),
        data_hora=VALUES(data_hora)`;

        const values = [
            r.id,r.linha,r.codigoProduto,r.etiquetaInicial,r.etiquetaFinal,r.formatoPalete,r.sobra,
            r.refugoMaculatura,r.refugoFilmeImpresso,r.refugoFilmeLiso,r.refugoPapel,
            r.quantidadePaletes,r.quantidadeProduzida,r.pesoTotalRefugo,r.responsavel,r.dataHora
        ];
        await pool.execute(sql, values);
        res.json({ok:true, id:r.id});
    } catch (e) {
        console.error(e);
        res.status(500).json({ok:false,error:"Erro ao salvar no MySQL"});
    }
});

app.put("/api/producoes/:id", async (req,res) => {
    req.body.id = req.params.id;
    req.url = "/api/producoes";
    // Reaproveita a lógica através de uma query direta.
    try {
        const r=req.body;
        const sql=`UPDATE producao SET linha=?,codigo_produto=?,etiqueta_inicial=?,etiqueta_final=?,
        formato_palete=?,sobra=?,refugo_maculatura=?,refugo_filme_impresso=?,refugo_filme_liso=?,
        refugo_papel=?,quantidade_paletes=?,quantidade_produzida=?,peso_total_refugo=?,responsavel=?,
        data_hora=? WHERE id=?`;
        await pool.execute(sql,[r.linha,r.codigoProduto,r.etiquetaInicial,r.etiquetaFinal,r.formatoPalete,
        r.sobra,r.refugoMaculatura,r.refugoFilmeImpresso,r.refugoFilmeLiso,r.refugoPapel,
        r.quantidadePaletes,r.quantidadeProduzida,r.pesoTotalRefugo,r.responsavel,r.dataHora,r.id]);
        res.json({ok:true,id:r.id});
    } catch(e) {
        console.error(e); res.status(500).json({ok:false});
    }
});

app.get("/api/producoes", async (req,res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM producao ORDER BY data_hora DESC");
        res.json(rows);
    } catch(e) {
        console.error(e); res.status(500).json({error:"Erro ao consultar MySQL"});
    }
});

const PORT = Number(process.env.PORT || 3000);
app.listen(PORT, () => console.log(`Servidor: http://localhost:${PORT}`));
