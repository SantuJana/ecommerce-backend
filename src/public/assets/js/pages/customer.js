$(document).ready(()=>{
    $('.status-switch').change(function(){
        const customerId = $(this).data('value')
        window.location.href = `/admin/customer/toggle-status/${customerId}`
    })
})
