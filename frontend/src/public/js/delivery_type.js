//public/js/delivery_type.js
document.getElementById('addTDelivery').addEventListener('submit', function(event){
    event.preventDefault();

    const formatData = {
        name: document.getElementById('name').value
    };
    console.log('Datos del formulario de agregar tipo de delivery', formatData);

    fetch('/types-deliveries/add', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(formatData)
    }).then(response =>{
        console.log('Respuesta del servidor', response);
        if(response.ok){
            Swal.fire('Agregado!', 'El nuevo tipo de delivery ha sido agregado', 'success').then(()=>{
                location.reload();
            });
        }else{
            Swal.fire('Error', 'No se pudo registrar el nuevo tipo de delivery', 'error')
        }
    })
});

//Función para cargar los datos a editar de un registro de tienda
function openEditModal(idTDelivery, name){
    console.log(`ID: ${idTDelivery}, Nombre: ${name}`);

    document.getElementById('editTDeliveryId').value = idTDelivery;
    document.getElementById('editName').value = name;

    const editModal = new bootstrap.Modal(document.getElementById('editTDeliveryModal'));
    editModal.show();
}
//Manejo del envio del formulario de edicion
document.getElementById('editTDeliveryForm').addEventListener('submit', function(event){
    event.preventDefault();

    const idTDelivery = document.getElementById('editTDeliveryId').value;

    const formData = {
        name: document.getElementById('editName').value,
    };

    console.log('Datos a enviar: ', JSON.stringify(formData, null, 2));

    fetch(`/types-deliveries/update/${idTDelivery}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response=>{
        if(response.ok){
            Swal.fire('Actualizado!', 'El tipo de delivery ha sido actualizado', 'success').then(()=>{
                location.reload();
            });
        }else{
            Swal.fire('Error!', 'No se ha podido actualizar el tipo de delivery.', 'error');
        }
    });
});

//Función para eliminar el registro de tipo de delivery
function deleteDeliveryType(idTDelivery){
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡Esta acción no se puede deshacer!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar'
    }).then((result)=>{
        if(result.isConfirmed){
            fetch(`/types-deliveries/delete/${idTDelivery}`, { method: 'DELETE'})
            .then(response =>{
                console.log('respuesta ..', response)
                if(response.ok){
                    Swal.fire('Eliminado!', 'El tipo de delivery ha sido eliminado.', 'success').then(()=>{
                        location.reload();
                    });
                }else{
                    Swal.fire('Error!', 'No se pudo eliminar el tipo de delivery.', 'error');
                }
            });
        }
    }).catch(error =>{
        console.log('Error', error)
    });
}