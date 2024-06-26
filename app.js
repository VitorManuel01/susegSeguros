const express = require('express')
const { engine } = require('express-handlebars')
const bp = require('body-parser')
const session = require('express-session');
const flash = require('express-flash');
const multer = require('multer')
const passport = require('./config/passportConfig')




const app = express()
const upload = multer({ dest: 'public/DOCS' })

app.engine('handlebars', engine({
    defaultLayout: 'main', // Especifique o layout padrão se necessário
    extname: '.handlebars', // Especifique a extensão dos arquivos de template
    runtimeOptions: {
      allowProtoMethodsByDefault: true,
      allowProtoPropertiesByDefault: true,
    }
  }));

app.set('view engine', 'handlebars')
app.set('views', './views')
app.use(bp.urlencoded({ extended: true }))
app.use(bp.json())
app.use(express.static('public'));

app.use(session({
    secret: 'chaveSuseg',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 600000}
}));

app.use(flash());

app.use(passport.session());
app.use(passport.initialize());



const User = require('./models/user');

app.post('/login', passport.authenticate('local', { 
    successRedirect: "/adm",
    failureRedirect: "/login", // Redirect back to login page on failure
    failureFlash: true // Enable flash messages for failure cases
}));

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/login');
    }

}

function isLoggedInRegister(req, res, next) {
    if (req.isAuthenticated()) {
        // Verificar se o usuário é administrador (exemplo: isAdmin)
        User.findByPk(req.user.id)
            .then(user => {
                if (!user) {
                    throw new Error('Usuário não encontrado');
                }
                if (user.isAdmin || user.isMasterAdmin) {
                    return next(); // Permite o acesso à rota de registro
                } else {
                    // Caso o usuário não seja administrador, define um alerta
                    req.session.alertMessage = 'Você não possui permissão para isso.';
                    res.redirect('/adm')
                }
            })
            .catch(err => {
                console.error('Erro ao encontrar usuário:', err);
                res.redirect('/login'); // Em caso de erro, redireciona para o login
            });
    } else {
        res.redirect('/login'); // Se não autenticado, redireciona para a página de login
    }
}

// Example route for login page
app.get('/login', (req, res) => {
    
    res.render('login'); // Render your login form view (e.g., login.ejs)
});

// Example route for logout
app.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});



let cotacoes = [];
let mensagens = [];
let apolices = [];
const Mensagem = require('./models/mensagem');
const Cotacao = require('./models/cotacao');
const Apolice = require('./models/apolice');

app.get('/', (req, res) => {
    res.render('home', { 'sucesso': req.flash('sucesso') })
})

app.get('/adm',isLoggedIn, (req, res) => {
    res.render('adm', { alertMessage: req.session.alertMessage });
    
    // Limpa a variável de sessão após renderizar para que o alerta só seja exibido uma vez
    req.session.alertMessage = null;
})

app.get('/contato', (req, res) => {
    res.render('contato')
})

app.get('/seu-seguro', (req, res) => {
    res.render('seu-seguro')
})

app.get('/cotacao-auto', (req, res) => {
    res.render('cotacao-auto')
})

app.get('/atendimento', (req, res) => {
    res.render('atendimento')
})

app.get('/sobre-nos', (req, res) => {
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
        const placa = req.body.placa;
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

        req.flash('sucesso', 'Sua solicitação de cotação foi enviada. Por favor, aguarde o retorno por E-Mail e/ou WhatsApp!');

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
        req.flash('sucesso', 'Sua mensagem foi enviada! Obrigado pelo contato!');

        res.redirect('/');
    } catch (error) {
        console.error('Erro ao salvar a mensagem:', error);
        res.status(500).send('Erro ao salvar a mensagem.');
    }
});

app.get('/adm/register', isLoggedInRegister,(req, res) => {
    res.render('register'); // Ensure 'register' corresponds to your HTML form view
});

// POST route for handling registration
app.post('/adm/register', isLoggedInRegister, async (req, res) => {
    try {
        const { nome, email, senha, funcao, isAdmin} = req.body;

        // Convert checkbox values to boolean
        const isAdminValue = isAdmin === 'on';

        await User.create({
            nome,
            email,
            senha, // Save the hashed password
            funcao,
            isAdmin: isAdminValue
        }).then();
        res.redirect('/login');
    } catch (err) {
        console.error('Error:', err);
        res.redirect('/adm/register');
    }
});

app.get('/adm/cotacoes', isLoggedIn, async (req, res) => {
    try {
      let cotacao = await Cotacao.findAll(); 
  
      res.render('cotacoes', { cotacao }); 
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao buscar cotaçoes.' });
    }
});

app.get('/adm/registrarApolice/:id', isLoggedIn, async(req, res)=>{
    try {
        const id = req.params.id
        let cotacao = await Cotacao.findByPk(id) 
        res.render('registrarApolice', { cotacao });
    } catch (error) {
        console.log(error)
        
    }
});

app.get('/adm/registrarApolice', isLoggedIn, async(req, res)=>{
        res.render('registrarApolice');
});

app.get('/adm/apolices', isLoggedIn, async (req, res) => {
    try {
      let apolices = await Apolice.findAll(); 
  
      res.render('apolices', { apolices }); 
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao buscar cotaçoes.' });
    }
});

app.post('/adm/registrarApolice', async (req, res) => {
    const {
        numeroApolice,
        dataInicioVigencia,
        codigoCI,
        dataEmissao,
        item,
        dataFinalVigencia,
        classeBonus,
        seguradoNome,
        seguradoSexo,
        seguradoRG,
        seguradoEndereco,
        seguradoBairro,
        seguradoCidade,
        seguradoFoneResidencial,
        seguradoFoneComercial,
        seguradoDtNascimento,
        seguradoCPF,
        seguradoEstado,
        seguradoCEP,
        seguradoCelular,
        seguradoEmail,
        veiculoNome,
        veiculoCodigoFIPE,
        veiculoAno,
        veiculoModelo,
        veiculoCombustivel,
        veiculoCapacidade,
        veiculoPortas,
        veiculoCambioAutomatico,
        veiculoChassis,
        veiculoPlaca,
        veiculoRenavam,
        veiculoAlienado,
        veiculoUso,
        veiculoCategoriaTarifaria,
        nomeCorretor,
        susepOficial,
        susepSeguradora,
        telefoneCorretora,
        emailCorretora
    } = req.body;

    // Criar um objeto com todos os dados recebidos
    const apolice = {
        numeroApolice,
        dataInicioVigencia,
        codigoCI,
        dataEmissao,
        item,
        dataFinalVigencia,
        classeBonus,
        seguradoNome,
        seguradoSexo,
        seguradoRG,
        seguradoEndereco,
        seguradoBairro,
        seguradoCidade,
        seguradoFoneResidencial,
        seguradoFoneComercial,
        seguradoDtNascimento,
        seguradoCPF,
        seguradoEstado,
        seguradoCEP,
        seguradoCelular,
        seguradoEmail,
        veiculoNome,
        veiculoCodigoFIPE,
        veiculoAno,
        veiculoModelo,
        veiculoCombustivel,
        veiculoCapacidade,
        veiculoPortas,
        veiculoCambioAutomatico,
        veiculoChassis,
        veiculoPlaca,
        veiculoRenavam,
        veiculoAlienado,
        veiculoUso,
        veiculoCategoriaTarifaria,
        nomeCorretor,
        susepOficial,
        susepSeguradora,
        telefoneCorretora,
        emailCorretora
    };

    try {
        // Salvar a apólice no banco de dados usando Sequelize
        const novaApolice = await Apolice.create(apolice);

        // Redirecionar para a página de apólices após o salvamento
        res.redirect('/adm/apolices');
    } catch (error) {
        console.error('Erro ao salvar a apólice:', error);
        res.status(500).send('Erro ao salvar a apólice.');
    }
});

app.get('/adm/allUsers', isLoggedInRegister, async (req, res) => {
    try {
      const users = await User.findAll(); // Busca todos os usuários

      const filtroUsers = users.filter(user => !user.isMasterAdmin);
  
      res.render('allUsers', { filtroUsers }); // Renderiza a página allUsers com os usuários
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
});




// Rota para editar um usuário
app.get('/adm/updateUser/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await User.findByPk(id); // Busca o usuário pelo ID
  
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }
  
      res.render('updateUser', { user }); // Renderiza a página editUser com o usuário encontrado
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao buscar usuário.' });
    }
  });

// Rota para processar a atualização do usuário (requisição POST)
app.post('/adm/updateUser/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, email, role, isAdmin, isIntern } = req.body;
  
      const user = await User.findByPk(id); // Encontra o usuário pelo ID
  
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }
  
      // Atualiza os dados do usuário com os novos valores
      user.nome = nome;
      user.email = email;
      user.role = role;
      user.isAdmin = !!isAdmin; // Converte para booleano
      user.isIntern = !!isIntern; // Converte para booleano
  
      await user.save(); // Salva as alterações no banco de dados
  
      res.redirect('/adm/allUsers'); // Redireciona para a lista de usuários após a edição
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao atualizar usuário.' });
    }
  });
  
  // Rota para renderizar o formulário de deleção de usuário
app.get('/adm/deleteUser/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id); // Encontra o usuário pelo ID
  
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }
  
      res.render('deleteUser', { user }); // Renderiza o template deleteUser com os dados do usuário
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao buscar usuário.' });
    }
  });

  app.get('/adm/deleteApolice/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const apolice = await Apolice.findByPk(id); 
  
      if (!apolice) {
        return res.status(404).json({ error: 'Apólice não encontrada.' });
      }
  
      res.render('deleteApolice', { apolice });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao buscar apólice.' });
    }
  });

  app.get('/adm/deleteCotacao/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const cotacao = await Cotacao.findByPk(id); 
  
      if (!cotacao) {
        return res.status(404).json({ error: 'Cotação não encontrada.' });
      }
  
      res.render('deleteCotacao', { cotacao });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao buscar cotação.' });
    }
  });
  
  // Rota para deletar o usuário (requisição POST)
  app.post('/adm/deleteUser/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id); // Encontra o usuário pelo ID
  
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }
  
      await user.destroy(); // Deleta o usuário do banco de dados
  
      res.redirect('/adm/allUsers'); // Redireciona para a lista de usuários após a deleção
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao deletar usuário.' });
    }
  });

  app.post('/adm/deleteApolice/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const apolice = await Apolice.findByPk(id); // Encontra o usuário pelo ID
  
      if (!apolice) {
        return res.status(404).json({ error: 'Apólice não encontrada.' });
      }
  
      await apolice.destroy(); 
  
      res.redirect('/adm/apolices'); 
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao deletar apólice.' });
    }
  });
  
  app.post('/adm/deleteCotacao/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const cotacao = await Cotacao.findByPk(id); // Encontra o usuário pelo ID
  
      if (!cotacao) {
        return res.status(404).json({ error: 'Cotação não encontrada.' });
      }
  
      await cotacao.destroy(); 
  
      res.redirect('/adm/cotacoes'); 
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao deletar cotação.' });
    }
  });

app.listen(5500, () => {
    console.log("Rodei a porra do sistema no carai da porta http://localhost:5500")
})