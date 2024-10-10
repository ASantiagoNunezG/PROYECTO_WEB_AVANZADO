//public/js/shop.js
document.getElementById('addShopForm').addEventListener('submit', function(event){
    event.preventDefault();

    const formatData = {
        name: document.getElementById('name').value,
        address: document.getElementById('address').value
    };

    console.log('Datos del formulario de agregar tiendas', formatData);

    fetch('/shops/add',{
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(formatData)
    })
    .then(response =>{
        console.log('Respuesta del servidor', response);
        if(response.ok){
            Swal.fire('Agregado!', 'La nueva tienda ha sido agregada.', 'success').then(()=>{
                location.reload();
            });
        }else{
            Swal.fire('Error!', 'No se pudo agregar la tienda', 'error')
        }
    })
})

//Función para cargar los datos a editar de un registro de tienda
function openEditModal(idShop, name, address){
    console.log(`ID: ${idShop}, Nombre: ${name}, Direccion: ${address}`);

    document.getElementById('editShopId').value = idShop;
    document.getElementById('editName').value = name;
    document.getElementById('editAddress').value = address;

    const editModal = new bootstrap.Modal(document.getElementById('editShopModal'));
    editModal.show();
}

//Manejo del envio del formulario de edición
document.getElementById('editShopForm').addEventListener('submit', function(event){
    event.preventDefault();

    const idShop = document.getElementById('editShopId').value;

    const formData = {
        name: document.getElementById('editName').value,
        address: document.getElementById('editAddress').value
    };

    console.log('Datos a enviar: ', JSON.stringify(formData, null, 2));

    fetch(`/shops/update/${idShop}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response=>{
        if(response.ok){
            Swal.fire('Actualizado!', 'La tienda ha sido actualizada', 'success').then(()=>{
                location.reload();
            });
        }else{
            Swal.fire('Error!', 'No se ha podido actualizar la venta.', 'error');
        }
    });
});

//Función para eliminar una tienda
function deleteShop(idShop){
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
            fetch(`/shops/delete/${idShop}`, { method: 'DELETE'})
            .then(response =>{
                console.log('respuesta ..', response)
                if(response.ok){
                    Swal.fire('Eliminado!', 'La tienda ha sido eliminada.', 'success').then(()=>{
                        location.reload();
                    });
                }else{
                    Swal.fire('Error!', 'No se pudo eliminar la tienda.', 'error');
                }
            });
        }
    }).catch(error =>{
        console.log('Error', error)
    });
}