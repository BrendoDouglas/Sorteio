/**funcoes para quando apertar enter precionar o botao da id indicado */
function mandar(e){
    if(e.keyCode === 13){
    document.getElementById('adicionar').click()
    }
}
function mandarEsconder(e){
    if(e.keyCode === 13){
    document.getElementById('esconderI').click()
    }
}

/** funcao para esconder input e botao de inserção de titulo */
function esconderOp(){
    let div = document.getElementById("esconder")
    div.style = "display: none"
    localStorage.setItem("display", 'true')
}

/** funcao para aparecer novamente input e botao de inserção de titulo */
function aparecerOp(){
    let div = document.getElementById("esconder")
    div.style = "display: visible"
    localStorage.setItem("display", 'false')
}

/** funcao para mudar tilulo pelo que esta no input */
function novoTitulo(i){
    let h1 = document.getElementById("nTitulo")
    
    if (i.value != '') {
    h1.innerText = i.value
    }
    else (h1.innerText = 'Titulo')
    localStorage.setItem("titulo", h1.textContent)
}

/** variaveis globais */
var listaPessoas = []
/** variavel bool para saber se deve ou não fazer o push da nova pessoa
 * ou apenas atualizar lista para tirar o item excluido */
var carLista = false

/** funcao que cria e atualiza lista de pessoas */
function adicionar(adcPessoa){
    novaPessoa = adcPessoa.trim()
    if (novaPessoa != '') {
        if (carLista == false) {
            listaPessoas.push(novaPessoa)
        }
        document.getElementById("adcPessoa").value = ''

        let listaP = document.getElementById("listaP")
        listaP.innerHTML = ''
        
        for(let i=0; i < listaPessoas.length; i++){
            
            let linhaNova = document.createElement('li')
            let imagem = document.createElement('img')

            imagem.setAttribute("onclick", "deletar("+i+")")
            imagem.setAttribute("src", "deletar.ico")

            listaP.appendChild(linhaNova)
            linhaNova.innerText = listaPessoas[i]
            linhaNova.setAttribute("id", i)

            linhaNova.appendChild(imagem)
        }
        localStorage.setItem('listaSalva', JSON.stringify(listaPessoas))
        carLista = false
    }
    else(alert('Insira um nome valido'))
}

/** funcao para deletar alguem da lista pelo seu numero na mesma */
function deletar(id){
    listaPessoas.splice(id, 1);
    /** como a funcao precisa de algum input usei esse bool para que nao fizesse o push
     * da nova pessoa e apenas atualizasse a lista sem a pessoa retirada */
    carLista = true
    adicionar('pessoa')
}

/** variaveis globais */
var listaSorteados = []
/** variavel bool para saber se deve ou não fazer o sorteio e push de uma nova pessoa
 * ou apenas atualizar lista limpa pela funcao apagarS()*/
var carListaS = false

/** funcao que cria e atualiza lista de pessoas sorteadas */
function sortear(){
    if (carListaS == false) {
        if (listaPessoas.length >= 1) {
        
            let numeroP = listaPessoas.length
            let numeroS = Math.floor(Math.random()*numeroP)
            let pessoaSorteada = listaPessoas[numeroS]

            deletar(numeroS)

            listaSorteados.push(pessoaSorteada)
        }
        else{
            alert('A lista de participantes esta vazia')
        }
    }
    let listaS = document.getElementById("listaS")
    listaS.innerHTML = ''

    for(let i=0; i < listaSorteados.length; i++){
            
        let linhaNova = document.createElement('li')

        listaS.appendChild(linhaNova)
        linhaNova.innerText = listaSorteados[i]
    }
    localStorage.setItem('listaSorteados', JSON.stringify(listaSorteados))

    if (listaSorteados.length >= 1) {
        console.log(listaSorteados.length)
        document.getElementById("divSorteados").style.display = 'block'
    }
    else{
        document.getElementById("divSorteados").style.display = 'none'
    }
    carListaS = false
}

/** if statement para carregar itens salvos no localSorage caso nao seja null ou vazio */
onload = function(){
    //localStorage.clear()
    let tituloS = localStorage.getItem("titulo")
    let h1 = document.getElementById("nTitulo")
    if (tituloS != null) {
        h1.innerText = tituloS
        document.getElementById("titulo").value = tituloS
    }
    if (localStorage.getItem("display") == 'true'){
        esconderOp()
    }
    if (localStorage.getItem("listaSalva") != null && localStorage.getItem('listaSalva') != []) {
        listaPessoas = JSON.parse(localStorage.getItem('listaSalva'))
        carLista = true
        adicionar('pessoa') 
    }
    if (localStorage.getItem("listaSorteados") != null && localStorage.getItem("listaSorteados") != []) {
        listaSorteados = JSON.parse(localStorage.getItem('listaSorteados'))
        carListaS = true
        sortear()
    }
}

/** funcao para apagar lista de sorteados */
function apagarS(){
    if (listaSorteados == '') {
        alert('Voce ainda não tem uma lista de sorteados')
    }
    else{
        
        for (let i = 0; i < listaSorteados.length; i++) {
            listaPessoas.push(listaSorteados[i])
        }

        listaSorteados = []
        carListaS = true
        sortear()

        carLista = true
        adicionar('pessoa')
    }    
}