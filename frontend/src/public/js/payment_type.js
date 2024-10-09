// Manejar el envío del formulario de agregar
document.getElementById('addSaleForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const formData = {
        idcli: document.getElementById('idcli').value,
        idpay: document.getElementById('idpay').value,
        iddel: document.getElementById('iddel').value,
        state: document.getElementById('state').value,
        fpri: document.getElementById('fpri').value,
        delcom: document.getElementById('delcom').value,
        date: document.getElementById('date').value
    };

    console.log('Datos del formulario:', formData);

    fetch('/sell/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'  
        },
        body: JSON.stringify(formData)  
    })
    .then(response => {
        console.log('Respuesta del servidor:', response);
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
function openEditModal(id, idcli, idpay, iddel, state, fpri, delcom, date) {
    console.log(`ID: ${id}, Cliente: ${idcli}, Pago: ${idpay}, Delivery: ${iddel}, Estado: ${state}, Precio final: ${fpri}, Comisión: ${delcom}, Fecha: ${date}`);
    
    document.getElementById('editSaleId').value = id;
    document.getElementById('editClient').value = idcli;
    document.getElementById('editPay').value = idpay;
    document.getElementById('editDel').value = iddel;
    document.getElementById('editSta').value = state;
    document.getElementById('editFpri').value = fpri;
    document.getElementById('editDcom').value = delcom;

    const formattedDate = new Date(date).toISOString().split('T')[0];
    document.getElementById('editDate').value = formattedDate;

    const editModal = new bootstrap.Modal(document.getElementById('editSaleModal'));
    editModal.show();
}


// Manejar el envío del formulario de edición
document.getElementById('editSaleForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const id = document.getElementById('editSaleId').value; 

    const formData = {
        idcli: document.getElementById('editClient').value,
        idpay: document.getElementById('editPay').value,
        iddel: document.getElementById('editDel').value,
        state: document.getElementById('editSta').value,
        fpri: document.getElementById('editFpri').value,
        delcom: document.getElementById('editDcom').value,
        date: document.getElementById('editDate').value
    };

    console.log('Datos a enviar:', JSON.stringify(formData, null, 2));

    fetch(`/sell/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)  
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


