// Seleciona os elementos da página
const audio = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause-btn');
const playIcon = '<i class="fas fa-play"></i>';
const pauseIcon = '<i class="fas fa-pause"></i>';
const volumeSlider = document.getElementById('volume-slider');
const progressSlider = document.getElementById('progress-slider');

// 1. Função de Play/Pause
playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.innerHTML = pauseIcon; // Muda o ícone para Pause
    } else {
        audio.pause();
        playPauseBtn.innerHTML = playIcon; // Muda o ícone para Play
    }
});

// 2. Função do Controle de Volume
volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
});

// 3. Opcional: Resetar o ícone quando a música terminar
audio.addEventListener('ended', () => {
    playPauseBtn.innerHTML = playIcon;
    progressSlider.value = 0; // Reseta a barra de progresso
    updateProgressBarColor(); // Atualiza a cor
});

// 4. Atualizar a barra de progresso enquanto a música toca
audio.addEventListener('timeupdate', () => {
    // Calcula a porcentagem do progresso
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressSlider.value = progressPercent;
    updateProgressBarColor(); // Atualiza a cor da barra
});

// 5. Permite ao usuário arrastar a barra de progresso para pular na música
progressSlider.addEventListener('input', () => {
    const time = (progressSlider.value / 100) * audio.duration;
    audio.currentTime = time;
});

// 6. Função para atualizar a cor da barra de progresso (visual)
function updateProgressBarColor() {
    const value = progressSlider.value;
    // O gradiente mostra a parte "cheia" da barra em azul
    progressSlider.style.background = `linear-gradient(to right, #007bff 0%, #007bff ${value}%, #e0e0e0 ${value}%, #e0e0e0 100%)`;
}

// 7. Função para atualizar a cor da barra de volume (visual)
function updateVolumeBarColor() {
    const value = volumeSlider.value * 100; // Converte para porcentagem
    volumeSlider.style.background = `linear-gradient(to right, #007bff 0%, #007bff ${value}%, #e0e0e0 ${value}%, #e0e0e0 100%)`;
}

// Chamar as funções de atualização de cor na inicialização e sempre que os sliders mudarem
document.addEventListener('DOMContentLoaded', () => {
    updateProgressBarColor(); // Define a cor inicial da barra de progresso
    updateVolumeBarColor();   // Define a cor inicial da barra de volume
});

volumeSlider.addEventListener('input', updateVolumeBarColor);