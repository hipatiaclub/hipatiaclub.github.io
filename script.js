const terminalText = "> INITIATING DATA TRANSFER...\n> ENCRYPTED FILES RECOGNIZED.\n> COORDINATES: HIPATIA VALLEY, CHILE.\n> DECRYPTION SUCCESSFUL. WELCOME TO THE CLUB.";

const typingSpeed = 50; 
let charIndex = 0;

function typeWriter() {
    if (charIndex < terminalText.length) {
        let char = terminalText.charAt(charIndex);
        if (char === '\n') {
            document.getElementById("typewriter").innerHTML += "<br><br>";
        } else {
            document.getElementById("typewriter").innerHTML += char;
        }
        charIndex++;
        setTimeout(typeWriter, typingSpeed);
    } else {
        setTimeout(() => {
            const content = document.getElementById("classified-content");
            content.style.display = "block";
            content.style.opacity = "0";
            
            let opacity = 0;
            const fadeInInterval = setInterval(() => {
                if (opacity >= 1) {
                    clearInterval(fadeInInterval);
                } else {
                    opacity += 0.05;
                    content.style.opacity = opacity;
                }
            }, 30);
        }, 400);
    }
}

window.onload = function() {
    document.getElementById("classified-content").style.display = "none";
    setTimeout(typeWriter, 800);
};

// --- TAB SYSTEM LOGIC ---
function openTab(evt, tabName) {
    // Hide all tab content
    const tabContent = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContent.length; i++) {
        tabContent[i].classList.remove("active-tab");
    }

    // Remove active class from all buttons
    const tabBtns = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < tabBtns.length; i++) {
        tabBtns[i].classList.remove("active");
    }

    // Show the current tab and add an "active" class to the button that opened the tab
    document.getElementById(tabName).classList.add("active-tab");
    evt.currentTarget.classList.add("active");
}

// --- AUDIO SYSTEM ---
const player = document.createElement("audio");
let activeBtn = null;

function playAudio(fileUrl, btn) {
    if (!player.paused && activeBtn === btn) {
        player.pause();
        btn.innerText = "[ EXECUTE ]";
        return;
    }
    
    if (activeBtn) {
        activeBtn.innerText = "[ EXECUTE ]";
    }
    
    player.src = fileUrl;
    
    player.play().then(() => {
        btn.innerText = "[ STOP ]";
        activeBtn = btn;
    }).catch(error => {
        alert(`System: You need an audio file named "${fileUrl}" in your directory to play this.`);
    });
    
    player.onended = function() {
        btn.innerText = "[ EXECUTE ]";
    };
}
