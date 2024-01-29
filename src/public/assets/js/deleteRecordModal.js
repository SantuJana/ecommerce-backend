$('.remove-item-btn').click(function(){
    const dataId = $(this).data('value')
    $('#deleteRecordModal #delete-record').data('value', dataId)
})

$('#deleteRecordModal #delete-record').click(function(){
    const idToBeDelete = $(this).data('value')
    $.ajax({
        url: '',
        type: 'DELETE',
        data: { id: idToBeDelete },
        success: (res) => {

        },
        error: (err) => {
            console.log('Error to delete record: ', err.message);
        }
    })
})

// $('#deleteRecordModal').on('hidden-bs-modal', function(){
//     $('#deleteRecordModal #delete-record').data('value', undefined)
// })