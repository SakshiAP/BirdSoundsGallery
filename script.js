document.addEventListener("DOMContentLoaded", () => {
    const birds = [
        { name: 'cock', image: 'Images/cock.png', audio: 'Audio/cock.mp3' },
        { name: 'parrot', image: 'Images/parrot.png', audio: 'Audio/parrot.mp3' },
        { name: 'sparrow', image: 'Images/sparrow.png', audio: 'Audio/sparrow.mp3' },
        { name: 'pigeon', image: 'Images/pigeon.png', audio: 'Audio/pigeon.mp3' },
        { name: 'peacock', image: 'Images/peacock.png', audio: 'Audio/peacock.mp3' },
        { name: 'duck', image: 'Images/duck.png', audio: 'Audio/duck.mp3' },
        { name: 'crow', image: 'Images/crow.png', audio: 'Audio/crow.mp3' }
    ];

    const birdsContainer = document.getElementById('birds-container');
    birdsContainer.innerHTML = ''; // Clear previous birds if any

    birds.sort(() => Math.random() - 0.5); // Randomize birds array

    const placedBirds = [];
    let currentAudio = null;

    const isOverlapping = (top1, left1, width1, top2, left2, width2) => {
        return !(left1 + width1 < left2 || 
                 left2 + width2 < left1 || 
                 top1 + width1 < top2 || 
                 top2 + width2 < top1);
    };

    birds.forEach(bird => {
        const birdElement = document.createElement('img');
        birdElement.src = bird.image;
        birdElement.classList.add('bird');
        birdElement.style.width = '10%';
        
        const birdWidth = 10;

        let top, left;
        let overlapping;
        do {
            overlapping = false;
            top = Math.random() * 80 + 10;
            left = Math.random() * 80 + 10;

            for (const placedBird of placedBirds) {
                if (isOverlapping(top, left, birdWidth, placedBird.top, placedBird.left, birdWidth)) {
                    overlapping = true;
                    break;
                }
            }
        } while (overlapping);

        birdElement.style.top = `${top}%`;
        birdElement.style.left = `${left}%`;
        placedBirds.push({ top, left });

        birdElement.addEventListener('click', () => {
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }
            currentAudio = new Audio(bird.audio);
            currentAudio.play();
        });

        birdsContainer.appendChild(birdElement);
    });
});
