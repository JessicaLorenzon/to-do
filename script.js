const novaTarefa = document.querySelector('.nova-tarefa');
const listaTarefas = document.querySelector('.lista-tarefas__adicionadas ul')
const checkboxGeral = document.querySelector('.checkbox-geral');
const tarefasPendentes = document.querySelector('.lista-tarefas__rodape__pendentes');
const tarefasAtivas = document.querySelector('.tarefas-ativas');
const tarefasConcluidas = document.querySelector('.tarefas-concluidas');
const tarefasTodas = document.querySelector('.tarefas-todas');
const limparConcluidas = document.querySelector('.lista-tarefas__rodape__limpar-concluidas');

//cria tarefa
novaTarefa.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        criaTarefa();
        contadorPendentes();
    }
});

function criaTarefa() {
    if (novaTarefa.value == '') {
        return
    }
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
        if (tarefa.style.display == 'none') {
            return
        }
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
contadorPendentes();


//filtro todas
tarefasTodas.addEventListener('click', () => {
    ativarFiltro(tarefasTodas);

    executarParaCadaTarefa((tarefa) => {
        if (tarefa.style.display = 'none') {
            tarefa.style.display = 'flex';
        }
    })

})

//filtro tarefas ativas
tarefasAtivas.addEventListener('click', () => {
    ativarFiltro(tarefasAtivas);

    executarParaCadaTarefa((tarefa) => {
        if (tarefa.classList.contains('lista-tarefas__adicionadas__tarefa--concluida')) {
            tarefa.style.display = 'none';
        } else {
            tarefa.style.display = 'flex';
        }
    })
})

//filtro tarefas concluidas
tarefasConcluidas.addEventListener('click', () => {
    ativarFiltro(tarefasConcluidas);

    executarParaCadaTarefa((tarefa) => {
        if (!tarefa.classList.contains('lista-tarefas__adicionadas__tarefa--concluida')) {
            tarefa.style.display = 'none';
        } else {
            tarefa.style.display = 'flex';
        }
    })
})

function ativarFiltro(filtro) {
    const classeAtiva = 'lista-tarefas__rodape__filtros__btn--active'
    document.querySelector(`.${classeAtiva}`).classList.remove(classeAtiva);
    filtro.classList.add(classeAtiva);
}

function executarParaCadaTarefa(callback) {
    const tarefas = document.querySelectorAll('.lista-tarefas__adicionadas__tarefa');

    tarefas.forEach(tarefa => {
        callback(tarefa);
    })
}


//limpar concluidas 
limparConcluidas.addEventListener('click', () => {
    const tarefas = document.querySelectorAll('.lista-tarefas__adicionadas__tarefa');

    tarefas.forEach(tarefa => {
        if (tarefa.classList.contains('lista-tarefas__adicionadas__tarefa--concluida')) {
            tarefa.remove();
        }
    })
})

