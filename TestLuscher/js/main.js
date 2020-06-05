//url ai fogli di calcolo di google sheet che verranno consultati attraverso la libreria sheetrock.js
var urlp = 'https://docs.google.com/spreadsheets/d/153Slx_Q2Kcswkyv66afMTtli06BR8VF5BtKYxPEt2lA/edit#gid=0';
var urlx = 'https://docs.google.com/spreadsheets/d/1xQ0rgHphuO8i8Zv_H0_IM0idiF5vrNxHN6tCQbIP__Q/edit#gid=0' ;

var counter1 = 0 ;

var counter2 = 0 ;//contatore della 'selezione autentica' 
var ordinePesca = [] ;


//funzione ausiliaria a shuffle()
function tellApart(num, array){
    for(i in array){
        array[i] = array[i] + num;
    }
    return array;
}

// accetta come parametro il numero del mazzo
function shuffle(n){
    //dichiarazione mazzo neutro
    var deck = ['A','B','C','D','E','F','G','H']
    
    //distinzione mazzo, primo mazzo
    deck = tellApart(n,deck) ;
    
    
    var currentIndex = deck.length, tempValue, randomIndex ;
    
    //ciclo while per rimescolare il mazzo
    while(0 !== currentIndex){
    
        randomIndex= Math.floor(Math.random() * deck.length);
        currentIndex--;
        
        tempValue = deck[currentIndex];
        deck[currentIndex] = deck[randomIndex];
        deck[randomIndex] = tempValue;   
    }
    
    for(i=0; i < deck.length; i++){
        
        //riassegna l'id dei <div> rappresentanti le carte in maniera corrispondente al deck[] mescolato
        $('.card'+(i+1)+n).attr('id',deck[i]);
    }
}

//Mescola e fa comparire le carte
function inizioTest(ID){
    
    shuffle(1);
    $('#'+ ID).fadeOut('slow');
    $('#descrizione').fadeOut('slow')
    $('#indicazioni').fadeIn('slow');
    $('.selezione1').fadeIn('slow');
    
}

//funzione per la pesca 'fasulla'
function hideThenDisplay(ID) {
    if(counter1 != 7){
        $('#' + ID ).hide();
        counter1++;
    }
    // dopo l'ultima pesca mostra il <div> della 'selezione autentica' con le carte già mescolate
    else{
        shuffle(2);
        $('#' + ID ).hide();
        $('#indicazioni').html('Seleziona nuovamente i colori in ordine di preferenza');
        $('.selezione2').fadeIn('slow');
    }
}


//Selezione 'autentica'
//compila l'array ordinePesca[] con l'id delle carte seguendo l'ordine di selezione
function selezione(ID){
    if(counter2 != 7){
        ordinePesca[counter2] = ID ;
        $('#'+ID).hide();
        counter2++;
    }
    else{
        ordinePesca[counter2] = ID ;
        $('#'+ID).hide();
        $('#indicazioni').fadeOut('slow');
        $('#result').fadeIn('slow');
    }
}

//funzione ausiliaria a result assegna valori numerici alle stringhe contenute in ordinePesca[]
function alphToNum(array){
    for(i in array){
        switch(array[i]){
                
            case 'A2':
                array[i]=0;
                break;
            case 'B2':
                array[i]=1;
                break;
            case 'C2':
                array[i]=2;
                break;
            case 'D2':
                array[i]=3;
                break;
            case 'E2':
                array[i]=4;
                break;
            case 'F2':
                array[i]=5;
                break;
            case 'G2':
                array[i]=6;
                break;
            case 'H2':
                array[i]=7;
                break;
        }        
    }
}

// elabora le stringhe chiave per poi consultare le tabelle di analisi 
function result(){
    
    alphToNum(ordinePesca);
    
    var keyStrP = 'p' + ordinePesca[0] + ordinePesca[1] ;
    var keyStrX = 'x' + ordinePesca[2] + ordinePesca[3] ;
    
    
    //utilizzo della libreria sheetrock.js per consultare le tabelle dei risultati
    $('#rp').sheetrock({url: urlp , query: "select B where A = " + "'" + keyStrP + "'"});
    
    $('#rx').sheetrock({url: urlx , query: "select B where A = " + "'" + keyStrX + "'"});
    $('#result').fadeOut('slow');
    $('#rp').fadeIn('slow');
    S('#rx').fadeIn('slow');
    
}