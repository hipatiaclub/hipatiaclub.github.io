const textoTerminal = "> INICIANDO TRANSMISIÓN DE DATOS...\n> ARCHIVOS ENCRIPTADOS RECONOCIDOS.\n> COORDENADAS: VALLE DE HIPATIA, CHILE.\n> DESENCRIPTACIÓN EXITOSA. BIENVENIDO.";

const velocidad = 30; 
let i = 0;

function teclearTexto() {
    if (i < textoTerminal.length) {
        let caracter = textoTerminal.charAt(i);
        if (caracter === '\n') {
            document.getElementById("typewriter").innerHTML += "<br><br>";
        } else {
            document.getElementById("typewriter").innerHTML += caracter;
        }
        i++;
        setTimeout(teclearTexto, velocidad);
    } else {
        // Revela gradualmente todas las secciones una vez que termina de teclear
        setTimeout(() => {
            const contenido = document.getElementById("contenido-clasificado");
            contenido.style.display = "block";
            contenido.style.opacity = "0";
            
            // Efecto fade-in controlado por código
            let opacidad = 0;
            const fadeIn = setInterval(() => {
                if (opacidad >= 1) {
                    clearInterval(fadeIn);
                } else {
                    opacidad += 0.05;
                    contenido.style.opacity = opacidad;
                }
            }, 30);
        }, 400);
    }
}

window.onload = function() {
    document.getElementById("contenido-clasificado").style.display = "none";
    setTimeout(teclearTexto, 800);
};

// --- SISTEMA DE REPRODUCCIÓN DE AUDIO ---
const reproductor = document.createElement("audio");
let botonActivo = null;

function reproducirAudio(archivoUrl, boton) {
    // Si el usuario hace clic en el mismo botón que está sonando, se pausa
    if (!reproductor.paused && botonActivo === boton) {
        reproductor.pause();
        boton.innerText = "[ EJECUTAR ]";
        return;
    }
    
    // Si había otro botón sonando, le devuelve su texto original
    if (botonActivo) {
        botonActivo.innerText = "[ EJECUTAR ]";
    }
    
    // Configura la pista y le da play
    reproductor.src = archivoUrl;
    
    // Intenta reproducir. Si el archivo no existe en tu carpeta, te avisa.
    reproductor.play().then(() => {
        boton.innerText = "[ DETENER ]";
        botonActivo = boton;
    }).catch(error => {
        alert(`Sistema: Debes guardar un archivo de audio llamado "${archivoUrl}" en la misma carpeta que tu index.html para escucharlo.`);
    });
    
    // Cuando la pista termina sola, el botón vuelve a la normalidad
    reproductor.onended = function() {
        boton.innerText = "[ EJECUTAR ]";
    };
}