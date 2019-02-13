// SENATE FETCH

var data;

fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {
    method: "GET",
    headers: {
        'X-API-Key': 'hWUraY9AaW7ZDhnxmHAqVdhrpce1LvKzZBtT2wK9'
    }
}).then(function (response) {

    return response.json();

}).then(function (json) {

    data = json
    members = data.results[0].members;
    populateobject1()
    document.getElementById("spin").style.display= "none";
    smallestvalue1()
    document.getElementById("spin1").style.display= "none";
    biggestvalue1()
    document.getElementById("spin2").style.display= "none";
    senateglance1()
    leastTable1()
    mostTable1()


}).catch(function (error) {


});

// HOUSE FETCH

var data;

fetch("https://api.propublica.org/congress/v1/113/house/members.json", {
    method: "GET",
    headers: {
        'X-API-Key': 'hWUraY9AaW7ZDhnxmHAqVdhrpce1LvKzZBtT2wK9'
    }
}).then(function (response) {

    return response.json();

}).then(function (json) {

    data = json
    members = data.results[0].members;
    populateobject()
    document.getElementById("spinner").style.display= "none";
    smallestvalue()
    document.getElementById("spinner1").style.display= "none";
    biggestvalue()
    document.getElementById("spinner2").style.display= "none";
    senateglance()
    leastTable()
    mostTable()


}).catch(function (error) {


});

// SENATE OBJECT

var statisticsobject = { //JSON donde almacenamos el objeto 

    "numberOfDemocrats": 0,
    "numberOfIndependents": 0,
    "numberOfRepublicans": 0,
    "numberOfTotal": 0,
    "averageOfDemocrats": 0,
    "averageOfRepublicans": 0,
    "averageOfIndependents": 0,
    "averageOfTotal": 0,
    "leastVotes": 0,
    "mostVotes": 0


}

// CALCULATION AND TABLES SENATE 

function populateobject1() {

    var votesDem = 0
    var votesRep = 0
    var votesInd = 0
    var votesTot = 0

    for (var i = 0; i < members.length; i++) {
        if (members[i].party == "D") { // cada vez que el miembro sea del partido democrata querremos que el valor de la key number of democrats le vaya sumando uno hasta saber cuantos democratas hay e igual con los republicanos e independientes:
            statisticsobject.numberOfDemocrats++;
            votesDem += members[i].votes_with_party_pct // sumaremos todo el rato el porcentaje de  votos de cada democrata entre el es decir al principio votesdem es 0 y le sumamos el porcentaje del primer democrata. ahora el votes dem ya nos 0 si no la suma entonces le sumaremos eso con el siguiente porcentaje del siguiente miembro. Lo mismo con los republicanos e independientes.

        } else if (members[i].party == "R") {
            statisticsobject.numberOfRepublicans++; // si el miembro del partido es republicano en el number of demcorats le sumaremos uno.
            votesRep += members[i].votes_with_party_pct
        } else if (members[i].party == "I") {
            statisticsobject.numberOfIndependents++; // si el miembro del partido es independiente en el number of demcorats le sumaremos uno.
            votesInd += members[i].votes_with_party_pct

        }

        statisticsobject.numberOfTotal++;
        votesTot += members[i].votes_with_party_pct

    }

    statisticsobject.averageOfDemocrats = (votesDem / statisticsobject.numberOfDemocrats); // queremos que la suma de los votos dividida entre el numero de todos los miembros de ese partido (es decir la media) sea el valor de la key del objeto de los democratas y lo mismo con los republicanos e independientes.
    statisticsobject.averageOfRepublicans = (votesRep / statisticsobject.numberOfRepublicans);
    statisticsobject.averageOfIndependents = (votesInd / statisticsobject.numberOfIndependents);
    statisticsobject.averageOfTotal = (votesTot / statisticsobject.numberOfTotal);

    console.log(statisticsobject);
}


function smallestvalue1() {

    var memberscopy = Array.from(members); // aqui estoy haciendo una copia de la array porque no quiero que se ordene ella porque entonces en todos los casos estara ordenada, solo la necessito ordenada en esta funcion asi que hago una copia.

    memberscopy.sort(function (a, b) { // como ahora dentro de la array tengo objetos no puedo hacer un sort simple porque no sabr que coger de dentro del objeto asi que tengo que hacer esta funcion con el return para poder especificarle que es lo que quiero que me ordene de dentro del objeto.
        return a.votes_with_party_pct - b.votes_with_party_pct;
    });

    var leastVotes = [] // aqui creo una array que es donde quiero poner el 10% mas pequeño de votos donde luego despues del for le hare el push para meterlo dentro.
    for (var i = 0; i < memberscopy.length; i++) { // aqui hago un for del memberscopy.length porque es la copia y le hago el 10% de esta manera mutiplicandolo por 0,1 (manera simplificada).
                if (i < memberscopy.length * 0.1) {
            leastVotes.push(memberscopy[i]);
        } else if (memberscopy[i].votes_with_party_pct == memberscopy[i - 1].votes_with_party_pct) {
            leastVotes.push(memberscopy[i])
        } else {
            break;
        }

    }

    statisticsobject.leastVotes = leastVotes;
    console.log(leastVotes);


}


function biggestvalue1() {

    var memberscopy2 = Array.from(members);

    memberscopy2.sort(function (a, b) {

        return b.votes_with_party_pct - a.votes_with_party_pct;
    });

    var mostVotes = []

    for (var i = 0; i < memberscopy2.length * 0.1; i++) {

        if (i < memberscopy2.length * 0.1) {
            mostVotes.push(memberscopy2[i]);
        } else if (memberscopy2[i].votes_with_party_pct == memberscopy2[i - 1].votes_with_party_pct) {
            mostVotes.push(memberscopy2[i]);
        } else {
            break;
        }

    }
    statisticsobject.mostVotes = mostVotes;
    console.log(mostVotes);
}


function senateglance1() {

    var tbody = document.getElementById("glance");


    var tr = document.createElement("tr");
    var democrats = document.createElement("td");
    var cellNumOfMembers = document.createElement("td");
    var cellVotedWithParty = document.createElement("td");


    var tr1 = document.createElement("tr");
    var republicans = document.createElement("td");
    var cellNumOfMembers1 = document.createElement("td");
    var cellVotedWithParty1 = document.createElement("td");


    var tr2 = document.createElement("tr");
    var independents = document.createElement("td");
    var cellNumOfMembers2 = document.createElement("td");
    var cellVotedWithParty2 = document.createElement("td");


    var tr3 = document.createElement("tr");
    var total = document.createElement("td");
    var cellNumOfMembers3 = document.createElement("td");
    var cellVotedWithParty3 = document.createElement("td");



    var cellmembers = statisticsobject.numberOfDemocrats;
    var cellvotes = statisticsobject.averageOfDemocrats.toFixed(2) + " %";

    var cellmembers1 = statisticsobject.numberOfRepublicans;
    var cellvotes1 = statisticsobject.averageOfRepublicans.toFixed(2) + " %";

    var cellmembers2 = statisticsobject.numberOfIndependents;
    var cellvotes2 = statisticsobject.averageOfIndependents.toFixed(2) + " %";

    var cellmembers3 = statisticsobject.numberOfTotal;
    var cellvotes3 = statisticsobject.averageOfTotal.toFixed(2) + " %";


    democrats.append("democrats");
    cellNumOfMembers.append(cellmembers);
    cellVotedWithParty.append(cellvotes);
    republicans.append("republicans");
    cellNumOfMembers1.append(cellmembers1);
    cellVotedWithParty1.append(cellvotes1);
    independents.append("independents");
    cellNumOfMembers2.append(cellmembers2);
    cellVotedWithParty2.append(cellvotes2);
    total.append("total");
    cellNumOfMembers3.append(cellmembers3);
    cellVotedWithParty3.append(cellvotes3);


    tr.append(democrats, cellNumOfMembers, cellVotedWithParty);
    tr1.append(republicans, cellNumOfMembers1, cellVotedWithParty1);
    tr2.append(independents, cellNumOfMembers2, cellVotedWithParty2);
    tr3.append(total, cellNumOfMembers3, cellVotedWithParty3);

    tbody.append(tr, tr1, tr2, tr3);


}


function leastTable1() {

    var tBody = document.getElementById("top");

    for (var a = 0; a < statisticsobject.leastVotes.length; a++) {

        var row = document.createElement("tr");


        var cellname = document.createElement("td");
        var cellnumber = document.createElement("td");
        var cellmissed = document.createElement("td");

        var linkname = document.createElement("a");
        if (statisticsobject.leastVotes[a].url != "") {
            linkname.setAttribute("href", statisticsobject.leastVotes[a].url);
            linkname.setAttribute("target", "_blank");
        }

        var name = statisticsobject.leastVotes[a].first_name;
        var middlename = statisticsobject.leastVotes[a].middle_name;
        if (middlename == null) {
            middlename = ""
        }
        var secondname = statisticsobject.leastVotes[a].last_name;
        var numbervotes = statisticsobject.leastVotes[a].total_votes;
        var missedpct = statisticsobject.leastVotes[a].votes_with_party_pct + " %";

        var fila = (name + " " + middlename + " " + secondname)


        linkname.append(fila);
        cellname.append(linkname);
        cellnumber.append(numbervotes);
        cellmissed.append(missedpct);

        row.append(cellname);
        row.append(cellnumber);
        row.append(missedpct);

        tBody.append(row);


    }

}


function mostTable1() {

    var tBody = document.getElementById("loyal");

    for (var a = 0; a < statisticsobject.mostVotes.length; a++) {

        var row = document.createElement("tr");

        var cellname = document.createElement("td");
        var cellnumber = document.createElement("td");
        var cellmissed = document.createElement("td");

        var linkname = document.createElement("a");
        if (statisticsobject.mostVotes[a].url != "") {
            linkname.setAttribute("href", statisticsobject.mostVotes[a].url);
            linkname.setAttribute("target", "_blank");
        }

        var name = statisticsobject.mostVotes[a].first_name;
        var middlename = statisticsobject.mostVotes[a].middle_name;
        if (middlename == null) {
            middlename = ""
        }
        var secondname = statisticsobject.mostVotes[a].last_name;
        var numbervotes = statisticsobject.mostVotes[a].total_votes;
        var missedpct = statisticsobject.mostVotes[a].votes_with_party_pct + " %";


        var fila = (name + " " + middlename + " " + secondname)


        linkname.append(fila);
        cellname.append(linkname);
        cellnumber.append(numbervotes);
        cellmissed.append(missedpct);

        row.append(cellname);
        row.append(cellnumber);
        row.append(missedpct);

        tBody.append(row);


    }






}

// HOUSE OBJECT

var statisticsobject = { //JSON donde almacenamos el objeto 

    "numberOfDemocrats": 0,
    "numberOfIndependents": 0,
    "numberOfRepublicans": 0,
    "numberOfTotal": 0,
    "averageOfDemocrats": 0,
    "averageOfRepublicans": 0,
    "averageOfIndependents": 0,
    "averageOfTotal": 0,
    "leastVotes": 0,
    "mostVotes": 0


}

// CALCULATION AND TABLE HOUSE

function populateobject() {

    var votesDem = 0
    var votesRep = 0
    var votesInd = 0
    var votesTot = 0

    for (var i = 0; i < members.length; i++) {
        if (members[i].party == "D") { // cada vez que el miembro sea del partido democrata querremos que el valor de la key number of democrats le vaya sumando uno hasta saber cuantos democratas hay e igual con los republicanos e independientes:
            statisticsobject.numberOfDemocrats++;
            votesDem += members[i].votes_with_party_pct // sumaremos todo el rato el porcentaje de  votos de cada democrata entre el es decir al principio votesdem es 0 y le sumamos el porcentaje del primer democrata. ahora el votes dem ya nos 0 si no la suma entonces le sumaremos eso con el siguiente porcentaje del siguiente miembro. Lo mismo con los republicanos e independientes.

        } else if (members[i].party == "R") {
            statisticsobject.numberOfRepublicans++; // si el miembro del partido es republicano en el number of demcorats le sumaremos uno.
            votesRep += members[i].votes_with_party_pct
        } else if (members[i].party == "I") {
            statisticsobject.numberOfIndependents++; // si el miembro del partido es independiente en el number of demcorats le sumaremos uno.
            votesInd += members[i].votes_with_party_pct

        }
        statisticsobject.numberOfTotal++;
        votesTot += members[i].votes_with_party_pct

    }

    statisticsobject.averageOfDemocrats = (votesDem / statisticsobject.numberOfDemocrats); // queremos que la suma de los votos dividida entre el numero de todos los miembros de ese partido (es decir la media) sea el valor de la key del objeto de los democratas y lo mismo con los republicanos e independientes.
    statisticsobject.averageOfRepublicans = (votesRep / statisticsobject.numberOfRepublicans);
    statisticsobject.averageOfIndependents = (votesInd / statisticsobject.numberOfIndependents);
    statisticsobject.averageOfTotal = (votesTot / statisticsobject.numberOfTotal);

    console.log(statisticsobject);
}


function smallestvalue() {

    var memberscopy = Array.from(members); // aqui estoy haciendo una copia de la array porque no quiero que se ordene ella porque entonces en todos los casos estara ordenada, solo la necessito ordenada en esta funcion asi que hago una copia.

    memberscopy.sort(function (a, b) { // como ahora dentro de la array tengo objetos no puedo hacer un sort simple porque no sabr que coger de dentro del objeto asi que tengo que hacer esta funcion con el return para poder especificarle que es lo que quiero que me ordene de dentro del objeto.
        return a.votes_with_party_pct - b.votes_with_party_pct;
    });

    var leastVotes = [] // aqui creo una array que es donde quiero poner el 10% mas pequeño de votos donde luego despues del for le hare el push para meterlo dentro.
    for (var i = 0; i < memberscopy.length ; i++) { // aqui hago un for del memberscopy.length porque es la copia y le hago el 10% de esta manera mutiplicandolo por 0,1 (manera simplificada).
        
                if (i < memberscopy.length * 0.1) {
            leastVotes.push(memberscopy[i]); // si ese elemento justo de la array es mas pequeño que el 10% queremos que le haga un push directo, luego en else if si ya no es mas pequeño si no que mas grande queremos que se compare con el anterior si son iguales haremos un push si son diferentes le pondremos un break para que pare de funcionar el for.
        } else if (memberscopy[i].votes_with_party_pct == memberscopy[i - 1].votes_with_party_pct) {
            leastVotes.push(memberscopy[i])
        } else {
            break;
        }
        
    }

    statisticsobject.leastVotes = leastVotes;
    console.log(leastVotes);


}


function biggestvalue() {

    var memberscopy2 = Array.from(members);

    memberscopy2.sort(function (a, b) {

        return b.votes_with_party_pct - a.votes_with_party_pct;
    });

    var mostVotes = []

    for (var i = 0; i < memberscopy2.length * 0.1; i++) {

        if (i < memberscopy2.length * 0.1) {
            mostVotes.push(memberscopy2[i]);
        } else if (memberscopy2[i].votes_with_party_pct == memberscopy2[i - 1].votes_with_party_pct) {
            mostVotes.push(memberscopy2[i]);
        } else {
            break;
        }

    }
    statisticsobject.mostVotes = mostVotes;
    console.log(mostVotes);
}


function senateglance() {

    var tbody = document.getElementById("glance1");


    var tr = document.createElement("tr");
    var democrats = document.createElement("td");
    var cellNumOfMembers = document.createElement("td");
    var cellVotedWithParty = document.createElement("td");


    var tr1 = document.createElement("tr");
    var republicans = document.createElement("td");
    var cellNumOfMembers1 = document.createElement("td");
    var cellVotedWithParty1 = document.createElement("td");


    var tr2 = document.createElement("tr");
    var independents = document.createElement("td");
    var cellNumOfMembers2 = document.createElement("td");
    var cellVotedWithParty2 = document.createElement("td");


    var tr3 = document.createElement("tr");
    var total = document.createElement("td");
    var cellNumOfMembers3 = document.createElement("td");
    var cellVotedWithParty3 = document.createElement("td");



    var cellmembers = statisticsobject.numberOfDemocrats;
    var cellvotes = statisticsobject.averageOfDemocrats.toFixed(2) + " %";

    var cellmembers1 = statisticsobject.numberOfRepublicans;
    var cellvotes1 = statisticsobject.averageOfRepublicans.toFixed(2) + " %";

    var cellmembers2 = statisticsobject.numberOfIndependents;
    var cellvotes2 = 0 + " %";

    var cellmembers3 = statisticsobject.numberOfTotal;
    var cellvotes3 = statisticsobject.averageOfTotal.toFixed(2) + " %";

    democrats.append("democrats");
    cellNumOfMembers.append(cellmembers);
    cellVotedWithParty.append(cellvotes);
    republicans.append("republicans");
    cellNumOfMembers1.append(cellmembers1);
    cellVotedWithParty1.append(cellvotes1);
    independents.append("independents");
    cellNumOfMembers2.append(cellmembers2);
    cellVotedWithParty2.append(cellvotes2);
    total.append("total");
    cellNumOfMembers3.append(cellmembers3);
    cellVotedWithParty3.append(cellvotes3);

    tr.append(democrats, cellNumOfMembers, cellVotedWithParty);
    tr1.append(republicans, cellNumOfMembers1, cellVotedWithParty1);
    tr2.append(independents, cellNumOfMembers2, cellVotedWithParty2);
    tr3.append(total, cellNumOfMembers3, cellVotedWithParty3);

    tbody.append(tr, tr1, tr2, tr3);


}


function leastTable() {

    var tBody = document.getElementById("top1");

    for (var a = 0; a < statisticsobject.leastVotes.length; a++) {

        var row = document.createElement("tr");


        var cellname = document.createElement("td");
        var cellnumber = document.createElement("td");
        var cellmissed = document.createElement("td");

        var linkname = document.createElement("a");
        if (statisticsobject.leastVotes[a].url != "") {
            linkname.setAttribute("href", statisticsobject.leastVotes[a].url);
            linkname.setAttribute("target", "_blank");
        }

        var name = statisticsobject.leastVotes[a].first_name;
        var middlename = statisticsobject.leastVotes[a].middle_name;
        if (middlename == null) {
            middlename = ""
        }
        var secondname = statisticsobject.leastVotes[a].last_name;
        var numbervotes = statisticsobject.leastVotes[a].total_votes;
        var missedpct = statisticsobject.leastVotes[a].votes_with_party_pct + " %";

        var fila = (name + " " + middlename + " " + secondname)


        linkname.append(fila);
        cellname.append(linkname);
        cellnumber.append(numbervotes);
        cellmissed.append(missedpct);

        row.append(cellname);
        row.append(cellnumber);
        row.append(missedpct);

        tBody.append(row);


    }

}


function mostTable() {

    var tBody = document.getElementById("loyal1");

    for (var a = 0; a < statisticsobject.mostVotes.length; a++) {

        var row = document.createElement("tr");

        var cellname = document.createElement("td");
        var cellnumber = document.createElement("td");
        var cellmissed = document.createElement("td");

        var linkname = document.createElement("a");
        if (statisticsobject.mostVotes[a].url != "") {
            linkname.setAttribute("href", statisticsobject.mostVotes[a].url);
            linkname.setAttribute("target", "_blank");
        }

        var name = statisticsobject.mostVotes[a].first_name;
        var middlename = statisticsobject.mostVotes[a].middle_name;
        if (middlename == null) {
            middlename = ""
        }
        var secondname = statisticsobject.mostVotes[a].last_name;
        var numbervotes = statisticsobject.mostVotes[a].total_votes;
        var missedpct = statisticsobject.mostVotes[a].votes_with_party_pct + " %";


        var fila = (name + " " + middlename + " " + secondname)


        linkname.append(fila);
        cellname.append(linkname);
        cellnumber.append(numbervotes);
        cellmissed.append(missedpct);

        row.append(cellname);
        row.append(cellnumber);
        row.append(missedpct);

        tBody.append(row);


    }

}
