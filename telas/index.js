function mostrarEmpresa() {
    var tipoCadastro = document.getElementById("tipoCadastro").value;
    var divEmpresa = document.getElementById("empresa");

    if (tipoCadastro === "empresa") {
        divEmpresa.style.display = "block";
    } else {
        divEmpresa.style.display = "none";
    }
}

function cadastrar() {
    var form = document.getElementById("cadastroForm");
    var data = new FormData(form);
    var usuario = {
        nome: data.get("nome"),
        cpf: data.get("cpf"),
        telefone: data.get("telefone"),
        endereco: data.get("endereco"),
        tipoCadastro: data.get("tipoCadastro"),
        senha: data.get("senha") // Adiciona a senha ao objeto usuário
    };

    if (data.get("tipoCadastro") === "empresa") {
        usuario.nomeEmpresa = data.get("nomeEmpresa");
    }

    // Verifica se já existe um usuário cadastrado com o mesmo CPF
    var cadastrados = JSON.parse(localStorage.getItem("usuarios")) || [];
    var usuarioExistente = cadastrados.find(function(u) {
        return u.cpf === usuario.cpf;
    });

    if (usuarioExistente) {
        alert("CPF já cadastrado.");
        return; // Se já existe um usuário cadastrado com o mesmo CPF, encerra a função
    }

    // Adiciona o novo usuário à lista de cadastrados
    cadastrados.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(cadastrados));

    alert("Cadastro realizado com sucesso!");
    window.location.href = "login.html";
}

function login() {
    var cpf = document.getElementById("cpf").value;
    var senha = document.getElementById("senha").value;
    var usuario = JSON.parse(localStorage.getItem("usuario"));

    if (usuario && usuario.cpf === cpf && usuario.senha === senha) {
        if (usuario.tipoCadastro === "informal") {
            window.location.href = "pagina_vendedor.html";
        } else if (usuario.tipoCadastro === "empresa") {
            // Redirecionar para a página da empresa, se necessário
            alert("Login como empresa ainda não implementado.");
        }
    } else {
        alert("CPF ou senha incorretos.");
    }
}
