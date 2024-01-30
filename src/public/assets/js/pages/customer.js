$(document).ready(()=>{
    $('.sort').click(function(){
        const query = window.location.search
        const sortColumn = $(this).data('sort')
        const sortIndex = $(this).data('sort-index') || 1
        $(this).data('sort-index', -1)
        console.log(query);
        if (query === ''){
            window.location.href += `?sort=${sortColumn}:${sortIndex}`
        } else if (query.includes('sort=')) {
            
            // window.location.href += `&sort=${sortColumn}:${sortIndex}`
        }
    })
    
    $('.status-switch').change(function(){
        const customerId = $(this).data('value')
        const query = $(this).data('query')
        window.location.href = `/admin/customer/toggle-status/${customerId}${query}`
    })

})
