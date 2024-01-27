$('#deleteRecordModal #delete-record').click(function(){
    const dataId = $('.remove-item-btn').data('value')
    $.ajax({
        url: '',
        headers:{
            contentType: 'application/json'
        },
        data:{
            id: dataId,
        },
        type: 'post',
        success: () => {
            console.log('success');
        },
        error: (error) => {
            console.log('error: ', error.message);
        }
    })
})