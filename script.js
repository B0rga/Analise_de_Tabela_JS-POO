class Analisador{
    constructor(){
        this.arrayNumeros = [];
    }

    LerDados(){
        let analisador = {};

        // ao receber o valor estou "forçando" sua conversão para number. Caso contrário ele será adicionado a array
        // como uma string, e assim não será possível realizar processos matemáticos entre eles, como achar o maior.
        analisador.num = Number(document.querySelector("#num").value); 
        return analisador;
    }

    // método que verifica se o campo está preenchido ou com dados válidos
    ValidaCampo(analisador){
        if(analisador.num==''){
            document.querySelector("small").innerHTML = "Insira um valor!";
            return false;
        }
        else if(analisador.num>100){
            document.querySelector("small").innerHTML = "O valor deve ser menor que 100!";
            return false;
        }
        else if(analisador.num<0){
            document.querySelector("small").innerHTML = "O valor deve ser maior que 0!";
            return false;
        }
        else{
            document.querySelector("small").innerHTML = "";
            return true;
        }
    }

    // método que verifica se o valor já existe na array
    VerificaValorNovo(analisador){

        // se a array estiver vazia retornará true, já que é o primeiro valor a ser inserido
        if(this.arrayNumeros == ''){
            document.querySelector("small").innerHTML = "";
            return true;
        }
        else{
            // este for irá percorrer por cada elemento da array e verificar se algum deles é o mesmo que o valor digitado
            for(let i=0; i<this.arrayNumeros.length; i++){
                if(this.arrayNumeros[i]==analisador.num){ // comparando o valor digitado com o valor atual da array
                    this.LimpaCampo();
                    document.querySelector("small").innerHTML = `O valor ${this.arrayNumeros[i]} já está na lista!`;
                    return false;
                }
            }
        }
        document.querySelector("small").innerHTML = "";
        return true;
    }   

    LimpaCampo(){
        document.querySelector("#num").value = '';
    }

    // método que limpa a array e o texto de elementos do HTML
    LimparResultado(){
        this.arrayNumeros = [];
        document.querySelector("#quantidade").innerHTML = "";
        document.querySelector("#maiorNumero").innerHTML = "";
        document.querySelector("#menorNumero").innerHTML = "";
        document.querySelector("#somaNumeros").innerHTML = "";
        document.querySelector("#media").innerHTML = "";
        document.querySelector("select").innerHTML = "";
        document.querySelector("small").innerHTML = "";
        this.TornaEscondido();
    }

    // método para tornar elementos do HTML visíveis
    TornaVisivel(){
        document.querySelector("#resultado").style.visibility="visible";
    }

    // método para esconder elementos do HTML
    TornaEscondido(){
        document.querySelector("#resultado").style.visibility="hidden";
    }

    // método que adiciona o valor na array
    AdicionarNaArray(analisador){
        this.arrayNumeros.push(analisador.num);
        console.log(this.arrayNumeros);
    }

    // método que adiciona os valores da array à tabela
    AdicionarNaTabela(){
        let tabela = document.querySelector("select");

        // a adição de elementos à tabela se dá pela seguinte forma: a cada novo elemento inserido na array,
        // a tabela dever ser completamente zerada, para então receber os elementos da array atualizada.
        // Se não fizermos isso, ao adicinarmos um novo elemento, os antigos serão adicionados novamente.
        // Portando, abaixo estamos removendo todo o seu texto, para depois adicionar os elementos da array atualizada 
        tabela.innerText = '';

        // percorrendo por cada elemento da array e adicionando à tabela (select)
        for(let i=0; i<this.arrayNumeros.length; i++){
            let op = document.createElement("option");
            op.innerHTML = `Valor ${this.arrayNumeros[i]} adicionado`;
            tabela.appendChild(op);
        }
    }

    // método principal
    Salvar(){
        let analisador = this.LerDados(); // objeto analisador recebendo os dados
        if(this.ValidaCampo(analisador)){ // verificando os campos
            if(this.VerificaValorNovo(analisador)){ // verificando se o valor digitado já está na array
                this.AdicionarNaArray(analisador);
                this.AdicionarNaTabela();
                this.TornaVisivel();
                this.LimpaCampo();
            }
        }
    }

    // método para contar a quandidade de elementos da array
    Quantidade(){
        document.querySelector("#quantidade").innerHTML = `Total de números adicionados: ${this.arrayNumeros.length}`;
    }

    // método para encontrar o maior número da array
    MaiorNumero(){
        let maior;
        for(let i=0;i<this.arrayNumeros.length;i++){
            if(i==0){
                maior = this.arrayNumeros[i];
            }
            else if(this.arrayNumeros[i]>maior){
                maior = this.arrayNumeros[i];
            }
        }
        document.querySelector("#maiorNumero").innerHTML = `Maior número: ${maior}`;
    }

    // método para encontrar o menor número da array
    MenorNumero(){
        let menor;
        for(let i=0;i<this.arrayNumeros.length;i++){
            if(i==0){
                menor = this.arrayNumeros[i];
            }
            else if(this.arrayNumeros[i]<menor){
                menor = this.arrayNumeros[i];
            }
        }
        document.querySelector("#menorNumero").innerHTML = `Menor número: ${menor}`;
    }

    // método fazer a soma entre elementos da array
    SomarNumeros(){
        let total = 0;
        for(let i=0;i<this.arrayNumeros.length;i++){
            total+=this.arrayNumeros[i];
        }
        document.querySelector("#somaNumeros").innerHTML = `Soma dos números: ${total}`;
        return total;
    }

    // método para fazer a média entre elementos da array
    CalcMedia(total){
        let media = total/this.arrayNumeros.length;
        document.querySelector("#media").innerHTML = `Média dos números: ${media.toFixed(2)}`;
    }

    // método para gerar resultados sobre a array
    Analisar(){
        this.Quantidade();
        this.MaiorNumero();
        this.MenorNumero();
        let total = this.SomarNumeros();
        this.CalcMedia(total);
    }    
}

const analisador = new Analisador(); // instanciando a classe