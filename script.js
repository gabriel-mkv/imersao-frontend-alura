// Seleciona os elementos HTML que serão manipulados
const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById('result-artist'); 
const resultPlaylist = document.getElementById('result-playlists');
const noResults = document.getElementById('no-results');

// Função para fazer a requisição à API de artistas
function requestApi(searchTerm) {
    // Monta a URL da API com o termo de busca
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`;

    fetch(url)
        .then((response) => response.json()) // Converte a resposta para JSON
        .then((result) => displayResults(result, searchTerm)); // Chama a função para exibir os resultados
}

// Função para exibir os resultados na tela
function displayResults(result, searchTerm) {
    resultPlaylist.classList.add('hidden'); // Oculta a seção de playlists
    const gridContainer = document.querySelector('.grid-container'); // Seleciona o container dos cards de artistas
    gridContainer.innerHTML = ''; // Limpa o conteúdo do container para não duplicar os resultados

    // Filtra os artistas com base no termo de busca, ignorando case e espaços em branco
    const filteredArtists = result.filter(artist => artist.name.toLowerCase().includes(searchTerm.trim()));

    // Se não houver artistas filtrados, exibe a mensagem de "nenhum resultado" e oculta a seção de artistas
    if (filteredArtists.length === 0) {
        resultArtist.classList.add('hidden');
        noResults.classList.remove('hidden');
    } else {
    // Caso haja resultados, oculta a mensagem de nenhum resultado e itera sobre os artistas filtrados
    noResults.classList.add('hidden');
    filteredArtists.forEach(artist => {
        // Cria um elemento div para o card do artista
        const artistCard = document.createElement('div');
        artistCard.classList.add('artist-card');

        // Insere o HTML do card com as informações do artista
        artistCard.innerHTML = `
            <div class="card-img">
                <img class="artist-img" src="${artist.urlImg}" />
                <div class="play">
                    <span class="fa fa-solid fa-play"></span>
                </div>
            </div>
            <div class="card-text">
                <span class="artist-name">${artist.name}</span>
                <span class="artist-categorie">Artista</span>
            </div>
        `;

        // Adiciona o card do artista ao container
        gridContainer.appendChild(artistCard);
    });

    // Exibe a seção de artistas após processar todos os resultados
    resultArtist.classList.remove('hidden');
    }
}

// Adiciona um listener para o evento 'input' no campo de busca
document.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase().trim(); // Pega o valor do input, converte para minúsculas e remove espaços em branco

    // Se o campo de busca estiver vazio, oculta a playlist e exibe os cards de artistas
    if (searchTerm === '') {
        resultPlaylist.classList.add('hidden');
        resultArtist.classList.remove('hidden');
        return;
    }

    // Caso contrário, faz a requisição à API com o termo de busca
    requestApi(searchTerm);
})

// Adiciona um listener para o evento 'blur' no campo de busca
searchInput.addEventListener('blur', function () {
    // Se o campo de busca estiver vazio quando perder o foco
    if (searchInput.value === '') {
        noResults.classList.add('hidden'); // Oculta a mensagem de "nenhum resultado"
        resultArtist.classList.add('hidden'); // Oculta os cards de artistas
        resultPlaylist.classList.remove('hidden'); // Exibe a seção de playlists
        return;
    }
})