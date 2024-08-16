// Obtener el total de la venta y lo formateamos con dos decimales
let totalNode = document.querySelector('#total');
let total1 = parseFloat(totalNode.innerText.trim()); // Convierte el texto a número decimal
total1 = total1.toFixed(2); // Formatea el número a dos decimales

paypal.Buttons({
    // Configura la creación del pedido
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                description: 'Descripción del artículo o servicio',
                amount: {
                    currency_code: 'USD', // Moneda de la transacción
                    value: total1 // Usa el valor formateado con dos decimales como importe de la transacción
                }
            }]
        });
    },
    // Maneja la aprobación del pago
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            alert('Pago realizado con éxito por ' + details.payer.name.given_name + ' ' + details.payer.name.surname);
            // Aquí puedes redirigir al usuario o realizar otras acciones necesarias
            // Por ejmplo llamar a una API
        });
    },
    // Maneja la cancelación del pago
    onCancel: function(data) {
        alert('Pago cancelado.');
    },
    // Maneja los errores durante la transacción
    onError: function(err) {
        console.error('Ocurrió un error durante la transacción:', err);
    }
}).render('#paypal-button-container'); // Renderiza el botón en el contenedor especificado
