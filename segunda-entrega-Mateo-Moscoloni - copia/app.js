//clases
class Juego {
    constructor(nombre, formato, precio, info){
      this.nombre = nombre;
      this.formato = formato;
      this.precio = precio;
      this.info = info;
    }
}

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const contenedor = document.getElementById('accordion'); //agarro el div contenedor
const items = document.getElementById('items'); 
const windows = document.getElementById('win'); 
const linux = document.getElementById('linux'); 
const macOS = document.getElementById('mac'); 
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'steam-store-data.p.rapidapi.com',
		'X-RapidAPI-Key': 'af22de8d3emshf113f49ae919ba2p1f2483jsna68ce52fcc91'
	}
};


const sAPI = async () => {
  try {
    const resp = await fetch('https://steam-store-data.p.rapidapi.com/api/featured/', options)
    const resjson = await resp.json()
    const linx = await resjson.featured_linux
    const mac = await resjson.featured_mac
    const win = await resjson.featured_win
    await win.forEach(item => crearCarta(item.name, "digital", item.final_price, item.large_capsule_image,windows,item.id, "windows", win ))
    await linx.forEach(item => crearCarta(item.name, "digital", item.final_price, item.large_capsule_image, linux, item.id, "linux", linx))
    await mac.forEach(item => crearCarta(item.name, "digital", item.final_price, item.large_capsule_image, macOS, item.id, "macOS", mac))
 } catch (error) {
    console.log(error)
  }  
}
sAPI()


/// FALTA: PODER REALIZAR EL FOR (COMO HAGO CON EL SCOPE, TENGO DATOS PERO CÓMO LOS SACO? HAGO UN FOR ADENTRO?)

//crear la carta (individual) y crear todas las cartas
function crearCarta(name, type, price, image, contenedorCard, id, os, arr){
  id = id + os  
  let carta = `
    <div class="container-fluid d-flex justify-content-center">
  <div class="row mt-5">
    <div class="col-sm-4">
      <div class="card">
    <img src="${image}" class="card-img-top" width="100%">
    <div class="card-body pt-0 px-0">
      <div class="d-flex flex-row justify-content-between mb-0 px-3">
        <small class="text-muted mt-1">Precio</small>
        <h6>${price}</h6>
      </div>
      <hr class="mt-2 mx-3">
      <div class="d-flex flex-row justify-content-between px-3 pb-4">
        <div class="d-flex flex-column"><span class="text-muted">${name}</span><small class="text-muted">L/100KM&ast;</small></div>
        <div class="d-flex flex-column"><h5 class="mb-0">8.5/7.1</h5><small class="text-muted text-right">(city/Hwy)</small></div>
      </div>
      <div class="d-flex flex-row justify-content-between p-3 mid">
        <div class="d-flex flex-column"><small class="text-muted mb-1">${os}</small><div class="d-flex flex-row"><img src="https://imgur.com/iPtsG7I.png" width="35px" height="25px"><div class="d-flex flex-column ml-1"><small class="ghj">1.4L MultiAir</small><small class="ghj">16V I-4 Turbo</small></div></div></div>
        <div class="d-flex flex-column"><small class="text-muted mb-2">${id}</small><div class="d-flex flex-row"><img src="https://imgur.com/J11mEBq.png"><h6 class="ml-1">135 hp&ast;</h6></div></div>
      </div>
      <div class="mx-3 mt-3 mb-2"><button type="button" class="btn btn-danger btn-block" id="${id}"><small>Añadir al carrito</small></button></div>
    </div>
  </div>
    </div>
  </div>
</div>`;
  contenedorCard.innerHTML+=carta

  const boton = document.getElementById(id)

  boton.addEventListener('click', function(){
    console.log(id)
    addToChart(id, arr, os)
  })
  console.log(boton)
}


function addToChart(id, arr, os) {
  console.log(id)
  let obj = arr.find((producto) => producto.id +os === id)
  console.log(arr)
  console.log(obj)
  carrito.push(obj)
  const jJSON = JSON.stringify(carrito)
  localStorage.setItem('carrito', jJSON)
}



//click para sumar al local storage
/* 
function mostraEnPantalla() {
    let sumar = document.getElementsByClassName("btn");
    console.log(sumar)

    sumar.forEach(item => console.log(item)) */
    /* for (let index = 0; index < sumar.length; index++) {
        let element = sumar[index]
        element.addEventListener("click", addToChart)   
        element.addEventListener('click', () => {//se suma la alerta de confirmación de "añadido al carrito"
            Swal.fire ({
                title:'Juego añadido al carrito',
                icon:'success',
                showConfirmButton: true,
                confirmButtonText: 'Confirmar'
            })
        })
    } */
/* } */

/* function buttonClick(item){
    let element = item
    console.log(element)
    element.addEventListener("click", addToChart)   
    element.addEventListener('click', () => {//se suma la alerta de confirmación de "añadido al carrito"
        Swal.fire ({
            title:'Juego añadido al carrito',
            icon:'success',
            showConfirmButton: true,
            confirmButtonText: 'Confirmar'
        })
    })
} */


