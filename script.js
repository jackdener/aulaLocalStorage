const campoLogin = document.getElementById("username");
const campoSenha = document.getElementById("password");
const campoNovoLogin = document.getElementById("newusername");
const campoNovaSenha = document.getElementById("newpassword");
const campoRepSenha = document.getElementById("reppassword");
const campoTitulo = document.getElementById("titulo");
const campoAutor = document.getElementById("autor");
const campoGenero = document.getElementById("genero");
const campoIsbn = document.getElementById("isbn");
const lista = document.getElementById("lista");

function logar() {
  let login = campoLogin.value;
  let senha = campoSenha.value;
  let mensagem = "Usuário ou senha incorreta!";
  let bancoDeDados = JSON.parse(localStorage.getItem("bancoDeDados"));
  if (bancoDeDados == null) {
    mensagem = "Nenhum usuário cadastrado até o momento";
  } else {
    for (let usuario of bancoDeDados) {
      if (usuario.login === login && usuario.senha === senha) {
        mensagem = "Parabéns, você logou!";
        localStorage.setItem("logado", JSON.stringify(usuario));
        window.location.href = "home.html";
        break;
      }
    }
  }
  alert(mensagem);
}

function cadastrar() {
  if (campoNovaSenha.value == campoRepSenha.value) {
    const usuario = {
      login: campoNovoLogin.value,
      senha: campoNovaSenha.value,
    };
    let bancoDeDados = JSON.parse(localStorage.getItem("bancoDeDados"));
    if (bancoDeDados == null) {
      bancoDeDados = [];
    }
    if (existe(usuario, bancoDeDados)) {
      alert("Esse login já foi cadastrado anteriormente");
    } else {
      bancoDeDados.push(usuario);
      localStorage.setItem("bancoDeDados", JSON.stringify(bancoDeDados));
      alert("Usuário cadastrado com sucesso!");
    }
  } else {
    alert("As senhas são diferentes!");
  }
}

function existe(usuario, bancoDeDados) {
  for (let verificado of bancoDeDados) {
    if (verificado.login == usuario.login) {
      return true;
    }
  }
  return false;
}

function logout() {
  window.location.href = "index.html";
}

function criaLivro() {
  const livro = {
    titulo: campoTitulo.value,
    autor: campoAutor.value,
    genero: campoGenero.value,
    isbn: campoIsbn.value,
  };
  let biblioteca = JSON.parse(localStorage.getItem("biblioteca"));
  if (biblioteca == null) {
    biblioteca = [];
  }
  //verificar aqui se o ISBN já existe, só permitindo cadastro caso não exista
  biblioteca.push(livro);
  localStorage.setItem("biblioteca", JSON.stringify(biblioteca));
  alert("Livro cadastrado com sucesso!")
  campoTitulo.value = null;
  campoAutor.value = null;
  campoGenero.value = null;
  campoIsbn.value = null;
}

let aberto = false;
function exibe() {
  let livros = "";  
  if (!aberto) {
    aberto = true;
    let biblioteca = JSON.parse(localStorage.getItem("biblioteca"));
    if (biblioteca == null) {
      livros = "Não há livros cadastrados no momento!";
    } else {
      for (let livro of biblioteca) {
        livros += "<br><strong>Título: </strong>" + livro.titulo;
        livros += "<br><strong>Autor: </strong>" + livro.autor;
        livros += "<br><strong>Gênero: </strong>" + livro.genero;
        livros += "<br><strong>ISBN: </strong>" + livro.isbn;
        livros += "<br><strong>__________________________</strong>";
      }
      lista.innerHTML = livros;
    }
  }
  else{
    aberto = false;
    lista.innerHTML = "";
  }
}
