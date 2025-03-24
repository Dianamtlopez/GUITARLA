// Para usar los Hooks, lo primero es importar el hook de useState
import { useState, useEffect } from "react"
// Importación de librerías
import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { db } from "./data/db,js"


// Los componentes siemppre deben iniciar en mayusculas
function App() {
  

  // Como useEfect se ejecuta almenos una vez, signofica que mi estado va a estar inicializado
  // para solucionar esto vamos a crear una varible con el carrito guardado en storage
  const inicialCart = () => {
    // Recuperamos lo que tenga localStorage y obtenemos el carrito
    const localStorageCart = localStorage.getItem("cart")
    // Comprobamos si hay algo en la variable, en caso de que no haya nada, va a retornal un null
    // decimos: si localStorageCart tiene algo localStorageCart ? entonces convertimos de string 
    // a un arreglo y en caso de que no haya nada, el valor tiene que ser el arreglo vacío, porque
    // tenemos que setear algo como valor inicial
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  // State
  // Los useState siempre deben definirse en el componente
  const [data, setData] = useState(db)

  // le pasamos la comprobacion de localStorage
  const [cart, setCart] = useState(inicialCart)

  // Creo una constante con cantidad maxima de productos, con eso si necesito 
  // modificarla en algun lado mas, modifico solamente en la constante
  const  MAX_ITEMS = 5
  // Decrementar las guitarra
  const  MIN_ITEMS = 1

  // useEffect
  // Forma recomendada para consimir API
  // Hook, cada que la función cambie, es bastante util para manejar los efectos
  // secundarios de un cambio en nuestro state
  useEffect(() => {
    // Toma dos parametros, el primero es el nombre de lo que se quiere almacenar
    // el segundo es lo que se quiere almacenar, solo permite almacenar strings
    localStorage.setItem('cart', JSON.stringify(cart))
    // en automatico React lo sincronizarlo una vez ese state haya completado su acción 
    // de actualizarse en base a esas fuciones
    // cada que cart cambie quiero ejecutar localStorage
  }, [cart])

  // Agregar productos al carrito
  function addToCart(item){
    // findIndex retorna el elemento del array o el indice del elemeto en caso de que lo encuentre,
    // si no lo encuentra devuelve -1
    // revisamos si existe el elemento itemExiste guitar.is === item.id, cart.findIndex esto itera 
    // sobre el carrito e compras, generamos un objeto temporal llamado guitar
    const itemExist = cart.findIndex(guitar => guitar.id === item.id)
    // Prevenir que se agreguen más elementos
    if(itemExist >= 0){// Existe en el carrito
      // si existe el item, aumentamos la cantidad de ese item en el carrito
      //console.log('Ya existe, No se agrega el producto...')
      // es en caso de que se oprima varias veces el elemento desde la página
      if(cart[itemExist].quantity >= MAX_ITEMS)return
      // Para no mutar el state, creamos una copua del carrito
      const updatedCart = [...cart]
      // A updatedCart le pasamos la posicion [itemExist] e incrementamos quantity en 1 .quantity ++
      updatedCart[itemExist].quantity++
      // Actualizamos el state
      setCart(updatedCart)
    } else{
      // si no existe el item, lo agregamos al carrito
      console.log('El produco noo existe, Agregando...')
      item.quantity = 1
      setCart([...cart, item])
    }
    // cuando lleguemos al carrito de compras, ya sea que sea un elemento nuevo o esté actualizando
    // ella a saveLocalStorage para ue me muestre lo que tiene guardado, not tiene nada porque está 
    // tomando los datos del state
    // el state de React es asincrono, lo que significa que el estado no se actualiza inmediatamente 
    // si no hasta unos milisegundos despues por lo tanto no funcioa correctamente
  }

  // Burrar productos del carrito
  function removeFromCart(id){
    // Eliminamos el item del carrito
    // Si la funcion usa un parametro, donde se hace el llamado kay que poner un callback
    // Lo que hace es traerme las dos guitarras diferentes a la que quiero eliminar y eso
    // regresa el nuevo arreglo y llo setea en la funcion
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))

  }
  // boton - para quitar mas productos
  // toma un id porque igual que en eliminar requerimos identificar el elemento
  function decreaseQuantity(id){
    // Buscamos el item en el carrito, usamos map que nos retorna un arreglo nuevo
    const updatedCart = cart.map( item => {
      if(item.id === id && item.quantity > MIN_ITEMS){
        return{
          // mantengo las propiedades
          ...item,
          // modifico la cantidad
          quantity : item.quantity - 1 
        }
      }
      // para que mantenga el resto de lelementos sobre los cuales no idecrementé las cantidades
      return item
    })
    // ya está la variable modificada pero tengo que setear el carrito
    setCart(updatedCart)
  }

  // boton + para agregar mas productos
  // toma un id porque igual que en eliminar requerimos identificar el elemento
  function increaseQuantity(id){
    // Buscamos el item en el carrito, usamos map que nos retorna un arreglo nuevo
    const updatedCart = cart.map( item => {
      if(item.id === id && item.quantity < MAX_ITEMS){
        return{
          // mantengo las propiedades
          ...item,
          // modifico la cantidad
          quantity : item.quantity + 1 
        }
      }
      // para que mantenga el resto de lelementos sobre los cuales no incrementé las cantidades
      return item
    })
    // ya está la variable modificada pero tengo que setear el carrito
    setCart(updatedCart)
  }
  
  // boton - para quitar mas prodictos
  // toma un id porque igual que en eliminar requerimos identificar el elemento
  function decreaseQuantity(id){
    // Buscamos el item en el carrito, usamos map que nos retorna un arreglo nuevo
    const updatedCart = cart.map( item => {
      if(item.id === id && item.quantity > MIN_ITEMS){
        return{
          // mantengo las propiedades
          ...item,
          // modifico la cantidad
          quantity : item.quantity - 1 
        }
      }
      // para que mantenga el resto de lelementos sobre los cuales no incrementé las cantidades
      return item
    })
    // ya está la variable modificada pero tengo que setear el carrito
    setCart(updatedCart)
  }
  
  // Vaciar el Carrito
  function clearCart(){
    setCart([])
  }

  return (
    <>
      {/* Renderizar */}
      <Header 
        cart={cart}
        removeFromCart={removeFromCart}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        clearCart={clearCart}
      />
      <main className="container-xl mt-5">
          <h2 className="text-center">Nuestra Colección</h2>

          <div className="row mt-5">
            {/* Renderizar 
                Cuando solo vamos a retornar algo, podemos utilizar el return implicito
                Significa que quitamos llaves, colocamos parentesis y lo que deseamos retornar
                el map, itera sobre db y por cada elemento, genera una guitarra
                siempre que trabajo con map, debo colocar un key que sea un valor unico, 
                si trabajo con base de datos y tengo id, coloco el id*/}
            {data.map((guitar) => (
                <Guitar 
                  key = {guitar.id}
                  guitar={guitar}
                  setCart={setCart}
                  addToCart={addToCart}
                /> 
              )
            )}
   
          </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
          <div className="container-xl">
              <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
          </div>
      </footer>
    </>
  )
}

export default App
