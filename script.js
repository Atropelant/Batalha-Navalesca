const imagens = [
    "bomba.png", 
    "Ship-1.png", 
    "Ship-2.png", 
    "Ship-3.png", 
    "Wave.png"
];

let tab = [];
let coracao = 5;
let pontos = 0;

function tabela() {
    const tabela = document.createElement("table");

    for (let l = 0; l < 10; l++) {
        const linha = document.createElement("tr");
        tab[l] = [];

        for (let c = 0; c < 10; c++) {
            const coluna = document.createElement("td");

            // sorteio
            const indice = Math.floor(Math.random() * imagens.length);
            tab[l][c] = imagens[indice];

            const img = document.createElement("img");

            // imagem padrão (tiro)
            img.src = "Fire-icon.png";
            img.width = 50;
            img.id = l + "-" + c;

            img.onclick = function () {
                atirar(l, c);
            };

            coluna.appendChild(img);
            linha.appendChild(coluna);
        }

        tabela.appendChild(linha);
    }

    document.getElementById("tab").appendChild(tabela);
}

function atirar(linha, coluna) {
    let imagem = document.getElementById(linha + "-" + coluna);

    // evita clicar várias vezes na mesma célula
    if (imagem.dataset.clicado) return;
    imagem.dataset.clicado = true;

    let valor = tab[linha][coluna];

    // mostra a imagem real
    imagem.src = valor;

    if (valor === "bomba.png") {
        coracao--;

        const vida = document.getElementById("vidas");

        if (coracao == 4) {
            vida.innerHTML = "❤️❤️❤️❤️";
        } 
        else if (coracao == 3) {
            vida.innerHTML = "❤️❤️❤️";
        } 
        else if (coracao == 2) {
            vida.innerHTML = "❤️❤️";
        } 
        else if (coracao == 1) {
            vida.innerHTML = "❤️";
        } 
        else if (coracao <= 0) {
            vida.innerHTML = "💀";
            alert("Game Over!");
        }
    }
    else if (valor === "Ship-1.png") {
        pontos += 80;
    }
    else if (valor === "Ship-2.png") {
        pontos += 90;
    }
    else if (valor === "Ship-3.png") {
        pontos += 100;
    }

    document.getElementById("pontuacao").innerHTML = pontos;
}

function tocar() {
    const audio = document.getElementById("musica");

    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

function resetarJogo() {
    tab = [];
    coracao = 5;
    pontos = 0;

    document.getElementById("tab").innerHTML = "";
    document.getElementById("vidas").innerHTML = "❤️❤️❤️❤️❤️";
    document.getElementById("pontuacao").innerHTML = "0";

    tabela();
}

// inicia o jogo
tabela();
