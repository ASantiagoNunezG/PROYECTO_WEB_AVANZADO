document.getElementById('addDeliveryForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = {
        delivery_type_id: document.getElementById('deliveryType').value,
        shop_id: document.getElementById('shop').value,
        state: document.getElementById('state').value,
        delivery_date: document.getElementById('deliveryDate').value,
        delivery_hour: document.getElementById('deliveryHour').value
    };

    fetch('/deliveries/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            Swal.fire('Agregado!', 'La nueva entrega ha sido agregada', 'success').then(() => {
                location.reload();
            });
        } else {
            Swal.fire('Error', 'No se pudo registrar la nueva entrega', 'error');
        }
    });
});

function openEditModal(idDelivery, delivery) {
    // Verifica que delivery no sea undefined
    if (!delivery) {
        console.error('El objeto delivery es undefined');
        return; // Salir si delivery no está definido
    }

    document.getElementById('editDeliveryId').value = idDelivery;

    // Validar si delivery_date es válido
    if (delivery.delivery_date) {
        const deliveryDate = new Date(delivery.delivery_date);
        if (!isNaN(deliveryDate.getTime())) {
            document.getElementById('editDeliveryDate').value = deliveryDate.toISOString().split('T')[0];
        } else {
            console.error('Fecha inválida:', delivery.delivery_date);
            document.getElementById('editDeliveryDate').value = ''; // Dejar vacío si no es válida
        }
    }

    // Asegúrate de que shop y su nombre existan
    if (delivery.shop && delivery.shop.name) {
        document.getElementById('editShop').value = delivery.shop_id; // Asegúrate de que delivery.shop_id esté presente
    } else {
        console.error('El objeto shop o su nombre no están definidos en delivery:', delivery);
    }

    // Asegúrate de que delivery_type_id esté definido
    if (delivery.delivery_type_id) {
        document.getElementById('editDeliveryType').value = delivery.delivery_type_id;
    } else {
        console.error('El ID del tipo de entrega no está definido en delivery:', delivery);
    }

    document.getElementById('editState').value = delivery.state;
    document.getElementById('editDeliveryHour').value = delivery.delivery_hour;


    
    const editModal = new bootstrap.Modal(document.getElementById('editDeliveryModal'));
    editModal.show();
}

document.getElementById('editDeliveryForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const idDelivery = document.getElementById('editDeliveryId').value;

    const formData = {
        delivery_type_id: document.getElementById('editDeliveryType').value,
        shop_id: document.getElementById('editShop').value,
        state: document.getElementById('editState').value,
        delivery_date: document.getElementById('editDeliveryDate').value,
        delivery_hour: document.getElementById('editDeliveryHour').value
    };

    fetch(`/deliveries/update/${idDelivery}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            Swal.fire('Actualizado!', 'La entrega ha sido actualizada', 'success').then(() => {
                setTimeout(() => {
                location.reload();}, 1000);
            });
        } else {
            Swal.fire('Error!', 'No se pudo actualizar la entrega.', 'error');
        }
    });
});


document.getElementById('editDeliveryForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const idDelivery = document.getElementById('editDeliveryId').value;

    const formData = {
        delivery_type_id: document.getElementById('editDeliveryType').value,
        shop_id: document.getElementById('editShop').value,
        state: document.getElementById('editState').value,
        delivery_date: document.getElementById('editDeliveryDate').value,
        delivery_hour: document.getElementById('editDeliveryHour').value
    };

    fetch(`/deliveries/update/${idDelivery}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            Swal.fire('Actualizado!', 'La entrega ha sido actualizada', 'success').then(() => {
                location.reload();
            });
        } else {
            Swal.fire('Error!', 'No se pudo actualizar la entrega.', 'error');
        }
    });
});

function deleteDelivery(idDelivery) {
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
            fetch(`/deliveries/delete/${idDelivery}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    Swal.fire('Eliminado!', 'La entrega ha sido eliminada.', 'success').then(() => {
                        location.reload();
                    });
                } else {
                    Swal.fire('Error!', 'No se pudo eliminar la entrega.', 'error');
                }
            });
        }
    });
}
