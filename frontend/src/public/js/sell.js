// Manejar el envío del formulario de agregar
document.getElementById('addSaleForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const formData = new FormData(this);

    fetch('/sell/create', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            Swal.fire('Agregado!', 'La venta ha sido agregada.', 'success')
                .then(() => {
                    location.reload(); 
                });
        } else {
            Swal.fire('Error!', 'No se pudo agregar la venta.', 'error');
        }
    });
});

// Función para abrir el modal de edición y cargar datos
function openEditModal(id, fecha, cliente, total) {
    console.log(`ID: ${id}, Fecha: ${fecha}, Cliente: ${cliente}, Total: ${total}`); // Debugging
    document.getElementById('editSaleId').value = id;
    document.getElementById('editFecha').value = fecha;
    document.getElementById('editCliente').value = cliente;
    document.getElementById('editTotal').value = total;
    const editModal = new bootstrap.Modal(document.getElementById('editSaleModal'));
    editModal.show();
}


// Manejar el envío del formulario de edición
document.getElementById('editSaleForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario de forma predeterminada
    const formData = new FormData(this);
    const id = document.getElementById('editSaleId').value; // Obtener el ID de la venta

    fetch(`/sell/update/${id}`, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            Swal.fire('Actualizado!', 'La venta ha sido actualizada.', 'success')
                .then(() => {
                    location.reload(); 
                });
        } else {
            Swal.fire('Error!', 'No se pudo actualizar la venta.', 'error');
        }
    });
});

// Función para eliminar una venta
function deleteSale(id) {
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
            fetch(`/sell/delete/${id}`, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        Swal.fire('Eliminado!', 'La venta ha sido eliminada.', 'success')
                            .then(() => {
                                location.reload();
                            });
                    } else {
                        Swal.fire('Error!', 'No se pudo eliminar la venta.', 'error');
                    }
                });
        }
    });
}


