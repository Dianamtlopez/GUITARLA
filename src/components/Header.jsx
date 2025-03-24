// Importar librerías
import { useMemo } from "react";
// Un componente es una función
export default function Header({ cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }) {
    // Se define el State, funciones, variables o datos de js

    // State derivado
    // useMemo, evita que el código se ejecute si las dependencias no han cambiado
    // Toma dos parámetros uno es la funcion y el segundo el arreglo de dependencias
    //  [cart] lo que significa que no haga nada hasta que el carrito cambie
    // En ese caso isEmpty ya no es una funcion
    const isEmpty = useMemo( () => cart.length === 0, [cart] )

    // array method
    // el primer parametro es el total que va acumulando valor producto de operar 
    // (item.quantity * item.price) a medida que itera
    // el segundo valor es el item, es decir el elemento actual
    // el cero es el valor inicial y vamos a sumar a partir de ahi
    const cartTotal = useMemo( () => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])

    // Un componente siempre debe tener un return
    // aqui va lo que se muestra en pantalla en código html que puede mezclarse con código js
    
    return (
        <>
            <header className="py-5 header">
                <div className="container-xl">
                    <div className="row justify-content-center justify-content-md-between">
                        <div className="col-8 col-md-3">
                            <a href="index.html">
                                <img className="img-fluid" src="/img/logo.svg" alt="imagen logo" />
                            </a>
                        </div>
                        <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                            <div className="carrito">
                                <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

                                <div id="carrito" className="bg-white p-3">
                                    {/*Podemos colocar un ternario para verificar 
                                    si el carrito está vacío o no*/}
                                    {isEmpty ? (
                                        <p className="text-center">El carrito está vacío</p>
                                    ) : (
                                        <>
                                            <table className="w-100 table">
                                                <thead>
                                                    <tr>
                                                        <th>Imagen</th>
                                                        <th>Nombre</th>
                                                        <th>Precio</th>
                                                        <th>Cantidad</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/*Vamos a iterar sobre el carrito de compras*/}
                                                    {cart.map((guitar) => (
                                                        <tr key={guitar.id}>
                                                            <td>
                                                                <img
                                                                    className="img-fluid"
                                                                    src={`/img/${guitar.image}.jpg`}
                                                                    alt="imagen guitarra"
                                                                />
                                                            </td>
                                                            <td>{guitar.name}</td>
                                                            <td className="fw-bold">${guitar.price}</td>
                                                            <td className="flex align-items-start gap-4">
                                                                <button type="button" 
                                                                className="btn btn-dark"
                                                                onClick={() => decreaseQuantity(guitar.id)}
                                                                >
                                                                    -
                                                                </button>
                                                                {guitar.quantity}
                                                                <button type="button" 
                                                                className="btn btn-dark"
                                                                onClick={() => increaseQuantity(guitar.id)}
                                                                >
                                                                    +
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <button className="btn btn-danger" 
                                                                type="button"
                                                                onClick={()=>removeFromCart(guitar.id)}        
                                                                >
                                                                    X
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>

                                            <p className="text-end">
                                                Total a pagar: <span className="fw-bold">$ {cartTotal}</span>
                                            </p>
                                            <button 
                                            className="btn btn-dark w-100 mt-3 p-2"
                                            onClick={clearCart}
                                            >
                                                Vaciar Carrito                                                                                           
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
        </>
    );
}