$('.remove-item-btn').click(function(){
    const dataId = $(this).data('value')
    $('#deleteRecordModal #delete-record').data('value', dataId)
})

$('#deleteRecordModal #delete-record').click(function(){
    const idToBeDelete = $(this).data('value')
    $(`#deleteForm_${idToBeDelete}`).submit()
})

// $('#deleteRecordModal').on('hidden-bs-modal', function(){
//     $('#deleteRecordModal #delete-record').data('value', undefined)
// })