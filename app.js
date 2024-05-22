const express = require('express')
const {engine} = require('express-handlebars')
const bp = require('body-parser')
const session = require('express-session');
const flash = require('express-flash');
const multer = require('multer')



const app = express()
const upload = multer({dest: 'public/DOCS'})

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')
app.use(bp.urlencoded({extended: true}))
app.use(bp.json())
app.use(express.static('public'));

app.use(session({
    secret: 'chaveSuseg', 
    resave: false,
    saveUninitialized: true
}));

app.use(flash());



let cotacoes = [];
let mensagens = [];
const Mensagem = require('./models/mensagem');
const Cotacao = require('./models/cotacao');

app.get('/', (req, res)=>{
    res.render('home', { 'sucesso-cotacao': req.flash('sucesso-cotacao') })
})

app.get('/contato', (req, res)=>{
    res.render('contato')
})

app.get('/seu-seguro', (req, res)=>{
    res.render('seu-seguro')
})

app.get('/cotacao-auto', (req, res)=>{
    res.render('cotacao-auto')
})

app.get('/atendimento', (req, res)=>{
    res.render('atendimento')
})

app.get('/sobre-nos', (req, res)=>{
    res.render('sobre-nos')
})

app.post('/cotacao-auto', upload.single('docVeic'), async (req, res) => {
    try {
        const nome = req.body.nome;
        const email = req.body.email;
        const telefone = req.body.telefone.replace(/\D/g, '');
        const cpf = req.body.CPF.replace(/\D/g, '');
        const opcaoVeiculo = req.body.btnVeiculo;
        const estadoCivil = req.body['itens_EstadoCivil'];
        const dtNascimento = req.body.dataNascimento;
        const cep = req.body.cep.replace(/\D/g, '');
        const placa = req.body.placa.replace(/\D/g, '');
        const chassis = req.body.chassis;
        const documento = req.file.filename;
        const marcaNome = req.body.marcaNome;
        const marcaCodigo = req.body.marca;
        const modeloNome = req.body.modeloNome;
        const modeloCodigo = req.body.modelo;
        const anoNome = req.body.anoNome;
        const anoCodigo = req.body.anos;
        const possuiSeguro = req.body.btnPossuiSeguro;
        const possuiGaragem = req.body.btnPossuiGaragen;
        const isZeroKm = req.body.btnIsZeroKm;

        const cotacao = {
            nome: nome,
            email: email,
            telefone: telefone,
            cpf: cpf,
            opcaoVeiculo: opcaoVeiculo,
            estadoCivil: estadoCivil,
            dtNascimento: dtNascimento,
            cep: cep,
            placa: placa,
            chassis: chassis,
            documento: documento,
            marcaNome: marcaNome,
            marcaCodigo: marcaCodigo,
            modeloNome: modeloNome,
            modeloCodigo: modeloCodigo,
            anoNome: anoNome,
            anoCodigo: anoCodigo,
            possuiSeguro: possuiSeguro,
            possuiGaragem: possuiGaragem,
            isZeroKm: isZeroKm
        };

        // Salvar a cotação no banco de dados usando Sequelize
        const novaCotacao = await Cotacao.create(cotacao);

        // Adicionar a cotação ao array de cotações temporárias
        cotacoes.push(novaCotacao);

        console.log(cotacoes);

        req.flash('sucesso-cotacao', 'Sua solicitação de cotação foi enviada. Por favor, aguarde o retorno por E-Mail e/ou WhatsApp!');

        res.redirect('/');
    } catch (error) {
        console.error('Erro ao salvar a cotação:', error);
        res.status(500).send('Erro ao salvar a cotação.');
    }
});



app.post('/contato', async (req, res) => {
    const nome = req.body.name;
    const email = req.body.email;
    const cep = req.body.cep.replace(/\D/g, '');
    const estado = req.body.estado;
    const cidade = req.body.cidade;
    const assunto = req.body.assunto;
    const telefone = req.body.telefone.replace(/\D/g, '');
    const mensagemText = req.body.mensagem;

    // Criar um objeto mensagem com todos os dados recebidos
    const mensagem = {
        nome: nome,
        email: email,
        cep: cep,
        estado: estado,
        cidade: cidade,
        assunto: assunto,
        telefone: telefone,
        mensagemText: mensagemText
    };

    try {
        // Salvar a mensagem no banco de dados usando Sequelize
        const novaMensagem = await Mensagem.create(mensagem);
        
        // Adicionar a mensagem ao array de mensagens temporárias
        mensagens.push(novaMensagem);

        console.log(mensagens);
        res.render('contato', { mensagens });
    } catch (error) {
        console.error('Erro ao salvar a mensagem:', error);
        res.status(500).send('Erro ao salvar a mensagem.');
    }
});


app.listen(5500, ()=>{
    console.log("Rodei a porra do sistema no carai da porta http://localhost:5500")
})