const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const botonAbrirCarrito = document.getElementById('boton-carrito')
const botonCerrarCarrito = document.getElementById('carritoCerrar')
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]



botonAbrirCarrito.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})
botonCerrarCarrito.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})

contenedorModal.addEventListener('click', (event) =>{
    contenedorModal.classList.toggle('modal-active')

})

modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation()
})