const canvas = document.getElementById("myCanvas")
const ctx = canvas.getContext("2d")

const balle_taille = 10

var balle_position_x = canvas.width/2
var balle_position_y = canvas.height/2

var balle_vitesse_x
var balle_vitesse_y

const raquette_taille_x = 10
const raquette_taille_y = 50
const raquette_vitesse = 15

const raquette_1_position_x = 30
var raquette_1_position_y = 200

const raquette_2_position_x = canvas.width - raquette_1_position_x
var raquette_2_position_y = 200

var touche_w_enfoncee = false
var touche_s_enfoncee = false
var touche_i_enfoncee = false
var touche_k_enfoncee = false

nouvelle_partie()

setInterval(boucle_principale, 33)

// Cette fonction est appelée 30 fois par seconde, et notre jeu bouge a chaque fois qu'elle est appelée
function boucle_principale(){
  deplacer_raquettes() // Cette fonction sert à calculer ou seront les deux raquettes la prochaine image
  deplacer_balle() // Cette fonction sert à calculer ou sera la balle la prochaine image

  // La suite de la boucle principale sert a dessiner sur l'écran.
  effacer_canvas()
  dessiner_raquettes()
  dessiner_balle()
}

function effacer_canvas(){
  ctx.reset()
}

function deplacer_raquettes(){
  // On déplace la raquette du joueur s'il appuie sur une touche
  if (touche_w_enfoncee) raquette_1_position_y -= raquette_vitesse
  if (touche_s_enfoncee) raquette_1_position_y += raquette_vitesse

  if (touche_i_enfoncee) raquette_2_position_y -= raquette_vitesse
  if (touche_k_enfoncee) raquette_2_position_y += raquette_vitesse
  // On verifie que la palette ne dépace pas de l'écran
  raquette_1_position_y = Math.min(raquette_1_position_y, canvas.height - raquette_taille_y/2)
  raquette_1_position_y = Math.max(0 + raquette_taille_y/2 ,raquette_1_position_y)
  
  raquette_2_position_y = Math.min(raquette_2_position_y, canvas.height - raquette_taille_y/2)
  raquette_2_position_y = Math.max(0 + raquette_taille_y/2 ,raquette_2_position_y)
}
function deplacer_balle(){
  // on teste si la balle va toucher un objet
  if (collisions_murs()) {rebondir_mur()}
  if (collisions_raquette_1()) {rebondir_raquette_1()}
  if (collisions_raquette_2()) {rebondir_raquette_2()}
  if (collisions_buts()) {nouvelle_partie()}

  // on deplace la balle
  balle_position_x += balle_vitesse_x
  balle_position_y += balle_vitesse_y
}

function collisions_murs(){
  if (balle_position_y + balle_vitesse_y < 0){ return true }
  if (balle_position_y + balle_vitesse_y > canvas.height){ return true }
  return false
  }
function rebondir_mur(){
  balle_vitesse_y = -balle_vitesse_y
}

function collisions_raquette_1(){
  if (Math.abs(balle_position_x - raquette_1_position_x) < raquette_taille_x/2){
    if (Math.abs(balle_position_y - raquette_1_position_y) < raquette_taille_y/2){
      return true
    }
  }
  return false
}

function rebondir_raquette_1(){
  balle_vitesse_x = Math.abs(balle_vitesse_x)
}

function collisions_raquette_2(){
  if (Math.abs(balle_position_x - raquette_2_position_x) < raquette_taille_x/2){
      if (Math.abs(balle_position_y - raquette_2_position_y) < raquette_taille_y/2){
      return true
    }
  }
  return false
}

function rebondir_raquette_2(){
  balle_vitesse_x = -Math.abs(balle_vitesse_x)
}

function collisions_buts(){
  if (balle_position_x < 0){ 
    return true
  }
  if (balle_position_x > canvas.width){
    return true
  }
  return false
}

function nouvelle_partie(){
  balle_position_x = canvas.width/2
  balle_position_y = canvas.height/2
  balle_vitesse_x = 7 * Math.sign(Math.random() - 0.5)
  balle_vitesse_y = Math.sign(Math.random()-0.5) * ((Math.random())*3 + 5)
}

function dessiner_raquettes(){
  ctx.fillRect(
      raquette_1_position_x-raquette_taille_x/2,
      raquette_1_position_y-raquette_taille_y/2,
      raquette_taille_x,
      raquette_taille_y
    )
  ctx.fillRect(
      raquette_2_position_x-raquette_taille_x/2,
      raquette_2_position_y-raquette_taille_y/2,
      raquette_taille_x,
      raquette_taille_y
    )
}

function dessiner_balle(){
  ctx.fillRect(
    balle_position_x-balle_taille/2,
    balle_position_y-balle_taille/2,
    balle_taille,
    balle_taille
  )
}



addEventListener("keydown", (e) => touche_pressee(e))
addEventListener("keyup", (e) => touche_relachee(e))
function touche_pressee(e){
  if (e.key == 'w') {touche_w_enfoncee = true}
  if (e.key == 's') {touche_s_enfoncee = true}
  if (e.key == 'i') {touche_i_enfoncee = true}
  if (e.key == 'k') {touche_k_enfoncee = true}
}
function touche_relachee(e){
  if (e.key == 'w') {touche_w_enfoncee = false}
  if (e.key == 's') {touche_s_enfoncee = false}
  if (e.key == 'i') {touche_i_enfoncee = false}
  if (e.key == 'k') {touche_k_enfoncee = false}
}
