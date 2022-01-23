const searchBarTab = () => {
    const searchInput = document.getElementById('search-input').value;
    getSongInfo(searchInput);
}
// song information call
const getSongInfo = async (searchInput) => {
    try {
        const url = `https://api.lyrics.ovh/suggest/${searchInput}`
        const res = await fetch(url);
        const data = await res.json();
        createDivAndElement(data.data);
    } catch (error) {
        console.log(error);
    }
}
// Song information display div
const createDivAndElement = (songs) => {
    const containerDiv = document.getElementById('container-div');
    containerDiv.innerText = "";
    // Clear lyrics
    const postLyric = document.getElementById('post-lyric');
    postLyric.innerText = "";
    console.log(songs);

    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = "single-result row align-items-center my-3 p-3";
        const songInfo = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/ogg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyrics('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `;
        songDiv.innerHTML = songInfo;
        containerDiv.appendChild(songDiv);
    });
}
// Get Lyrics
const getLyrics = async (artist, title) => {
    try {
        const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
        const res = await fetch(url);
        const data = await res.json();
        lyricDiv(data.lyrics);
    } catch (error) {
        console.log(error);
    }
    
}
// Get lyric create Div
const lyricDiv = (lyric) => {
    const postLyric = document.getElementById('post-lyric');
    postLyric.innerText = "";
    postLyric.innerText = lyric;
    console.log(lyric);
}

// // https://api.lyrics.ovh/v1/Love/Everybody's Gotta Live
// https://api.lyrics.ovh/v1/:artist/:title