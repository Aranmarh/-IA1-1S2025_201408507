function reflex_agent(location, state) {
    if (state == "DIRTY") return "CLEAN";
    else if (location == "A") return "RIGHT";
    else if (location == "B") return "LEFT";
}

function test(states, limpioA, limpioB) {
    var location = states[0];
    var state = states[0] == "A" ? states[1] : states[2];
    var action_result = reflex_agent(location, state);

    // Mostrar la acción en el log
    document.getElementById("log").innerHTML += "<br>Location: " + location + " | Action: " + action_result;

    // Actualizar el estado del entorno y las banderas
    if (action_result == "CLEAN") {
        if (location == "A") {
            states[1] = "CLEAN";
            limpioA = true; // Activar bandera limpioA
        } else if (location == "B") {
            states[2] = "CLEAN";
            limpioB = true; // Activar bandera limpioB
        }
    } else if (action_result == "RIGHT") {
        states[0] = "B";
    } else if (action_result == "LEFT") {
        states[0] = "A";
    }

    // Condición de parada: si ambas banderas están activas, detener la ejecución
    if (limpioA && limpioB) {
        document.getElementById("log").innerHTML += "<br>Ambas ubicaciones estan limpias. Fin de la simulación.";
        return; // Detener la ejecución
    }

    // Continuar la simulación después de 2 segundos
    setTimeout(function () {
        test(states, limpioA, limpioB);
    }, 2000);
}

// Estado inicial: el agente está en "A" y ambas ubicaciones están sucias
var states = ["A", "DIRTY", "DIRTY"];
var limpioA = false; // Banderas inicialmente desactivadas
var limpioB = false;
test(states, limpioA, limpioB);