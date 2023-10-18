const slide = [
  {
    image: "slide1.jpg",
    tagLine: "Impressions tous formats <span>en boutique et en ligne</span>",
  },
  {
    image: "slide2.jpg",
    tagLine:
      "Tirages haute définition grand format <span>pour vos bureaux et events</span>",
  },
  {
    image: "slide3.jpg",
    tagLine: "Grand choix de couleurs <span>de CMJN aux pantones</span>",
  },
  {
    image: "slide4.png",
    tagLine: "Autocollants <span>avec découpe laser sur mesure</span>",
  },
];
/*initialisation position*/
/* initialisalisation de la variable position à 0, utilisée pour suivre l'index actuel de l'image affichée dans le slider. */
let position = 0;
/*  fonction qui vérifie la position actuelle par rapport à la longueur du tableau slide. Si position est supérieure ou égale à la longueur du tableau slide, position est réinitialisée à 0. Si position est inférieure à 0, position est réinitialisée à l'index de la dernière image dans le tableau slide. */
function verifieposition() {
  let position = 0;
  /*  Si position est supérieure ou égale à la longueur du tableau slide, position est réinitialisée à 0. */
  if (position >= slide.length) {
    position = 0;
    /*  Si position est inférieure à 0, position est réinitialisée à l'index de la dernière image dans le tableau slide. */
  } else if (position < 0) {
    position = slide.length - 1;
  }
}
/*création dots*/
/* sélectionne l'élément HTML avec la classe "dots" et le stock dans la variable bullet. Cet élément est l'endroit où les points (dots) du slider seront ajoutés dynamiquement. */
const bullet = document.querySelector(".dots");
/* Cette boucle for parcourt le tableau slide et crée un élément div pour chaque élément dans slide. Ces divs sont les points (dots) du slider. Chaque point est ajouté à l'élément avec la classe "dots". */
for (let i = 0; i < slide.length; i++) {
  const point = document.createElement("div");
  bullet.appendChild(point);
  point.classList.add("dot");
}
/*séléction du points en fonction du slider*/
/* Cette ligne appelle la fonction positionbullet() (que nous allons examiner dans un instant) pour sélectionner le point correspondant à la position actuelle, et le stock dans la variable bulletselect. Ce point est initialisé avec la classe "dot_selected". */
let bulletselect = positionbullet();
bulletselect.classList.add("dot_selected");
/*  Cette fonction utilise la syntaxe des templates de chaînes (encadrée par les backticks ``) pour sélectionner le point (dot) correspondant à la position actuelle. Il utilise l'index position pour sélectionner le point et le retourne. */
function positionbullet() {
  return document.querySelector(`.dots .dot:nth-child(${position + 1})`);
}
/*changement du point lors du slide*/
/*  Cette fonction est responsable du changement de classe des points. Elle supprime d'abord la classe "dot_selected" du point actuellement sélectionné (bulletselect), puis appelle positionbullet() pour obtenir le nouveau point à sélectionner, et ajoute la classe "dot_selected" à ce nouveau point. */
function changebullet() {
  bulletselect.classList.remove("dot_selected");
  bulletselect = positionbullet();
  bulletselect.classList.add("dot_selected");
}

/*affichage de l'image et de la tagline*/
/*  Cette fonction met à jour l'image et la tagline du slider en utilisant la valeur actuelle de position. Elle sélectionne l'élément avec la classe "banner-img" pour mettre à jour l'attribut src de l'image, et l'élément p à l'intérieur de l'élément avec l'ID "banner" pour mettre à jour le texte de la tagline. */
function imageTagline() {
  document.querySelector(".banner-img").src =
    "./assets/images/slideshow/" + slide[position].image;
  document.querySelector("#banner p").innerHTML = slide[position].tagLine;
}
/*  Ces lignes de code sélectionnent les éléments HTML avec les IDs "left" et "right" et ajoutent des écouteurs d'événements pour détecter les clics sur ces éléments. Lorsque l'utilisateur clique sur l'une de ces flèches, la fonction changementSlide() est appelée avec un argument indiquant la direction du changement de slide (vers la gauche ou vers la droite). */
const left = document.getElementById("left");

left.addEventListener("click", function () {
  changementSlide(-1);
});

const right = document.getElementById("right");

right.addEventListener("click", function () {
  changementSlide(+1);
});

/*changement de slide*/
/*  Cette fonction est responsable du changement de slide en fonction de la direction spécifiée. Elle met à jour la variable position en fonction de la direction et appelle ensuite verifieposition(), imageTagline(), et changebullet() pour mettre à jour le slider en conséquence. */
// function changementSlide(direction) {
//   position += direction;
//   verifieposition();
//   imageTagline();
//   changebullet();

//     // Vérifie si nous sommes sur la dernière slide et que la direction est positive (vers la droite)
//     if (position === slide.length - 1 && direction === 1) {
//       // Si oui, revenir à la première slide
//       position = 0;
//       imageTagline();
//       changebullet();
//     }
// }

function changementSlide(direction) {
  // Sauvegarde de l'ancienne position
  let oldPosition = position;

  // Mise à jour de la position en fonction de la direction
  position += direction;

  // Vérifie si nous sommes sur la dernière slide et que la direction est positive (vers la droite)
  if (position >= slide.length) {
    // Si oui, revenir à la première slide
    position = 0;
  } else if (position < 0) {
    // Si la position est négative, passer à la dernière slide
    position = slide.length - 1;
  }

  // Vérifie si la position a changé
  if (oldPosition !== position) {
    // Met à jour l'image, la tagline et le point
    imageTagline();
    changebullet();
  }
}