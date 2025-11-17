document.addEventListener('DOMContentLoaded', () => {

    const playIcon = '<i class="fas fa-play"></i>';
    const pauseIcon = '<i class="fas fa-pause"></i>';

    // Seleciona TODOS os players da página
    const players = document.querySelectorAll('.music-player');

    // Itera (passa por) cada player encontrado e o inicializa
    players.forEach(player => {
        
        // Seleciona os elementos INTERNOS de CADA player
        // Usamos .querySelector() a partir do 'player' atual
        const audio = player.querySelector('.audio-player');
        const playPauseBtn = player.querySelector('.play-pause-btn');
        const volumeSlider = player.querySelector('.volume-slider');
        const progressSlider = player.querySelector('.progress-slider');

        // --- Funções de Cor (Específicas para este player) ---
        // Estas funções agora vivem dentro do loop,
        // então elas sabem exatamente a qual slider pertencem.

        function updateProgressBarColor() {
            const value = progressSlider.value;
            progressSlider.style.background = `linear-gradient(to right, #007bff 0%, #007bff ${value}%, #e0e0e0 ${value}%, #e0e0e0 100%)`;
        }

        function updateVolumeBarColor() {
            const value = volumeSlider.value * 100; // Converte para porcentagem
            volumeSlider.style.background = `linear-gradient(to right, #007bff 0%, #007bff ${value}%, #e0e0e0 ${value}%, #e0e0e0 100%)`;
        }
        
        // --- Event Listeners (Específicos para este player) ---

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
            updateVolumeBarColor(); // Atualiza a cor só deste slider
        });

        // 3. Resetar o ícone quando a música terminar
        audio.addEventListener('ended', () => {
            playPauseBtn.innerHTML = playIcon;
            progressSlider.value = 0; 
            updateProgressBarColor(); 
        });

        // 4. Atualizar a barra de progresso enquanto a música toca
        audio.addEventListener('timeupdate', () => {
            // Evita erro se a duração ainda não for conhecida
            if (audio.duration) {
                const progressPercent = (audio.currentTime / audio.duration) * 100;
                progressSlider.value = progressPercent;
                updateProgressBarColor(); 
            }
        });

        // 5. Permite ao usuário arrastar a barra de progresso
        progressSlider.addEventListener('input', () => {
             // Evita erro se a duração ainda não for conhecida
            if(audio.duration) {
                const time = (progressSlider.value / 100) * audio.duration;
                audio.currentTime = time;
            }
        });

        // 6. Define as cores iniciais (para este player)
        updateProgressBarColor();
        updateVolumeBarColor();
    });

});