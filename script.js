// Lista de productos disponibles
const products = [
    {
      id: 1,
      nombre: "CAMPO BURGO RESERVA 2018",
      descripcion: "Tradición y calidad son las señas de identidad de Bodegas Isidro Milagro. Disfruta de su Campo Burgo Reserva 2018, un rioja de perfil clásico, con un tanino noble, maduro y redondo, aterciopelado, con volumen en boca y un perfecto equilibrio entre la fruta madura y la barrica.",
      precio: 10.5,
      graduacion: 13.5,
      imagen: "https://res.cloudinary.com/dkrew530b/image/upload/v1719863077/fo7xxbtviptvh1x7uwme.webp",
    },
    {
      id: 2,
      nombre: "CUNE GRAN RESERVA 2017",
      descripcion: "Cune Gran Reserva 2017 es un tinto que reúne toda la complejidad que ha dado fama mundial a Rioja y ofrece un estilo actual de entender los grandes reservas. CVNE, una marca centenaria que es también una de las más conocidas de Rioja, te ofrece ahora su 'top' de la gama. Un Gran Reserva con el que la firma demuestra que las grandes bodegas logran elaborar grandes vinos en añadas difíciles.",
      precio: 12.0,
      graduacion: 14.0,
      imagen: "https://res.cloudinary.com/dkrew530b/image/upload/v1719863376/kaznug3n7aihmi6oozu2.webp",
    },
    {
      id: 3,
      nombre: "CUNE SEMIDULCE",
      descripcion: "Un blanco suave y fresco producto de la sobremaduración. Cune Semidulce conserva toda la frescura de los blancos jóvenes secos, y la elegancia y suavidad de los tradicionales vinos dulces de Rioja.",
      precio: 5.2,
      graduacion: 12.28,
      imagen: "https://res.cloudinary.com/dkrew530b/image/upload/v1719863787/av09rgd6gkjspixdkemy.webp",
    },
    {
      id: 4,
      nombre: "CARRAMONTE CRIANZA 2021",
      descripcion: "Bodegas Viyuela se consolida como una apuesta importante y un referente en la Ribera del Duero. Como prueba, en 2019 fue reconocida por Mundus Vini como la mejor bodega de esta denominación. Ahora nos presenta Carramonte Crianza 2021. Un tinto exclusivo para Vinoselección que ya presentamos con la añada 2020. La calidad de esta cosecha 2021, calificada como Excelente en la D.O., ha hecho que no esperemos más para repetir experiencia. Disfruta ahora de este magnífico tempranillo diseñado en el término burgalés de Boada de Roa, en el corazón de la denominación. Es intenso, carnoso, de suaves taninos, tacto sedoso y final fresco.",
      precio: 15.0,
      graduacion: 14.5,
      imagen: "https://res.cloudinary.com/dkrew530b/image/upload/v1719864181/nixctxnj25jmfoubofld.webp",
    },
  ];
  
  // Carrito inicial vacío
  let cart = [];
  
  // Referencias a elementos del DOM
  const productList = document.getElementById("product-list");
  const cartList = document.getElementById("cart");
  const totalElement = document.getElementById("total");
  
  // Cargar el carrito desde LocalStorage al iniciar
  loadCart();
  displayCart();
  
  // Función para guardar el carrito en LocalStorage
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  // Función para cargar el carrito desde LocalStorage
  function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        cart = JSON.parse(savedCart);
      } catch (error) {
        console.error('Error al parsear el carrito desde LocalStorage:', error);
        cart = []; // Inicializa el carrito como vacío en caso de error
      }
    }
  }
  
  // Función para mostrar los productos en la página
  function displayProducts() {
    products.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.classList.add("col-md-3", "mb-4");
      productElement.innerHTML = `
        <div class="card h-100">
          <img src="${product.imagen}" class="card-img-top" alt="${product.nombre}" style="width: 200px;">
          <div class="card-body">
            <h5 class="card-title">${product.nombre}</h5>
            <p class="card-text">Precio: ${product.precio.toFixed(2)}€</p>
            <button class="btn btn-primary" onclick="addToCart(${product.id})">Agregar al carrito</button>
          </div>
        </div>
      `;
      productList.appendChild(productElement);
    });
  }
  
  // Función para añadir un producto al carrito
  function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    if (!product) {
      console.error("Producto no encontrado");
      return;
    }
  
    // Verifica si el producto ya está en el carrito
    const existingProduct = cart.find((p) => p.id === productId);
    if (existingProduct) {
      // Si el producto ya está en el carrito, incrementa la cantidad
      existingProduct.cantidad++;
    } else {
      // Si el producto no está en el carrito, añádelo
      cart.push({
        id: product.id,
        imagen: product.imagen,
        nombre: product.nombre,
        precio: product.precio,
       
  
   cantidad: 1,
      });
    }
    saveCart();
    displayCart();
  }
  
  // Función para eliminar o reducir la cantidad de un producto en el carrito
  function removeFromCart(index) {
    if (index >= 0 && index < cart.length) {
      if (cart[index].cantidad > 1) {
        // Si la cantidad es mayor que 1, reduce la cantidad
        cart[index].cantidad--;
      } else {
        // Si la cantidad es 1, elimina el producto del carrito
        cart.splice(index, 1);
      }
      displayCart();
    } else {
      console.error("Índice fuera de rango");
    }
    saveCart();
  }
  
  // Función para mostrar el carrito en la página
  function displayCart() {
    cartList.innerHTML = "";
    cart.forEach((item, index) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("d-flex", "align-items-center", "mb-3", "p-2", "border", "rounded");
      cartItem.innerHTML = `
        <img src="${item.imagen}" class="img-150" alt="${item.nombre}" style="width: 100px; height: auto; margin-right: 15px;">
        <div class="flex-grow-1">
          <h5 class="mb-1">${item.nombre}</h5>
          <p class="mb-1">Precio: ${item.precio.toFixed(2)}€</p>
          <p class="mb-1">Cantidad: ${item.cantidad}</p>
          <p class="mb-1">Total: ${(item.precio * item.cantidad).toFixed(2)}€</p>
        </div>
        <div>
          <button class="btn btn-success btn-sm me-2" onclick="increaseQuantity(${index})">Añadir</button>
          <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Eliminar</button>
        </div>
      `;
      cartList.appendChild(cartItem);
    });
    calculateTotal(); // Calcula el total después de actualizar el carrito
  }
  
  // Función para incrementar la cantidad de un producto en el carrito
  function increaseQuantity(index) {
    if (index >= 0 && index < cart.length) {
      cart[index].cantidad++;
      displayCart(); // Actualiza la vista del carrito después de incrementar la cantidad
    } else {
      console.error("Índice fuera de rango");
    }
  }
  
  // Función para calcular y mostrar el total del carrito
  function calculateTotal() {
    const total = cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    totalElement.textContent = total.toFixed(2) + '€';
  }
  
  // Mostrar productos al cargar la página
  displayProducts();