const contenedorProductos = document.getElementById('contenedor-productos')
const contenedorCarrito = document.getElementById('carritoContenedor')
const carritoContador = document.getElementById('contador')
const vaciarCarrito = document.getElementById('vaciarCarro')
const FinalizarCompra = document.getElementById('FinalizarCompra')


let carrito = []

const stockProductos = [
   {
      id:1,
      nombre:'Auriculares',
      precio: 1300,
      cantidad: 1,
      modelo:'Sony',
      img:'./img/Audifonos.jpg'
   },
   {
      id:2,
      nombre:'Mouse',
      precio: 700,
      cantidad: 1,
      modelo:'Vega',
      img:'./img/Mouse.jpg'
   },
   {
      id:3,
      nombre:'Impresora',
      precio: 6000,
      cantidad: 1,
      modelo:'Epson',
      img:'./img/Impresora.jpg'
   },
   {
      id:4,
      nombre:'Teclado',
      precio: 1360,
      cantidad: 1,
      modelo:'North tech',
      img:'./img/Teclado.jpg'
   },
   {
      id:5,
      nombre:'Camara',
      precio: 3000,
      cantidad: 1,
      modelo:'Alcatel',
      img:'./img/camara.jpg'
   },
   {
      id:6,
      nombre:'Torre gamer',
      precio: 10000,
      cantidad: 1,
      modelo:'Gamer',
      img:'./img/torregamer.jpg'
   }
]


stockProductos.forEach((producto) => {
   const div = document.createElement('div')
   div.classList.add('producto')
   div.innerHTML = `
           <div class="card" style="width: 18rem;">
           <div class="card-body">
               <img src=${producto.img}>
               <h3>${producto.nombre}</h3>
               <p class="precioProducto">Precio:$${producto.precio}</p>
               <p>Modelo: ${producto.modelo}</p>
               <button id="agregar${producto.id}" class="btn btn-dark btn-sm">Agregar al carrito</button>
           </div>
       </div>
           `
        contenedorProductos.appendChild(div)

        const boton = document.getElementById(`agregar${producto.id}`)


        boton.addEventListener('click', () => {
            agregarAlCarrito(producto.id)
        })

})

const agregarAlCarrito = (prodId) => {

   const Listadelcarro = carrito.some(prod => prod.id === prodId)

   if (Listadelcarro) {
       const prod = carrito.map(prod => {
           if (prod.id === prodId) {
               prod.cantidad++
           }
       })
   } else {

       const item = stockProductos.find((prod) => prod.id === prodId)
       carrito.push(item)
   }
   actualizarCarro()
}

const vaciarCarro = (prodId) => {

   const item1 = carrito.find((prod) => prod.id === prodId)
   const indice = carrito.indexOf(item1)
   carrito.splice(indice, 1)
   actualizarCarro()
   borrarDatos()

}
const eliminarDelCarrito = (prodId) => {
   const item = carrito.find((prod) => prod.id === prodId)
   const indice = carrito.indexOf(item)
   carrito.splice(indice, 1) 
   actualizarCarro() 
   console.log(carrito)
}

function borrarDatos() {
   localStorage.clear();
}

const actualizarCarro = () => {

   contenedorCarrito.innerHTML = ""

   carrito.forEach((prod) => {
       const div = document.createElement('div')
       div.className = ('productoEnCarrito')
       div.innerHTML = `
       <p>${prod.nombre}</p>
       <p>Precio:$${prod.precio}</p>
       <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
       <button onclick="eliminarDelCarrito(${prod.id})" class="btn btn-outline-danger boton-eliminar"><i class="fas fa-trash-alt"></i>Eliminar</button>
       `

       contenedorCarrito.appendChild(div)

       localStorage.setItem('carrito', JSON.stringify(carrito))

   })
   carritoContador.innerText = carrito.length
   precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
}

vaciarCarrito.addEventListener('click', () => {
    
   Swal.fire({
       title: 'Está seguro de vaciar el carrito?',
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#a5dc86',
       cancelButtonColor: '#f27474',
       confirmButtonText: 'Aceptar',
       cancelButtonText: 'Cancelar',
     }).then((confirmacion) => {
       if (confirmacion.isConfirmed) {
          Swal.fire({
           title: 'Carrito vaciado',
           icon: 'success',
          }), 
       carrito.length = 0
       actualizarCarro()
       borrarDatos()
       }
     })
})

FinalizarCompra.addEventListener('click',()=>{
   Swal.fire({
      title: 'Está seguro de realizar la compra?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#a5dc86',
      cancelButtonColor: '#f27474',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((confirmacion) => {
      if (confirmacion.isConfirmed) {
         Swal.fire({
          title: 'Compra realizada!',
          icon: 'success',
         }), 
      carrito.length = 0
      actualizarCarro()
      borrarDatos()
      }
    })
   })
   




