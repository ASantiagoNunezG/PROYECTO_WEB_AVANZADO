// Manejar el envío del formulario de agregar
document.getElementById('addPaymentForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const formData = {
        payment_type_id: document.getElementById('payType').value,
        state: document.getElementById('state').value,
        payment_date: document.getElementById('date').value,
        payment_hour: document.getElementById('hour').value,
    };

    console.log('Datos del formulario:', formData);

    fetch('/payment/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'  
        },
        body: JSON.stringify(formData)  
    })
    .then(response => {
        console.log('Respuesta del servidor:', response);
        if (response.ok) {
            Swal.fire('Agregado!', 'El pago ha sido agregada.', 'success')
                .then(() => {
                    location.reload(); 
                });
        } else {
            Swal.fire('Error!', 'No se pudo agregar el pago.', 'error');
        }
    });
});

function openEditModal(id, payment) {
    // Verifica que el objeto payment no sea undefined
    if (!payment) {
        console.error('El objeto payment es undefined');
        return; // Salir si payment no está definido
    }

    document.getElementById('editPaymentId').value = id;

    // Validar si payment_date es válido
    if (payment.payment_date) {
        const paymentDate = new Date(payment.payment_date);
        if (!isNaN(paymentDate.getTime())) {
            // Restar un día
            paymentDate.setDate(paymentDate.getDate() - 1);
            
            // Asignar la fecha ajustada al campo de entrada en formato YYYY-MM-DD
            document.getElementById('editPayment_date').value = paymentDate.toISOString().split('T')[0];
        } else {
            console.error('Fecha inválida:', payment.payment_date);
            document.getElementById('editPayment_date').value = ''; // Dejar vacío si no es válida
        }
    }


    // Asegúrate de que el tipo de pago esté definido
    if (payment.payment_type_id) {
        document.getElementById('editPayType').value = payment.payment_type_id;
    } else {
        console.error('El ID del tipo de pago no está definido en payment:', payment);
    }

    // Asigna los demás valores del formulario
    document.getElementById('editState').value = payment.state;
    document.getElementById('editPayment_hour').value = payment.payment_hour;

    // Mostrar el modal de edición
    const editModal = new bootstrap.Modal(document.getElementById('editPaymentModal'));
    editModal.show();
}

document.getElementById('editPaymentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir la recarga de la página

    const id = document.getElementById('editPaymentId').value; // ID del pago que se está editando

    const formData = {
        payment_type_id: document.getElementById('editPayType').value, // ID del tipo de pago
        state: document.getElementById('editState').value, // Estado del pago
        payment_date: document.getElementById('editPayment_date').value, // Fecha del pago
        payment_hour: document.getElementById('editPayment_hour').value // Hora del pago
    };

    console.log('Datos a enviar:', JSON.stringify(formData, null, 2));

    // Realizar la solicitud PUT para actualizar los datos del pago
    fetch(`/payment/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData) // Convertir los datos a JSON
    })
    .then(response => {
        if (response.ok) {
            Swal.fire('Actualizado!', 'El pago ha sido actualizado.', 'success')
                .then(() => {
                    location.reload(); // Recargar la página después de actualizar
                });
        } else {
            Swal.fire('Error!', 'No se pudo actualizar el pago.', 'error');
        }
    })
    .catch(error => {
        console.error('Error al actualizar el pago:', error);
        Swal.fire('Error!', 'Hubo un problema al actualizar el pago.', 'error');
    });
});



// Función para eliminar una venta
function deletePayment(id) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡Esta acción no se puede deshacer!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`/payment/delete/${id}`, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        Swal.fire('Eliminado!', 'El pago ha sido eliminado.', 'success')
                            .then(() => {
                                location.reload();
                            });
                    } else {
                        Swal.fire('Error!', 'No se pudo eliminar el pago.', 'error');
                    }
                });
        }
    });
}
