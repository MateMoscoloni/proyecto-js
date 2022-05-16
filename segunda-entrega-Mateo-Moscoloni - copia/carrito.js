let carrito = JSON.parse(localStorage.getItem('carrito'));


const cont_tabla = document.getElementById('tablac');
 

for (let i = 0; i < carrito.length; i++) {
    const element = carrito[i];
    const {nombre, formato, precio} = element
    let carro = `<table class="table">
    <thead><
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
        <th scope="col">Tipo</th>
        <th scope="col">Precio</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>${nombre}</td>
        <td>${formato}</td>
        <td>$${precio * 1.65}</td>
      </tr>
    </tbody>
  </table>`;
   cont_tabla.innerHTML += carro
}
