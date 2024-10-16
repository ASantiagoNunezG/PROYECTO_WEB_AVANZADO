// Manejar el envío del formulario de agregar
document.getElementById('addPaymentTypeForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const formData = {
        name: document.getElementById('name').value,
    };

    console.log('Datos del formulario:', formData);

    fetch('/payment-type/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'  
        },
        body: JSON.stringify(formData)  
    })
    .then(response => {
        console.log('Respuesta del servidor:', response);
        if (response.ok) {
            Swal.fire('Agregado!', 'El tipo de pago ha sido agregada.', 'success')
                .then(() => {
                    location.reload(); 
                });
        } else {
            Swal.fire('Error!', 'No se pudo agregar el tipo de pago.', 'error');
        }
    });
});

// Función para abrir el modal de edición y cargar datos
function openEditModal(id,name) {
    console.log(`ID: ${id}, nombre: ${name}`);
    
    document.getElementById('editPaymentTypeId').value = id;
    document.getElementById('editName').value = name;
;

    const editModal = new bootstrap.Modal(document.getElementById('editPaymentTypeModal'));
    editModal.show();
}


// Manejar el envío del formulario de edición
document.getElementById('editPaymentTypeForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const id = document.getElementById('editPaymentTypeId').value; 

    const formData = {
        name: document.getElementById('editName').value,
    };

    console.log('Datos a enviar:', JSON.stringify(formData, null, 2));

    fetch(`/payment-type/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)  
    })
    .then(response => {
        if (response.ok) {
            Swal.fire('Actualizado!', 'El tipo de pago ha sido actualizada.', 'success')
                .then(() => {
                    location.reload(); 
                });
        } else {
            Swal.fire('Error!', 'No se pudo actualizar el tipo de pago.', 'error');
        }
    });
});
// Función para eliminar una venta
function deletePaymentType(id) {
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
            fetch(`/payment-type/delete/${id}`, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        Swal.fire('Eliminado!', 'El tipo de pago ha sido eliminada.', 'success')
                            .then(() => {
                                location.reload();
                            });
                    } else {
                        Swal.fire('Error!', 'No se pudo eliminar el tipo de pago.', 'error');
                    }
                });
        }
    });
}


