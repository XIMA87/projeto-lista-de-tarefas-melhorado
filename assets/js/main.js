const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

function criaLi() { //Cria elemento html <li>
  const li = document.createElement('li');
  return li;
}

inputTarefa.addEventListener('keypress', function(evento) { //Tecla enter agora tambem adiciona tarefa
  if (evento.keyCode === 13) {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
  }
});

function limpaInput() {
  inputTarefa.value = '';
  inputTarefa.focus();
}

function criaBotaoApagar(li) {
  li.innerText += ' ';
  const botaoApagar = document.createElement('button');
  botaoApagar.innerText = 'Apagar';
  // botaoApagar.classList.add('apagar');
  botaoApagar.setAttribute('class', 'apagar');
  botaoApagar.setAttribute('title', 'Apagar esta tarefa');
  li.appendChild(botaoApagar);
}

function criaTarefa(textoInput) { //Insere o elemento html <li> junto com o dados da tarefa
  const li = criaLi();
  li.innerText = textoInput;
  tarefas.appendChild(li);
  limpaInput();
  criaBotaoApagar(li);
  salvarTarefas();
}

btnTarefa.addEventListener('click', function() { //Botão adicionar funcionando
  if (!inputTarefa.value) return;
  criaTarefa(inputTarefa.value);
});

document.addEventListener('click', function(evento) {
  const elemento = evento.target;

  if (elemento.classList.contains('apagar')) {
    elemento.parentElement.remove();
    salvarTarefas();
  }
});

function salvarTarefas() { //Processo para criar um JSON com os dados
  const liTarefas = tarefas.querySelectorAll('li');
  const listaDeTarefas = [];

  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
    listaDeTarefas.push(tarefaTexto);
  }

  const tarefasJSON = JSON.stringify(listaDeTarefas); //Cria uma string do array convertido para JSON
  localStorage.setItem('tarefas', tarefasJSON); // Salva os dados no navegador. Aqui só é aceito strings, por isso foi feita a conversão anteriormente
}

function adicionaTarefasSalvas() { //Função que le as tarefas e as devolve para a ul
  const tarefas = localStorage.getItem('tarefas');
  const listaDeTarefas = JSON.parse(tarefas); //Converte o stringify anterior devolta para um Array

  for(let tarefa of listaDeTarefas) {
    criaTarefa(tarefa);
  }
}
adicionaTarefasSalvas();
