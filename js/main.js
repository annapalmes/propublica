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
    console.log(data)
    members = data.results[0].members;
    console.log(members)
    document.getElementById("spin").style.display= "none";
    primeratabla();
    filterMembers1();
    
}).catch(function (error) {


});

// HOUSE FETCH 

var data;

fetch("https://api.propublica.org/congress/v1/113/house/members.json",{
    method : "GET",
    headers : {
        'X-API-Key': 'hWUraY9AaW7ZDhnxmHAqVdhrpce1LvKzZBtT2wK9' 
    }
}).then( function(response){
    
    return response.json();
    
}).then ( function (json) {
    
    data = json 
    members = data.results[0].members;
    segundatabla();
    filterMembers();
   
    
}).catch ( function (error){
    
    
});

// SENATE EVENT LISTENER 

document.getElementById("democrat").addEventListener("click", filterMembers1);
document.getElementById("republican").addEventListener("click", filterMembers1);
document.getElementById("independent").addEventListener("click", filterMembers1);
document.getElementById("states").addEventListener("change", filterMembers1);

// SENATE TABLES AND FILTERS

function primeratabla() {

    var tbody = document.getElementById("senate-data");

    for (var n = 0; n < members.length; n++) {

        var fila = document.createElement("tr");
        fila.setAttribute("class", members[n].party);

        var cellname = document.createElement("td");
        var cellparty = document.createElement("td");
        var cellstate = document.createElement("td");
        var cellseniority = document.createElement("td");
        var cellvotes = document.createElement("td");

        var linkname = document.createElement("a");
        linkname.setAttribute("href", members[n].url, );
        linkname.setAttribute("target", "_blank");

        var firstname = members[n].first_name;
        var middlename = members[n].middle_name;
        if (middlename == null) {
            middlename = ""
        }
        var lastname = members[n].last_name;
        var party = members[n].party;
        var state = members[n].state;
        var seniority = members[n].seniority;
        var totalvotes = members[n].votes_with_party_pct + " %";

        var firstcell = (firstname + " " + middlename + " " + lastname);

        linkname.append(firstcell);
        cellname.append(linkname);
        cellparty.append(party);
        cellstate.append(state);
        cellseniority.append(seniority);
        cellvotes.append(totalvotes);

        fila.append(cellname);
        fila.append(cellparty);
        fila.append(cellstate);
        fila.append(cellseniority);
        fila.append(cellvotes);

        tbody.append(fila);

    }
//    
//    if ( trMember[n].style.display == "none" )
//        
//       var row = document.createElement("tr");
//    
//       row.append("there are no members for this filter");
//       tbody.append(row);

}

function filterMembers1() {
    // llamar la array de los checkbox
    var partidos = Array.from(document.querySelectorAll('input[name=party]:checked'));

    var estados = document.getElementById("states").value;

    console.log("partidos: ", partidos);
    // estoy pidiendo que por cada elemento de la array vaya a ver el defaultvalue que es donde nos dice si son republican independent o democrat
    for (var n = 0; n < partidos.length; n++) {

        partidos[n] = partidos[n].defaultValue;

    }

    console.log(partidos);

    // luego escojo donde quiero meter los estados con el id que le he puesto en el html
    var select = document.getElementById("states");
    // luego creo una variable vacía porque es donde quiero meter la informacion
    var myStates = [];
    // creo un for y una nueva variable que ira cogiendo los estados de cada persona pero luego le digo en el if que si ese estado ya esta en la array de myStates que no me lo vuelva a poner.
    for (var n = 0; n < members.length; n++) {
        var myState2 = members[n].state;
        if (!myStates.includes(myState2)) {
            myStates.push(myState2);
        }
        //aqui ordeno la array mystates en orden alfabetico
        myStates.sort();
    }
    // creo un for para decirle que por cada estado que tengo dentro de la array le cree una option.
    for (var i = 0; i < myStates.length; i++) {
        var option = document.createElement("option");
        // y aqui juntamos a los padres con los hijos para que no esten soltados en el limbo.   
        option.append(myStates[i]);
        select.append(option);

    }

    //llamar toda la información de la tabla

    var trMember = document.getElementById("senate-data").rows;
    console.log(trMember);
    // estoy pidiendo que por cada elemento de la array mire que default value tiene y segun el checkbox seleccionado o no seleccionado  que la fila se esconda o no se esconda 
    for (var i = 0; i < trMember.length; i++) {
        //       console.log(trMember[i].cells[1].innerHTML)
        var partyFilter = partidos.includes(trMember[i].cells[1].innerHTML) || partidos.length == 0; // aqui le estamos dando un nombre a la condicion
        var stateFilter = estados == trMember[i].cells[2].innerHTML || estados == "state"; // y aqui otro nombre para que sean mas cortas

        if (partyFilter && stateFilter) {
            trMember[i].style.display = "table-row"
        } else {
            trMember[i].style.display = "none"
        }
    }

}

// HOUSE EVENT LISTENER

document.getElementById("democrat").addEventListener("click", filterMembers);
document.getElementById("republican").addEventListener("click", filterMembers);
document.getElementById("independent").addEventListener("click", filterMembers);
document.getElementById("states").addEventListener("change", filterMembers);

// HOUSE TABLES AND FILTERS

function segundatabla() {

    var tbody = document.getElementById("house-data");

    for (var n = 0; n < members.length; n++) {

        var fila = document.createElement("tr");

        var cellname = document.createElement("td");
        var cellparty = document.createElement("td");
        var cellstate = document.createElement("td");
        var cellseniority = document.createElement("td");
        var cellvotes = document.createElement("td");

        var linkname = document.createElement("a");
        linkname.setAttribute("href", members[n].url, );
        linkname.setAttribute("target", "_blank");

        var firstname = members[n].first_name;
        var middlename = members[n].middle_name;
        if (middlename == null) {
            middlename = ""
        }
        var lastname = members[n].last_name;
        var party = members[n].party;
        var state = members[n].state;
        var seniority = members[n].seniority;
        var totalvotes = members[n].total_votes;

        var firstcell = (firstname + " " + middlename + " " + lastname);


        linkname.append(firstcell);
        cellname.append(linkname);
        cellparty.append(party);
        cellstate.append(state);
        cellseniority.append(seniority);
        cellvotes.append(totalvotes);

        fila.append(cellname);
        fila.append(cellparty);
        fila.append(cellstate);
        fila.append(cellseniority);
        fila.append(cellvotes);

        tbody.append(fila);

    }

}


function filterMembers() {
    // llamar la array de los checkbox
    var partidos = Array.from(document.querySelectorAll('input[name=party]:checked'));

    var estados = document.getElementById("states").value;

    console.log("partidos: ", partidos);
    // estoy pidiendo que por cada elemento de la array vaya a ver el defaultvalue que es donde nos dice si son republican independent o democrat
    for (var n = 0; n < partidos.length; n++) {

        partidos[n] = partidos[n].defaultValue;

    }

    console.log(partidos);
    
    //  escojo donde quiero meter los estados con el id que le he puesto en el html
    var select = document.getElementById("states");
    // luego creo una variable vacía porque es donde quiero meter la informacion
    var myStates = [];
    // creo un for y una nueva variable que ira cogiendo los estados de cada persona pero luego le digo en el if que si ese estado ya esta en la array de myStates que no me lo vuelva a poner.
    for (var n = 0; n < members.length; n++) {
        var myState2 = members[n].state;
        if (!myStates.includes(myState2)) {
            myStates.push(myState2);
        }
        //aqui ordeno la array mystates en orden alfabetico
        myStates.sort();
    }
    // creo un for para decirle que por cada estado que tengo dentro de la array le cree una option.
    for (var i = 0; i < myStates.length; i++) {
        var option = document.createElement("option");
        // y aqui juntamos a los padres con los hijos para que no esten soltados en el limbo.   
        option.append(myStates[i]);
        select.append(option);

    }
    
    //llamar toda la información de la tabla

    var trMember = document.getElementById("house-data").rows;
    console.log(trMember);
    // estoy pidiendo que por cada elemento de la array mire que default value tiene y segun el checkbox seleccionado o no seleccionado  que la fila se esconda o no se esconda 
    for (var i = 0; i < trMember.length; i++) {
        //       console.log(trMember[i].cells[1].innerHTML)
        var partyFilter = partidos.includes(trMember[i].cells[1].innerHTML) || partidos.length == 0; // aqui le estamos dando un nombre a la condicion// el tr member es la row la cell es el espacio y el inner html es el texto de dentro de la cell 
        var stateFilter = estados == trMember[i].cells[2].innerHTML || estados == "state"; // y aqui otro nombre para que sean mas cortas// 

        if (partyFilter && stateFilter) {
            trMember[i].style.display = "table-row"
        } else {
            trMember[i].style.display = "none"
        } 
          
    }

}

// HOME BUTTON

function myFunction () {
    
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var myButton = document.getElementById("myButton");
    
    if (dots.style.display == "none"){
              
      dots.style.display = "inline";
      myButton.innerHTML = "Read more"; 
      moreText.style.display = "none";
             
  } else {

    dots.style.display = "none";
    myButton.innerHTML = "Read less"; 
    moreText.style.display = "inline";
  }

    }


