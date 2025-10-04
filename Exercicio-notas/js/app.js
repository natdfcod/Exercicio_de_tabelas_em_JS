// MediaCheckpoint = ((maior ckeckpoint + segundo maior checkpoint)/2) * 0.4
// MediaSprint = ((Sprint 01 + Sprint 02)/2) * 0.6
// MediaSemestral = ((MediaCheckpoint + MediaSprint) * 0.4) + (GlobalSolution * 0.6)
//
//conts valor1 = Number(document.querySelector(‘#id do campo’).value);
let temp = 0

//pegando o botão e criando uma função que scancela o submit
document.querySelector('#dados').addEventListener('submit', function (e) {
    e.preventDefault()

    
    //colocando as somente as notas dos cp's em um vetor
    const cheks = [
        Number(document.querySelector('#ckp01').value),
        Number(document.querySelector('#ckp02').value),
        Number(document.querySelector('#ckp03').value)
    ]
    //pegando as sprints e gs
    const trabalhos = [
        Number(document.querySelector('#sprint01').value),
        Number(document.querySelector('#sprint02').value),
        Number(document.querySelector('#globalSolution').value)
    ]
    //organizando o vetor
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (i != j) {
                if (cheks[i] < cheks[j]) {
                    temp = cheks[i]
                    cheks[i] = cheks[j]
                    cheks[j] = temp
                }
            }
        }
    }
    //calculos
    let MediaCheckpoint = ((cheks[0] + cheks[1]) / 2) * 0.4
    let MediaSprint = ((trabalhos[0] + trabalhos[1]) / 2) * 0.6
    let MediaSemestral = ((MediaCheckpoint + MediaSprint) * 0.4) + (trabalhos[2] * 0.6)
    
    //vetores que vão exibir na tabela
    const dadosS = [
        document.querySelector('#nomeAluno'),
        document.querySelector('#disciplina'),
    ]

    //para não deixar o usuario não digitar nada nas options
    if (dadosS[1].value === '0') {
        alert('Por favor, selecione uma conta válida');
        dadosS[1].focus();
        return;
    }
    
    const dadosN = [
        cheks[0],
        cheks[1],
        MediaCheckpoint,
        trabalhos[0],
        trabalhos[1],
        MediaSprint,
        trabalhos[2],
        MediaSemestral
    ]
    
    // pegar o tbody
    const tbody = document.querySelector('#historico')
    
    // Criar uma tr para receber os dados do formulário
    const tr = document.createElement('tr')
    
    //exibindo cada index do vetor de strings
    dadosS.forEach(dado => {
        
        // criando uma td para cada dado
        const td = document.createElement('td')

        //colocando na td o conteúdo do campo
        td.textContent = dado.value

        // colocando a td na tr que foi anteriormente criada
        tr.append(td)
    })
    //mesmo processo, mas para exibir cada index do vetor de numbers
    dadosN.forEach(dado => {

        const td = document.createElement('td')

        td.textContent = dado.toFixed(1)

        tr.append(td)
    })

    // colocar a tr no tbody
    tbody.prepend(tr);

    // Limpando o formulário
    this.reset()

    // Atualizar a data
    const dataAtual = new Date()
    document.querySelector('#dataAtualizacao').textContent = `Dados atualizados em ${dataAtual.toLocaleDateString('pt-BR')} - ${dataAtual.toLocaleTimeString('pt-BR')}`
})