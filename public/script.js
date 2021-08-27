let cadastro;

//instalar o nodemon
function validaUpdate(data){
    alert(data[5].checked);
    for(i = 0; i<6;i++){   
        if (data[i].value == "" || data[i].value == null){
            alert("Tem coisa vazia ae")
            data[i].focus();
            return false;
        }
    }

    if(data[1].value.indexOf("@") == -1 ||
    data[1].value.indexOf(".") == -1) {
        alert("Esse e-mail é inválido.");
        data[1].focus();
        return false;
    }

    if (!Number.isInteger(Number(data[3].value))){
        alert("O baguio não tá inteiro mano");
        return false;
    }

    alert("Deu bom pvt")
    
    return true;
    
    
}

function validaForm(data){
    /*
o parâmetro frm desta função significa: this.form,
pois a chamada da função - validaForm(this) foi
definida na tag form.
*/  
    //validação de nome
    if (data._name.value == "") {
        alert("Nenhum nome foi digitado, verifique o campo Nome e tente novamente.");
        data._name.focus();
        return false;
    }
    
    if (data._name.value.search(/\d/)!=-1){
        alert("Números são caracteres inválidos em nomes, verifique o campo Nome e tente novamente.");
        data._name.focus();
        return false;
    }

    if (data._email == "") {
        alert("Nenhum e-mail foi digitado, verifique o campo E-mail e tente novamente.");
        data._email.focus();
        return false;
    } 
    if(data._email.value.indexOf("@") == -1 ||
    data._email.value.indexOf(".") == -1) {
        alert("Esse E-mail é inválido, verifique o campo E-mail e tente novamente.");
        data._email.focus();
        return false;
    }

    if (data._address.value == "") {
        alert("Nenhum endereço foi digitado, verifique o campo Endereço e tente novamente.");
        data._address.focus();
        return false;
    }

    if (!Number.isInteger(Number(data._age.value))){
        alert("Esta idade não é válida, verifique se o valor é inteiro.");
        data._age.focus();
        return false;
    }

    if (data._age.value == "") {
        alert("Nenhuma idade foi digitado, verifique o campo Idade e tente novamente.");
        data._age.focus();
        return false;
    }
    if (Number(data._age.value) < 0 || Number(data._age.value)>100 ) {
        alert("Valor inválido para idade, verifique o campo Idade e tente novamente.");
        data._age.focus();
        return false;
    }

    if (data._height.value == "") {
        alert("Nenhuma altura foi digitado, verifique o campo Altura e tente novamente.");
        data._height.focus();
        return false;
    }

    if (Number(data._height.value) < 1.0 || Number(data._height.value)>2.4 ) {
        alert("Valor inválido para altura, verifique o campo Altura e tente novamente.");
        data._height.focus();
        return false;
    }
    

//Verifica se o campo nome foi preenchido e
    //contém no mínimo três caracteres.
    // if(frm.nome.value == "`" || frm.nome.value == null || frm.nome.value.lenght < 3) {
    //     //É mostrado um alerta, caso o campo esteja vazio.
    //     alert("Por favor, indique o seu nome.");
    //     //Foi definido um focus no campo.
    //     frm.nome.focus();
    //     //o form não é enviado.
    //     return false;
    // }
    //o campo e-mail precisa de conter: "@", "." e não pode estar vazio
    // if(frm.email.value.indexOf("@") == -1 ||
    //   frm.email.valueOf.indexOf(".") == -1 ||
    //   frm.email.value == "" ||
    //   frm.email.value == null) {
    //     alert("Por favor, indique um e-mail válido.");
    //     frm.email.focus();
    //     return false;
    // }
    alert(data);
    return true;

}

function update(index,link){
    //seleciona todas as tags que sejam td 
   
    let tds = document.querySelectorAll(`td[data-index-row='${index}']`);
    let spans = document.querySelectorAll(`td[data-index-row='${index}'] > span`);
    let inputs = document.querySelectorAll(`td[data-index-row='${index}'] > input`);

    let lenTds = tds.length-1; //numero de tds de uma linha da tabela
    let linkUpdate = tds[lenTds-1]; //retorna o conteudo da penultima td, no caso, o link de update
    let linkRemove = tds[lenTds];

    let lenInputs = inputs.length; //pega numero de inputs

    let button = inputs[lenInputs-1]; //cria uma conexao com o input que é do tipo button


    linkUpdate.className='hidden';
    linkRemove.className='hidden';
    tds[lenTds-2].className='show'; //mostra butao de envio

     //esconde todos os campos de exibição de dados do cadastro
    for(let cont=0;cont<spans.length;cont++){
        if(spans[cont].className=="show"){
            spans[cont].className="hidden";
        } else{
            spans[cont].className="show";
        }
    }
    //mostra os campos de preenchimento para o cadastro
    for(let cont=0;cont<inputs.length;cont++){
        if(inputs[cont].className=="hidden"){
            inputs[cont].className="show";
        }
    }

    //escuta se o botao foi clicado
    button.addEventListener('click',()=>{
        if (validaUpdate(inputs)){
        
        const http = new XMLHttpRequest(); //XHR - cria um objeto para requisição ao servidor
        const url=link; //"/cadastro/update";
        let data = {id:"",name:"",email:"",address:"",age:"",heigth:"",vote:""};
        let dataToSend;

        http.open("POST",link,true); //abre uma comunicação com o servidor através de uma requisição POST
        //Se no servidor nao houver um elemento esperando por uma mensagem POST (ex. router.post()) para a rota /cadastro/update ocorrerar um erro: 404 - File Not Found

        //Dados HTML teria no cabecalho HEADER (da mensagem HTTP) - Content-Type= text/html
        //Dados estruturados como querystring (ex: http//www.meu.com.br:3030/?campo=meu&campo2=10) -  Content-Type=x-www-form-urlencoded
        //Dados no formato de Objeto Javascript para troca de informacoes (JSON) Content-Type=application/json : Ex.: {key1:value1,key2:value2}
        http.setRequestHeader('Content-Type','application/json'); //constroi um cabecalho http para envio dos dados
         
        for(let cont=0;cont<inputs.length;cont++){ //desabilita todos os inputs para escrita ou acesso (no caso do button)
            if(inputs[cont].disabled==true){
                inputs[cont].disabled=false;
            } else inputs[cont].disabled=true;
        }
    //    // essa suncao esta sendo colocada aqui só para dar uma parada e você poder ver os inputs desabilitados
    //    //funcao que espera um tempo N, dado em milissegundos, e então chama uma função (callback). No caso, vamos usar 2000 ms = 2s
    //    //essa funcao foi construida somente para que voce possa ver os inputs ficando desabilitados. Nao precisa usar.
    //    function sleep(milliseconds) {
    //         const date = Date.now();
    //         let currentDate = null;
    //         do {
    //             currentDate = Date.now();
    //         } while (currentDate - date < milliseconds);
    //     }
    //     console.log("Mostra essa mensagem no console, primeiro!");
    //     sleep(2000)
    //     console.log("Pronto, você consegue ver seus inputs desabilitados!");
    //    //fim do codigo usado para ver os inputs desabiulitados

        //preenche um objeto com o indice da linha da tabela e os valores dos campos input do tipo text
        data.id = index; //esse dado nao existe no vetor Users do lado do servidor (backend), mas preciso dele para apontar o indice do vetor que quero modificar
        data.name = inputs[0].value;
        data.email = inputs[1].value;
        data.address = inputs[2].value;
        data.age = inputs[3].value;
        data.heigth = inputs[4].value;
        data.vote = inputs[5].checked;

        dataToSend = JSON.stringify(data); //transforma o objeto literal em uma string JSON que é a representação em string de um objeto JSON. Se quisesse o objeto no formato binario, usaria: JSON.parse(data)

        http.send(dataToSend);//envia dados para o servidor na forma de JSO

        /* este codigo abaixo foi colocado para que a interface de cadastro so seja modificada quando se receber um aviso do servidor que a modificacao foi feita com sucesso. No caso o aviso vem na forma do codigo 200 de HTTP: OK */
        http.onload = ()=>{ 

            /*
            readyState:
            0: request not initialized
            1: server connection established
            2: request received
            3: processing request
            4: request finished and response is ready
            status:
            200: "OK"
            403: "Forbidden"
            404: "Page not found"
            */
            // baseado nos valores acima apresentados, o codigo abaixo mostra o que foi enviado pelo servidor como resposta ao envio de dados. No caso, se o request foi finalizado e o response foi recebido, a mensagem recebida do servidor eh mostrada no console do navegador. esse codigo foi feito apenas para verificar se tudo ocorreu bem no envio

            if (http.readyState === 4 && http.status === 200) { //testa se o envio foi bem sucedido
                for(let cont=0;cont<spans.length;cont++){
                    if(spans[cont].className=="hidden"){
                        if (cont==5){
                            spans[cont].innerHTML = inputs[cont].checked;
                            spans[cont].className="show"; 
                        }
                        else{
                            spans[cont].innerHTML = inputs[cont].value;
                        spans[cont].className="show";
                        }
                    } else{
                        spans[cont].className="hidden";
                    }
                }

                //esconde os campos de preenchimento para o cadastro
                for(let cont=0;cont<inputs.length;cont++){
                    if(inputs[cont].className=="show"){
                        inputs[cont].className="hidden";
                        if(inputs[cont].disabled==false){//habilita novamente os inputs para escrita
                            inputs[cont].disabled=true;
                        }
                    }
                }

                linkUpdate.className='show';
                linkRemove.className='show';
                tds[lenTds-2].className='hidden';
            } else {
                console.log("Ocorreu erro no processamento dos dados no servidor: ",http.responseText);
            }     
        }
    /*
    readyState:
    0: request not initialized
    1: server connection established
    2: request received
    3: processing request
    4: request finished and response is ready
    status:
    200: "OK"
    403: "Forbidden"
    404: "Page not found"
    */
    // baseado nos valores acima apresentados, o codigo abaixo mostra o que foi enviado pelo servidor como resposta ao envio de dados. No caso, se o request foi finalizado e o response foi recebido, a mensagem recebida do servidor eh mostrada no console do navegador. esse codigo foi feito apenas para verificar se tudo ocorreu bem no envio

    // http.onreadystatechange = (e)=>{
    //     if (http.readyState === 4 && http.status === 200) { //testa se o envio foi bem sucedido
    //         console.log(http.responseText);

    //     }
    // }

    }});  
    
}

function remove(index,_name,link){ //(index,link)

    //escuta se o botao foi clicado

    const http = new XMLHttpRequest(); //cria um objeto para requisição ao servidor
    const url=link;

    http.open("POST",link,true); //abre uma comunicação com o servidor através de uma requisição POST
    http.setRequestHeader('Content-Type','application/json'); //constroi um cabecalho http para envio dos dados

    //dataToSend = JSON.stringify({id:index}); //transforma o objeto literal em uma string JSON que é a representação em string de um objeto JSON
    dataToSend = JSON.stringify({name:_name}); //transforma o objeto literal em uma string JSON que é a representação em string de um objeto JSON

    http.send(dataToSend);//envia dados para o servidor na forma de JSON

    /* este codigo abaixo foi colocado para que a interface de cadastro so seja modificada quando se receber um aviso do servidor que a modificacao foi feita com sucesso. No caso o aviso vem na forma do codigo 200 de HTTP: OK */

    /*
    readyState:
    0: request not initialized
    1: server connection established
    2: request received
    3: processing request
    4: request finished and response is ready
    status:
    200: "OK"
    403: "Forbidden"
    404: "Page not found"
    */

    // baseado nos valores acima apresentados, o codigo abaixo mostra o que foi enviado pelo servidor como resposta ao envio de dados. No caso, se o request foi finalizado e o response foi recebido, a mensagem recebida do servidor eh mostrada no console do navegador. esse codigo foi feito apenas para verificar se tudo ocorreu bem no envio

    http.onload = ()=>{
        
        //seleciona todas as tags que sejam td 
        let tr = document.querySelector(`table#list > tbody > tr[data-index-row='${index}']`);

        if (http.readyState === 4 && http.status === 200) {
            tr.remove();
            console.log(`Item ${index} removido com sucesso!`);

        } else {
            console.log(`Erro durante a tentativa de remoção do usuário: ${_name}! Código do Erro: ${http.status}`); 
        }
        

    }
}
   
function add(form, link){    
    if (validaForm(form)){
        const http = new XMLHttpRequest(); //cria um objeto para requisição ao servidor
        const url=link;

        let data = {id:"",name:"",email:"",address:"",age:"",heigth:"",vote:""};
        let dataToSend;
    
        http.open("POST",link,true); //abre uma comunicação com o servidor através de uma requisição POST

        http.setRequestHeader('Content-Type','application/json'); //constroi um cabecalho http para envio dos dados
        data.id = 1000; //esse dado nao existe no vetor Users do lado do servidor (backend), mas preciso dele para apontar o indice do vetor que quero modificar
        data.name = form._name.value;
        alert(data.name);
        data.email = form._email.value;
        data.address = form._address.value;
        data.age = form._age.value;
        data.heigth = form._height.value;
        data.vote = form._vote.checked;

        //dataToSend = JSON.stringify({id:index}); //transforma o objeto literal em uma string JSON que é a representação em string de um objeto JSON
        dataToSend = JSON.stringify(data); //transforma o objeto literal em uma string JSON que é a representação em string de um objeto JSON. Se quisesse o objeto no formato binario, usaria: JSON.parse(data)
    
        http.send(dataToSend);//envia dados para o servidor na forma de JSON
    
        /* este codigo abaixo foi colocado para que a interface de cadastro so seja modificada quando se receber um aviso do servidor que a modificacao foi feita com sucesso. No caso o aviso vem na forma do codigo 200 de HTTP: OK */
    
        /*
        readyState:
        0: request not initialized
        1: server connection established
        2: request received
        3: processing request
        4: request finished and response is ready
    
        status:
        200: "OK"
        403: "Forbidden"
        404: "Page not found"
        */
    
        // baseado nos valores acima apresentados, o codigo abaixo mostra o que foi enviado pelo servidor como resposta ao envio de dados. No caso, se o request foi finalizado e o response foi recebido, a mensagem recebida do servidor eh mostrada no console do navegador. esse codigo foi feito apenas para verificar se tudo ocorreu bem no envio
        http.onload = ()=>{
            
            //seleciona todas as tags que sejam td 
            // let tr = document.querySelector(`table#list > tbody > tr[data-index-row='${index}']`);
    
            if (http.readyState === 4 && http.status === 200) {
                alert("Ei man, deu bom ó");
                list(data);
    
            } else {
                console.log(`Erro durante a tentativa de remoção do usuário: ${_name}! Código do Erro: ${http.status}`); 
            }
            
    
        }
    };
}

function populateTable(table, content) {
    alert('<span>'+content[0].name+'</span>');
    for (var i = 0; i < content.length; ++i) {
        keys = Object.keys(content[i]);
        var row = document.createElement('tr');
        
        for (var j=0;j<6;j++){
            var newCell =  row.insertCell(j);
            newCell.innerHTML = '<span>'+content[i][keys[j]]+'</span>';
        }
        table.appendChild(row);
    }
    return table;
}

function listar(link){
    
    const http = new XMLHttpRequest(); //cria um objeto para requisição ao servidor
    const url=link;

    http.open('GET',link,true); //abre uma comunicação com o servidor através de uma requisição POST
    http.setRequestHeader('Content-Type','application/json'); //constroi um cabecalho http para envio dos dados
    http.send(null);//envia dados para o servidor na forma de JSON
    /* este codigo abaixo foi colocado para que a interface de cadastro so seja modificada quando se receber um aviso do servidor que a modificacao foi feita com sucesso. No caso o aviso vem na forma do codigo 200 de HTTP: OK */

    /*
    readyState:
    0: request not initialized
    1: server connection established
    2: request received
    3: processing request
    4: request finished and response is ready
    status:
    200: "OK"
    403: "Forbidden"
    404: "Page not found"
    */

    // baseado nos valores acima apresentados, o codigo abaixo mostra o que foi enviado pelo servidor como resposta ao envio de dados. No caso, se o request foi finalizado e o response foi recebido, a mensagem recebida do servidor eh mostrada no console do navegador. esse codigo foi feito apenas para verificar se tudo ocorreu bem no envio

    http.onload = ()=>{
        if (http.readyState === 4 && http.status === 200) {
            let lista = JSON.parse(http.response)
            populateTable(document.getElementById('list-users'), lista);
        } else {
            console.log(`Erro durante a tentativa de remoção do usuário: ${_name}! Código do Erro: ${http.status}`); 
        }
        

    }
    
    //populateTable(document.getElementById('list-users'), datas);


    // let tableList = document.getElementById("list");
    // alert("Teste list 1")
    // let tr = document.createElement("tr");
    // let td = document.createElement("td");
    // let span = document.createElement("span");
    // var cont;
    // alert("Teste list 2")
    // for(cont = 0;cont<2;cont++){ 
    //     alert("Teste list 3")
    //     td.setAttribute(`data-index-row=${cont}`);
    //     span.innerHTML =  Object.keys(datas[cont])[0] //keys 0 - name, 1 - email
    //     span.className="show";
    //     td.appendChild(span);
    //     tr.appendChild(td);
        
    //     tableList.appendChild(tr);
    // }
}