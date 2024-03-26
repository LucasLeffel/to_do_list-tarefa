function adicionaTarefaNaLista() {
    // debugger - descomentar para acompanhar o fluxo da pagina
    // seleciona o elemento de input text que tem o texto da nova tarefa
    const novaTarefa = document.getElementById('input_nova_tarefa').value
    criaNovoItemDaLista(novaTarefa)
}

// Modifique a função criaNovoItemDaLista para adicionar um evento de clique em cada novo item da lista
function criaNovoItemDaLista(textoDaTarefa) {
    // recupera a lista de tarefas
    const listaTarefas = document.getElementById('lista_de_tarefas');
    // cria um novo elemento do tipo li (lista)
    const novoItem = document.createElement('li');
    
    // cria um span para o texto da tarefa
    const spanTexto = document.createElement('span');
    spanTexto.innerText = textoDaTarefa;

    // Cria o botão com símbolo de "+"
    const botaoRiscar = document.createElement('button');
    botaoRiscar.innerText = '  +';
    botaoRiscar.classList.add("botao-riscar");
    botaoRiscar.addEventListener("click", function(event) {
        // Riscar ou desriscar o texto da tarefa
        if (spanTexto.style.textDecoration === 'line-through') {
            spanTexto.style.textDecoration = 'none';
            // Remove o botão "Ocultar" se estiver presente
            const botaoOcultar = novoItem.querySelector(".ocultar");
            if (botaoOcultar) {
                botaoOcultar.remove();
            }
        } else {
            spanTexto.style.textDecoration = 'line-through';
            // Cria o botão "Ocultar" se o texto estiver riscado
            const botaoOcultar = document.createElement('button');
            botaoOcultar.innerText = 'Ocultar';
            botaoOcultar.classList.add("ocultar");
            botaoOcultar.addEventListener("click", function(event) {
                // Alterna entre ocultar e exibir o item da lista
                if (novoItem.style.display === 'none') {
                    novoItem.style.display = 'block';
                    botaoOcultar.innerText = 'Ocultar';
                } else {
                    novoItem.style.display = 'none';
                    botaoOcultar.innerText = 'Exibir';
                }
                event.stopPropagation();
            });
            // Adiciona o botão "Ocultar" ao lado do botão de riscar
            novoItem.appendChild(botaoOcultar);
        }
        // Impede que o evento de clique no botão se propague para o item da lista
        event.stopPropagation();
    });
    
    // Adiciona um evento de clique para chamar a função editar_tarefa() com o próprio elemento clicado como argumento
    novoItem.addEventListener("click", function(event) {
        // Verifica se o clique ocorreu no spanTexto
        if (event.target === spanTexto) {
            editar_tarefa(novoItem);
        }
    });
    
    // Adiciona o span e os botões à tarefa
    novoItem.appendChild(spanTexto);
    novoItem.appendChild(botaoRiscar);
    
    // Adiciona o item à lista
    listaTarefas.appendChild(novoItem);
}





function criaInputCheckBoxTarefa(idTarefa) {
    // cria o elemento de input
    const inputTarefa = document.createElement('input')
    // seta o elemento para ser do tipo checkbox
    inputTarefa.type = 'checkbox'
    // seta o onclick do input
    inputTarefa.setAttribute('onclick', `mudaEstadoTarefa('${idTarefa}')`)
    return inputTarefa
}

function mudaEstadoTarefa(idTarefa) {
    const tarefaSelecionada = document.getElementById(idTarefa)
    if (tarefaSelecionada.style.textDecoration == 'line-through') {
        tarefaSelecionada.style = 'text-decoration: none;'
    } else {
        tarefaSelecionada.style = 'text-decoration: line-through;'
    }    
}

function editar_tarefa(tarefa) {
    // Torna o texto da tarefa clicada editável
    tarefa.contentEditable = true;
    tarefa.focus();
    // Adiciona evento para finalizar a edição ao pressionar Enter ou sair do foco
    tarefa.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            // Finaliza a edição ao pressionar Enter
            tarefa.contentEditable = false;
        }
    });
    tarefa.addEventListener("blur", function() {
        // Finaliza a edição ao sair do foco
        tarefa.contentEditable = false;
        // Você pode adicionar aqui a lógica para salvar os dados editados
    });
}

