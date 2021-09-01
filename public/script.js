let cadastro;

window.onload = listar('/cadastro/list');

function validaUpdate(data){

    for(i = 0; i<6;i++){   
        if (data[i].value == "" || data[i].value == null){
            alert("Os campos de dados de usuário não podem estar vazios.")
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

    if (!Number.isInteger(Number(data[3].value))&&(Number(data[3].value>0))){
        alert("A idade deve ser um valor inteiro e positivo!");
        data[3].focus();
        return false;
    }
    return true;
    
    
}

function validaForm(data){

    
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
        alert("Nenhuma idade foi digitada, verifique o campo Idade e tente novamente.");
        data._age.focus();
        return false;
    }
    if (Number(data._age.value) < 0 || Number(data._age.value)>100 ) {
        alert("Valor inválido para idade, verifique o campo Idade e tente novamente.");
        data._age.focus();
        return false;
    }

    if (data._height.value == "") {
        alert("Nenhuma altura foi digitada, verifique o campo Altura e tente novamente.");
        data._height.focus();
        return false;
    }

    if (Number(data._height.value) < 1.0 || Number(data._height.value)>2.4 ) {
        alert("Valor inválido para altura, verifique o campo Altura e tente novamente.");
        data._height.focus();
        return false;
    }

    return true;

}

function update(index,link){
   
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

    
    button.addEventListener('click',()=>{
        if (validaUpdate(inputs)){
        
        const http = new XMLHttpRequest(); //XHR - cria um objeto para requisição ao servidor
        const url=link; //"/cadastro/update";
        let data = {id:"",name:"",email:"",address:"",age:"",heigth:"",vote:""};
        let dataToSend;

        http.open("POST",link,true);

        http.setRequestHeader('Content-Type','application/json'); //constroi um cabecalho http para envio dos dados
         
        for(let cont=0;cont<inputs.length;cont++){ //desabilita todos os inputs para escrita ou acesso (no caso do button)
            if(inputs[cont].disabled==true){
                inputs[cont].disabled=false;
            } else inputs[cont].disabled=true;
        }

        data.id = index; //esse dado nao existe no vetor Users do lado do servidor (backend), mas preciso dele para apontar o indice do vetor que quero modificar
        data.name = inputs[0].value;
        data.email = inputs[1].value;
        data.address = inputs[2].value;
        data.age = inputs[3].value;
        //toFixed faz com que as casas decimais do valor sejam sempre duas. 1.8 se torna 1.80, 1 se torna 1.00
        data.heigth =  parseFloat(inputs[4].value).toFixed(2);
        data.vote = inputs[5].checked;

        dataToSend = JSON.stringify(data); //transforma o objeto literal em uma string JSON que é a representação em string de um objeto JSON. Se quisesse o objeto no formato binario, usaria: JSON.parse(data)

        http.send(dataToSend);//envia dados para o servidor na forma de JSO

        http.onload = ()=>{ 

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
                        
            
            if (http.readyState === 4 && http.status === 200) { //testa se o envio foi bem sucedido
                alert('Usuário atualizado com sucesso!');
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

                
                listar('/cadastro/list');  
            } else {
                console.log("Ocorreu erro no processamento dos dados no servidor: ",http.responseText);
            }

               
        }

    }});  
    
}

function remove(index,_name,link){ //(index,link)

    const http = new XMLHttpRequest(); //cria um objeto para requisição ao servidor
    const url=link;

    http.open("POST",link,true); //abre uma comunicação com o servidor através de uma requisição POST
    http.setRequestHeader('Content-Type','application/json'); //constroi um cabecalho http para envio dos dados

    dataToSend = JSON.stringify({name:_name});

    http.send(dataToSend);//envia dados para o servidor na forma de JSON

    
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

    
    http.onload = ()=>{
        
        let tr = document.querySelector(`table#list > tbody > tr[data-index-row='${index}']`);

        if (http.readyState === 4 && http.status === 200) {
            tr.remove();
            console.log(`Item ${index} removido`);
            
            listar('/cadastro/list');

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
        data.email = form._email.value;
        data.address = form._address.value;
        data.age = form._age.value;
        
        data.heigth = parseFloat(form._height.value).toFixed(2);
        data.vote = form._vote.checked;

        //dataToSend = JSON.stringify({id:index});
        dataToSend = JSON.stringify(data);
        
        http.send(dataToSend);
    
       
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
     
        
        http.onload = ()=>{
            
            if (http.readyState === 4 && http.status === 200) {
                alert("Usuário adicionado");
                listar('/cadastro/list');
    
            } else {
                console.log(`Erro durante a tentativa de adição do usuário: ${_name}! Código do Erro: ${http.status}`); 
            }
            
    
        }
    };
}


//inpirado por https://stackoverflow.com/questions/8302166/dynamic-creation-of-table-with-dom https://stackoverflow.com/users/376743/rightsaidfred
function populateTable(table, content) {
    //limpeza de tabela, o método firstChild captura o primeiro nodo na lista de nodos da tabela
    while (table.firstChild){
       table.removeChild(table.firstChild);
    }
    
    keys = Object.keys(content[0]);

    
    for (var i = 0; i < content.length; ++i) {     
        var row = document.createElement('tr');
        
        for (var j=0;j<6;j++){
            var newCell =  row.insertCell(j);
            newCell.innerHTML = '<span>'+content[i][keys[j]]+'</span>';
        }
        table.appendChild(row);
    }
}


function listar(link){
    
    const http = new XMLHttpRequest(); //cria um objeto para requisição ao servidor
    const url=link;

    http.open('GET',link,true); //abre uma comunicação com o servidor através de uma requisição POST
    http.setRequestHeader('Content-Type','application/json'); //constroi um cabecalho http para envio dos dados
    
    http.send();

    
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

    
    http.onload = ()=>{
        if (http.readyState === 4 && http.status === 200) {
            let lista = JSON.parse(http.response);
            let tb = document.querySelector(`table#list-users > tbody`);
            populateTable(tb, lista);
            return lista;
        } else {
            console.log(`Erro durante a tentativa de remoção do usuário: ${_name}! Código do Erro: ${http.status}`); 
        }
    }
}
