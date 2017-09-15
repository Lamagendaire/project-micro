var lameplace = false;
var optique = '#bleu';
var position = [3,3]; //position initiale de la lame
var positionmutli = 1;
var blur =0;
var cont = '100%'; //contraste initiale [0-200]
var light =100; //lumière initiale [0-200]
var VisualPoint;
var rouge = [21.5,2]
var jaune = [20,5];
var bleu = [0,45];
var optiqueChoisie = [0,0];
var modeValeur = true;

function maj_zone_affichage(resultat){
  zone_affichage.value=resultat;
}

function changeOptique_old(elem){
  if (optique!=elem) {
    var newOptique = document.getElementById(elem);
    var zoomVal;
    document.getElementById(optique).style.top = '-'+200+'%';
	document.getElementById(optique).style.left = -50+'%';
    newOptique.style.top = 0;
	newOptique.style.left =0;
    optique = elem;
    var img = document.getElementById('micro');
    switch (optique) {
      case 'rouge':
        optiqueChoisie = rouge;
        positionmutli = 1;
        VisualPoint = -4;
        zoomVal = '4x';
        break;
      case 'jaune':
        optiqueChoisie = jaune;
        positionmutli = 2.5;
        VisualPoint = 2;
        zoomVal = '10x';
        break;
      case 'bleu':
          optiqueChoisie = bleu;
          positionmutli = 10;
          VisualPoint = 7;
          zoomVal = '40x';
          break;
      default:
        alert('erreur d\'optique');
    }
    var zoom = document.getElementById('zoom');
    document.getElementById('optique').style.background = 'rgb(0, 0, 0)';
    zoom.style.filter = 'opacity(0%)';
    window.setTimeout(function(){updateBlur();}, 300);
    window.setTimeout(function(){
      zoom.innerHTML = zoomVal;
      document.getElementById('optique').style.background = 'rgba(0, 0, 0, 0)';
      zoom.style.filter = 'opacity(100%)';
                                  }, 500);

  }
}

//changer l'optique de zoom
function changeOptique(elem){
  elem = '#'+elem;
  if (optique!=elem) {
    var zoomVal;

    //échange des optiques de couleur
    $(optique).css('top','-200%');
	  $(optique).css('left','-50%');
    $(elem).css('top',0);
	  $(elem).css('left',0);
    optique = elem;

    //options selon zoom choisi
    switch (optique) {
      case '#rouge':
        optiqueChoisie = rouge;
        positionmutli = 1;
        VisualPoint = -4;
        zoomVal = '4x';
        break;
      case '#jaune':
        optiqueChoisie = jaune;
        positionmutli = 2.5;
        VisualPoint = 2;
        zoomVal = '10x';
        break;
      case '#bleu':
          optiqueChoisie = bleu;
          positionmutli = 10;
          VisualPoint = 7;
          zoomVal = '40x';
          break;
      default:
        alert('erreur d\'optique');
      }
      $('#optique').css('background-color','rgb(0, 0, 0)');
      $('#zoom').css('filter','opacity(0%)');
      window.setTimeout(function(){updateBlur();}, 350);
      window.setTimeout(function(){
      $('#zoom').html(zoomVal);
      $('#optique').css('background-color','rgba(0, 0, 0, 0)');
      $('#zoom').css('filter','opacity(100%)');
                                    }, 500);

  }
}

//Place / retire la lame
function lame(){
  $('#micro').css("top",lameplace?'200%':'0'); //emplacement de la lame
  $('#lameplace').html(lameplace?' NON':' OUI'); //indication de présence de la lame
  lameplace = !lameplace; //mise à jour du status
}

function changePosition(direction){
  var unit = 3/positionmutli;
  switch (direction) {
    case 'haut':
      position[1]+=unit;
      break;
    case 'bas':
      position[1]-=unit;
      break;
    case 'droite':
      position[0]+=unit;
      break;
    case 'gauche':
      position[0]-=unit;
      break;
    default:
      alert('erreur de direction');
  }
  updateImg();
}
function afficheObjectifs(){
	var obj = document.getElementById('objectifs');
	if(obj.style.right == '-100%'){
		obj.style.right = '10px';
	}else{
		obj.style.right = '-100%';
	}
}

function afficheValeur(){
	var mode ='error';
	if (modeValeur){
		mode='none';
		modeValeur =false;
	}else{
		mode='inline';
		modeValeur = true;
	}

  //indication des réglages
	var inputs = document.getElementsByTagName('input');
	for(var i = 0; i < inputs.length; i++) {
		if(inputs[i].type.toLowerCase() == 'number') {
			inputs[i].style.display = mode;
		}
	}

  //indication de l'objectif (couleur)
  inputs = document.getElementsByClassName('couleur');
  for(var i = 0; i < inputs.length; i++) {
			inputs[i].style.display = mode;
	}

  document.getElementById('zoom').style.display = mode;



	document.getElementById('ligne_affichage').style.display = mode;
}


function updateBlur(){
  blur =(document.getElementById('Bigrangevalue').value*5+document.getElementById('Smallrangevalue').value*1)+VisualPoint;
  maj_zone_affichage(blur);
  updateImg();
}

function updateContrast(){
  cont = document.getElementById('Contrangevalue').value+'%';
  updateImg();
}

function updateLight(){
 light = document.getElementById('Lightrangevalue').value;
 updateImg();
}

function updateImg(){
  var img=document.getElementById('micro');
  img.style.margin = optiqueChoisie[0]+'%';
  img.style.marginLeft = String(optiqueChoisie[0]+position[0]*positionmutli)+'%';
  img.style.marginTop = String(optiqueChoisie[0]-position[1]*positionmutli)+'%';
  img.style.width = optiqueChoisie[1]+'%';
  img.style.filter = ("blur("+Math.abs(blur)+"px) contrast("+cont+") brightness("+light*2/positionmutli+"%)");
  var backCol = (light*2)/positionmutli;
  document.getElementsByTagName('BODY')[0].style.background = "rgb("+backCol+"%, "+backCol+"%, "+backCol+"%)";
}

function showBigValue(newValue)
{
	document.getElementById("Bigrange").value=newValue;
  updateBlur();
}

function setBigValue(newValue){
  document.getElementById('Bigrangevalue').value = newValue;
  updateBlur();
}
function showSmallValue(newValue)
{
	document.getElementById("Smallrange").value=newValue;
  updateBlur();
}
function setSmallValue(newValue){
  document.getElementById('Smallrangevalue').value = newValue;
  updateBlur();
}

function showContValue(newValue)
{
	document.getElementById("Contrange").value=newValue;
  updateContrast();
}
function setContValue(newValue){
  document.getElementById('Contrangevalue').value = newValue;
  updateContrast();
}

function showLightValue(newValue)
{
	document.getElementById("Lightrange").value=newValue;
  updateLight();
}
function setLightValue(newValue){
  document.getElementById('Lightrangevalue').value = newValue;
  updateLight();
}

// INITIALISATION================================================================

function init(){
  $("#lame").draggable({containment:'parent'});
  changeOptique('rouge');
  //affichage valeur slide bar
  var inp = document.getElementById('Bigrangevalue');
  var inpnum = document.getElementById('Bigrange');
  inpnum.value = inp.value;
  inpnum.setAttribute('min','0');

  inp.addEventListener("mousemove", function () {
      inpnum.value = this.value;
      updateBlur();
  });

  inpnum.addEventListener("oninput", function () {
      inp.value = this.value;
      updateBlur();
  });


var inpS = document.getElementById('Smallrangevalue');
var inpnumS = document.getElementById('Smallrange');
inpnumS.value = inpS.value;

inpS.addEventListener("mousemove", function () {
    inpnumS.value = this.value;
    updateBlur();
});

inpnumS.addEventListener("oninput", function () {
    inpS.value = this.value;
    updateBlur();
});


var inpC = document.getElementById('Contrangevalue');
var inpnumC = document.getElementById('Contrange');
inpnumC.value = inpC.value;

inpC.addEventListener("mousemove", function () {
    inpnumC.value = this.value;
    updateContrast();
});

inpnumC.addEventListener("oninput", function () {
    inpC.value = this.value;
    updateContrast();
});

var inpL = document.getElementById('Lightrangevalue');
var inpnumL = document.getElementById('Lightrange');
inpnumL.value = inpL.value;

inpL.addEventListener("mousemove", function () {
    inpnumL.value = this.value;
    updateLight();
});

inpnumL.addEventListener("oninput", function () {
    inpL.value = this.value;
    updateLight();
});
updateLight();
updateBlur();
updateContrast();

}











//old---------------------------------------------

function rab(){
  var zone_affichage = document.getElementById("zone_affichage");
  zone_affichage.value="";
}


function ajax_get_request(callback,url,async,data){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if((xhr.readyState==4) && (xhr.status == 200)){
        callback(xhr.responseText);
    }
  };

  xhr.open("GET",url+"?data="+data,async);
  xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

  xhr.send();
}

function ajax_post_request(url,async,data){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if((xhr.readyState==4) && (xhr.status == 200)){
      alert("La calculatrice a été save");
    }
  };

  xhr.open("POST",url,async);
  xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  xhr.send("data="+data);
}



function toJson(){
  resultJson="{\"fonctions\":[";
  boutonLibre= document.getElementsByClassName("bouton_libre");
  console.log(boutonLibre);
  for(var i=0;i<=boutonLibre.length;i++){
    if(i!=boutonLibre.length){
      resultJson=resultJson+"{\"id\":\""+boutonLibre[i].id+"\",\"val\":\""+boutonLibre[i].value+"\"},";
    }else{
        resultJson=resultJson+"{\"id\":\""+boutonLibre[i].id+"\",\"val\":\""+boutonLibre[i].value+"\"}";
    }
  }
  resultJson=resultJson+"],\"memoire\":"+memory+"}";
  return resultJson;

}



function affiche(idSymbole){

  var zone_affichage = document.getElementById("zone_affichage");
  zone_affichage.value= zone_affichage.value+idSymbole.value;

}
