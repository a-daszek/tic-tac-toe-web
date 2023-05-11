function openPlayerConfig (event){/* funkcja która wyświetli konfigurację gracza oraz prześwitującą czarną kurtynę przez która nie możemy klikać w inne elementy*/
    editedPlayer = +event.target.dataset.playerid; //+1 => 1
    playerConfigOverlayElement.style.display = "block";
    backdropElement.style.display = "block"; 
}

function closePlayerConfig(){/* funkcja, której zadaniem jest nie wyświetlanie kurtyny i konfiguracji gracza*/
    playerConfigOverlayElement.style.display = "none"; 
    backdropElement.style.display = "none";
    formElement.firstElementChild.classList.remove("error"); //czyścimy jakkiekolwiek akcje związane z walidacją imienia gracza w przypadku zamknięcia okna konfiguracji gracza
    errorsOutputElement.textContent = ""; //czyścimy też wiadomość o błędzie
    formElement.firstElementChild.lastElementChild.value = "";
}

function savePlayerConfig(event){
    event.preventDefault();/*metoda ta powstrzymuje podstawowy schemat działania przeglądarki, tj. zapobiega wysłaniu żądania przez przeglądarkę do jakiegoś serwera */
    const formData = new FormData(event.target); /* blueprint formatki, dzięki niemu możemy wyciągnać input z formatek, easy*/
    const enteredPlayername = formData.get("playername").trim(); /* ściągamy nazwę gracza, a metoda trim usuwa spacje przed i za treścią */ 
    
    if (!enteredPlayername){ //dlaczego tak? ponieważ pusty string w js ma wartość false. Mogłoby być również enteredPlayername === " "//
        event.target.firstElementChild.classList.add("error"); //tworzy się klasa "form-control error" dzięki "add"
        errorsOutputElement.textContent = "Please enter a valid name.";
        return;
    }

    const updatedPlayerDataElement = document.getElementById("player-" + editedPlayer + "-data");
    updatedPlayerDataElement.children[1].textContent = enteredPlayername;
    // console.log(enteredPlayername);

    // if (editedPlayer ===1){
    //     players[0].name = enteredPlayername;
    // } else {
    //     players[1].name = enteredPlayername;
    // }

    players[editedPlayer - 1].name = enteredPlayername;
    closePlayerConfig();
}