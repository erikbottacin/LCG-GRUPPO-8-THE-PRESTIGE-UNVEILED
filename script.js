    // ANIMAZIONE TESTO "THE PRESTIGE UNVEILED"
    var textWrapper = document.querySelector('.sottotitolo1');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    
    anime.timeline({loop: false})
      .add({
        targets: '.sottotitolo1 .letter',
        opacity: [0,1],
        easing: "easeInOutQuad",
        duration: 1250,
        delay: (el, i) => 60 * (i+1)
      });
      
      let fatto = true;
      const observer1 = new IntersectionObserver(entries => {
          entries.forEach(entry => {
              const sottotitolo = entry.target.querySelector('.sottotitolo');

              if (entry.isIntersecting && fatto==true) {
                 
                  fatto = false;
                  anime.timeline({loop: false})

//velocità seconda animazione
  .add({
  targets: '.sottotitolo .letter',
  opacity: [0,1],
  easing: "easeInOutQuad",
  duration: 1500,
  delay: (el, i) => 40 * (i+1)
});
              }        
          });
      });

  observer1.observe(document.querySelector('.sottotitolo-wrapper'));

// ANIMAZIONE TESTO "DID YOU WATCH IT CLOSELY?" 
let textWrapper2 = document.querySelector('.sottotitolo');
textWrapper2.innerHTML = textWrapper2.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

// Imposta l'opacità iniziale a 0
textWrapper2.style.opacity = 0;

let animationExecuted = false; // Variabile per verificare se l'animazione è già stata eseguita

let observer2 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !animationExecuted) {
      anime.timeline({ loop: false })
      
      // Imposta l'opacità finale a 1 durante l'animazione
      textWrapper2.style.opacity = 1;
      
      animationExecuted = true; // Imposta la variabile a true per indicare che l'animazione è stata eseguita
    }
  });
}, { threshold: 1 });

observer2.observe(textWrapper2);

//ANIMAZIONE PALLINA E UCCELLO
const movingCircle = document.getElementById('movingCircle');
const Uccello = document.getElementById('Uccello');

function updatePosition() {
  const scrollY = window.scrollY;
  const scrollPercentage = scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  const y = 25000 * scrollPercentage;  // velocità pallina
  const cappelloImg = document.getElementById('cappelloImg');
  const cappelloTop = cappelloImg.offsetTop;
  let opacity;

  if(scrollY< 20000){
  
  if (scrollY < 1000) {
    opacity = 1 - (y + 68) / (cappelloTop); // Calcola l'opacità in base alla coordinata y della pallina e alla posizione superiore dell'immagine del cappello
  } else {
    opacity = 0; // Rendi la pallina completamente invisibile quando raggiunge l'immagine del cappello
  }

  // Muovi la pallina in assoluto senza tener conto dell'SVG
  gsap.to(movingCircle, { duration: 0.5, attr: { cy: y + 68 }, opacity: opacity });

  if (y + 68 >= 1000) {
    movingCircle.style.visibility = 'visible';
  }
}

else {

  if (scrollY < 42200) {
    opacity = 0 ; // Calcola l'opacità in base alla coordinata y della pallina e alla posizione superiore dell'immagine del cappello
  } else if(scrollY < 42570) {
    opacity = ((scrollY-42200)/500); // Rendi la pallina completamente invisibile quando raggiunge l'immagine del cappello
  }
  else {
opacity = 1;

  }
  // Muovi la pallina in assoluto senza tener conto dell'SVG
  gsap.to(Uccello, { duration: 0.5, attr: { cy: y + 68}, opacity: opacity });

  if (y >= 36000) {
    Uccello.style.visibility = 'visible';
  }

}

}

window.onscroll = updatePosition;

//ANIMAZIONE TESTI PARAGRAFI PARTE INIZIALE E FINALE
const paragraphs = document.querySelectorAll(".section__paragraph, .header__text");

document.addEventListener("scroll", function() {
    paragraphs.forEach((paragraph) => {
        if (isInView(paragraph)) {
            paragraph.classList.add("section__paragraph--visible");
        }
    });
});

function isInView(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.bottom > 0 && rect.top < (window.innerHeight - 150 || document.documentElement.clientHeight - 150)
    );
}

//ANIMAZIONE LAMPADINE
document.addEventListener("DOMContentLoaded", function() {
  var lampadinaImg = document.getElementById("lampadinaImg");

  window.addEventListener("scroll", function() {
    var scrollPosition = window.scrollY;

    if (scrollPosition > 2000) {
      lampadinaImg.src = "png/lampadine accese.png";
    } else {
      lampadinaImg.src = "png/lampadine spente.png";
    }
  });
});

//ANIMAZIONE TIMELINE
var img = document.getElementById('image');
var timelineOverlay = document.querySelector('.timeline-overlay');
var actOverlay = document.querySelector('.act-overlay');
var overlayText = document.querySelector('.overlay-text');
var timelineText = document.querySelector('.timeline-text');
var actText = document.querySelector('.act-text');
var movieOrderText = document.querySelector('.movie-order');
var cronoOrderText = document.querySelector('.crono-order');

var totalDuration = 2 * 60 * 60 + 10 * 60; // Tempo totale in secondi

var movieOrderSrc = "png/movieorder.png";
var cronOrderSrc = "png/cronorder.png";
var currentSrc = movieOrderSrc;
var currentText = movieOrderText;

img.addEventListener('mouseenter', function() {
  if (currentSrc === movieOrderSrc) {
    timelineOverlay.style.opacity = 1;
    actOverlay.style.opacity = 0;
  } else if (currentSrc === cronOrderSrc) {
    actOverlay.style.opacity = 1;
    timelineOverlay.style.opacity = 0;
  }
});

img.addEventListener('mouseleave', function() {
  timelineOverlay.style.opacity = 0;
  actOverlay.style.opacity = 0;
});

img.addEventListener('mousemove', function(event) {
  var rect = img.getBoundingClientRect();
  var mouseX = event.clientX - rect.left;
  var positionPercentage = mouseX / rect.width;

  if (currentSrc === movieOrderSrc) {
    var percentage = mouseX / rect.width;
    var currentTime = Math.round(percentage * totalDuration);

    var hours = Math.floor(currentTime / 3600);
    var minutes = Math.floor((currentTime % 3600) / 60);
    var seconds = currentTime % 60;

    timelineText.textContent = pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
  } else if (currentSrc === cronOrderSrc) {
    if (positionPercentage <= 0.45) {
      actOverlay.style.opacity = 1;
      timelineOverlay.style.opacity = 0;
      actText.textContent = "The Pledge";
    } else if (positionPercentage > 0.45 && positionPercentage <= 0.69) {
      actOverlay.style.opacity = 1;
      timelineOverlay.style.opacity = 0;
      actText.textContent = "The Turn";
    } else if (positionPercentage > 0.69 && positionPercentage <= 1.00) {
      actOverlay.style.opacity = 1;
      timelineOverlay.style.opacity = 0;
      actText.textContent = "The Prestige";
    } else {
      actOverlay.style.opacity = 0;
      timelineOverlay.style.opacity = 1;
    }
  }
});

img.addEventListener('click', function() {
  if (currentSrc === movieOrderSrc) {
    img.src = cronOrderSrc;
    currentSrc = cronOrderSrc;
    currentText.style.opacity = 0;
    cronoOrderText.style.opacity = 1;
    currentText = cronoOrderText;
    timelineOverlay.style.opacity = 0;
  } else {
    img.src = movieOrderSrc;
    currentSrc = movieOrderSrc;
    currentText.style.opacity = 0;
    movieOrderText.style.opacity = 1;
    currentText = movieOrderText;
    actOverlay.style.opacity = 0;
  }

  timelineText.textContent = "00:00:00";

  if (currentSrc === movieOrderSrc) {
    timelineOverlay.style.opacity = 1;
  } else if (currentSrc === cronOrderSrc) {
    actOverlay.style.opacity = 1;
  }
});

function pad(num) {
  return num < 10 ? '0' + num : num;
}

//HOVER LINEE
document.addEventListener('DOMContentLoaded', function () {
  const svgPaths = document.querySelectorAll('.svg-path');
  const hoverRectangles = document.querySelectorAll('.hover-rectangle');

  svgPaths.forEach((path, index) => {
      path.addEventListener('mouseenter', (event) => {
        const { clientX, clientY } = event;
        hoverRectangles[index].style.display = 'block';
        hoverRectangles[index].style.left = `${clientX}px`;
        hoverRectangles[index].style.top = `${clientY}px`; 
      });

      path.addEventListener('mouseleave', () => {
          hoverRectangles[index].style.display = 'none';
      });
  });
});

//ANIMAZIONE CLUE COUNTER
document.addEventListener('DOMContentLoaded', function () {
  hideClueCounter();
});

let previousScrollY;
let currentScrollY;
let direction;

let points = [
  { id: 0, top: 6200, visited: false, explanation: "Alfred doesn't know which knot he tied because it was his twin Freddie." },
  { id: 1, top: 8000,  visited: false, explanation: "Freddie doesn't love Sarah; it's his twin Alfred who loves her." },
  { id: 2, top: 14650,  visited: false, explanation: "Olivia tells Angier the trick involves the use of a double." },
  { id: 3, top: 15750,  visited: false, explanation: "Angier asks how the trick was made again, and Cutter replies." },
  { id: 4, top: 16600, visited: false, explanation: "Sarah was actually talking to Freddie when he said 'no'."},
  { id: 5, top: 18300, visited: false, explanation: "Alfred himself tells Root that he uses a double in his trick." },
  { id: 6, top: 25200,  visited: false, explanation: "Sarah's talking to Freddie and not Alfred, his real lover." },
  { id: 7, top: 27800,  visited: false, explanation: "In this scene, it's truly Alfred, and therefore the love is authentic." },
  { id: 8, top: 28600,  visited: false, explanation: "Alfred asks his twin to assure Sarah that he loves her." },
  { id: 9, top: 29300, bottom: 30000, visited: false, explanation: "Sarah talks to Freddie, who doesn't love her, but she is unaware of it." },
];

let pointCounter = 0;

let clueCounterVisible = false; // Variabile per gestire la visibilità del clue counter

function onScroll() {
  const scrollTop = window.scrollY;
  const explainCounterElement = document.getElementById('explainCounter');
  const fineCounter = 30000; //quando deve sparire il clue counter

  if (currentScrollY === scrollTop) return;

  previousScrollY = currentScrollY;
  currentScrollY = scrollTop;

  if (!clueCounterVisible && (currentScrollY >= points[0].top)) {
    showClueCounter();
  }

  if (currentScrollY > previousScrollY) {
    direction = "down";
    checkPoints();
    if((currentScrollY >= points[0].top) && (currentScrollY < points[9].bottom)){
      explainCounterElement.classList.add('show');
    }
    else {
      explainCounterElement.classList.remove('show'); 
    }
  } else if (currentScrollY < previousScrollY) {
    direction = "up";
    if ((currentScrollY < points[0].top) || (currentScrollY >= 30000)) {
      explainCounterElement.classList.remove('show');
      hideClueCounter(); // Nasconde il clue counter se torni indietro prima del punto 1
       // Nasconde l'explain counter se torni indietro
    } else {
      explainCounterElement.classList.add('show');
      removePoints();
       // Nasconde l'explain counter se torni indietro
    }
  }

  if (currentScrollY >= fineCounter) {
    hideClueCounter();
  }

}

function showClueCounter() {
  const counterElement = document.getElementById('clueCounter');
  const lenteElement = document.getElementById('lente');

  if (counterElement && lenteElement) {
    counterElement.style.display = 'block';
    lenteElement.style.display = 'block';
    clueCounterVisible = true;
  }
}

function hideClueCounter() {
  const counterElement = document.getElementById('clueCounter');
  const lenteElement = document.getElementById('lente');

  if (counterElement && lenteElement) {
    counterElement.style.display = 'none';
    lenteElement.style.display = 'none';
    clueCounterVisible = false;
  }
}

function checkPoints() {
  points.forEach(point => {
    if (!point.visited && (point.top <= currentScrollY)) {
      console.log(`Point ${point.id} reached!`);
      point.visited = true;
      pointCounter++; // Incrementa il contatore
      updateCounter(); // Aggiorna la visualizzazione del contatore
    }
  });
}

function removePoints() {
  points.slice().reverse().forEach(point => {
    if (point.visited && point.top > currentScrollY) {
      console.log(`Point ${point.id} removed!`);
      point.visited = false;
      pointCounter--; // Decrementa il contatore
      updateCounter(); // Aggiorna la visualizzazione del contatore
    }
  });
}

function updateCounter() {
  const counterElement = document.getElementById('clueCounter');
  const explainCounterElement = document.getElementById('explainCounter');

  if (counterElement && explainCounterElement) {
    counterElement.textContent = pointCounter.toString();

    // Aggiorna il testo di #explainCounter quando un punto viene raggiunto
    points.forEach(point => {
      if (point.visited) {
        explainCounterElement.textContent = point.explanation;
      }
    });

    counterElement.addEventListener('mouseover', function () {
      explainCounterElement.textContent = "Clue counter: highlights the clues provided throughout the movie.";
      explainCounterElement.classList.add('show');
    });

    // Nasconde #explainCounter quando il puntatore esce da #clueCounter
    counterElement.addEventListener('mouseout', function () {
      explainCounterElement.classList.remove('show');
    });

    // Verifica se almeno un punto è stato raggiunto e mostra l'explainCounter
    if (currentScrollY >= points[0].top) {
      explainCounterElement.classList.add('show');
    } 
    else if (currentScrollY < points[0].top) {
      explainCounterElement.classList.remove('show');
    } 
    else if (currentScrollY <= points[9].bottom) {
      explainCounterElement.classList.add('show');
    } 
    else if (currentScrollY > points[9].bottom) {
      explainCounterElement.classList.add('show');
    } 
    // Verifica se un nuovo punto è stato raggiunto
    if (pointCounter > 0 && points[pointCounter - 1].visited) {
      // Mostra l'explainCounter quando un nuovo punto viene raggiunto
      explainCounterElement.classList.add('show');

    
    }
  }
}

function setupScroll() {
  previousScrollY = 0;
  currentScrollY = 0;
  direction = "up";
  document.addEventListener("scroll", onScroll);
}

setupScroll();

document.addEventListener("DOMContentLoaded", function () {
  var bounceContainer = document.getElementById("bounce-container");
  var bounceElement = document.querySelector(".bounce");

  window.addEventListener("scroll", function () {
      var scrollPosition = window.scrollY;

      // Adjust the threshold value based on when you want the animation to start
      var threshold = 500;

      if (scrollPosition > threshold) {
          bounceElement.classList.add("animate");
      } else {
          bounceElement.classList.remove("animate");
      }
  });
});