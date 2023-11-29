const novaTarefa = document.querySelector('.nova-tarefa');
const listaTarefas = document.querySelector('.lista-tarefas__adicionadas ul')
const checkboxGeral = document.querySelector('.checkbox-geral');
const tarefasPendentes = document.querySelector('.lista-tarefas__rodape__pendentes');

const filtros = document.querySelector('.lista-tarefas__rodape__filtros');
const tarefasAtivas = document.querySelector('.tarefas-ativas');
const tarefasConcluidas = document.querySelector('.tarefas-concluidas');
const tarefasTodas = document.querySelector('.tarefas-todas');

const limparConcluidas = document.querySelector('.lista-tarefas__rodape__limpar-concluidas');

contadorPendentes();

//cria tarefa
novaTarefa.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        criaTarefa();
        contadorPendentes();
    }
});

function criaTarefa() {
    const li = document.createElement('li');
    li.classList.add('lista-tarefas__adicionadas__tarefa');

    li.innerHTML = `
        <input type="checkbox" class="checkbox">
        <p class="lista-tarefas__adicionadas__tarefa-descricao">${novaTarefa.value}</p>
        <button class="close"><img src="./images/icon-cross.svg"></button>
    `

    listaTarefas.appendChild(li);

    novaTarefa.value = '';
}


//finaliza e conclui/desconclui tarefas
listaTarefas.addEventListener('click', (event) => {
    const tarefa = event.target.closest('li');

    if (event.target.tagName === 'IMG') {
        tarefa.remove();
        contadorPendentes();
    }

    if (event.target.tagName === 'INPUT') {
        tarefa.classList.toggle('lista-tarefas__adicionadas__tarefa--concluida');
        contadorPendentes();
    }
});


//finaliza todas as tarefas
checkboxGeral.addEventListener('click', finalizarTarefas)

function finalizarTarefas() {
    const tarefas = document.querySelectorAll('.lista-tarefas__adicionadas__tarefa');

    tarefas.forEach(tarefa => {
        if (checkboxGeral.checked) {
            tarefa.classList.add('lista-tarefas__adicionadas__tarefa--concluida');
            tarefa.querySelector('.checkbox').checked = true;
        } else {
            tarefa.classList.remove('lista-tarefas__adicionadas__tarefa--concluida');
            tarefa.querySelector('.checkbox').checked = false;
        }
        contadorPendentes();
    })
    
}

//contador tarefas pendentes
function contadorPendentes() {
    const tarefas = document.querySelectorAll('.lista-tarefas__adicionadas__tarefa');
    let contador = 0;

    tarefas.forEach(tarefa => {
        if (!tarefa.classList.contains('lista-tarefas__adicionadas__tarefa--concluida')) {
            contador++;
        }
    })
    tarefasPendentes.innerHTML = `<p class="lista-tarefas__rodape__pendentes">${contador} tarefas pendentes</p>`
}



//filtro todas
tarefasTodas.addEventListener('click', () => {
    const tarefas = document.querySelectorAll('.lista-tarefas__adicionadas__tarefa');
    tarefasTodas.classList.add('lista-tarefas__rodape__filtros__btn--active');

    tarefas.forEach(tarefa => {
        if(tarefa.style.display = 'none') {
            tarefa.style.display = 'flex';
        }
    })
})
    
//filtro tarefas ativas
tarefasAtivas.addEventListener('click', () => {
    const tarefas = document.querySelectorAll('.lista-tarefas__adicionadas__tarefa');
    tarefasAtivas.classList.add('lista-tarefas__rodape__filtros__btn--active');

    tarefas.forEach(tarefa => {
        if(tarefa.classList.contains('lista-tarefas__adicionadas__tarefa--concluida')) {
            tarefa.style.display = 'none';
        }
    })
})

//filtro tarefas concluidas
tarefasConcluidas.addEventListener('click', () => {
    const tarefas = document.querySelectorAll('.lista-tarefas__adicionadas__tarefa');
    tarefasConcluidas.classList.add('lista-tarefas__rodape__filtros__btn--active');

    tarefas.forEach(tarefa => {
        if(!tarefa.classList.contains('lista-tarefas__adicionadas__tarefa--concluida')) {
            tarefa.style.display = 'none';
        }
    })
})

//limpar concluidas 
limparConcluidas.addEventListener('click', () => {
    const tarefas = document.querySelectorAll('.lista-tarefas__adicionadas__tarefa');
    limparConcluidas.classList.add('lista-tarefas__rodape__filtros__btn--active');

    tarefas.forEach(tarefa => {
        if(tarefa.classList.contains('lista-tarefas__adicionadas__tarefa--concluida')) {
            tarefa.remove();
        }
    })
})