function mostrarDados() {
    const nome = document.getElementById('nome').value.trim();
    const idade = document.getElementById('idade').value.trim();
  
    if (nome === '' || idade === '') {
      document.getElementById('resultado').textContent = 'Preencha todos os campos!';
      return;
    }

    const idadeNum = Number(idade);
    if (isNaN(idadeNum) || idadeNum <=0){
      document.getElementById("resultado").textContent = "informe uma idade válida";
      return;
    }
  
    document.getElementById('resultado').textContent =
      `Olá, ${nome}! Você tem ${idade} anos.`;
  }
  