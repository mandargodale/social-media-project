const loadMorePosts = () => {
    $.ajax({
        type: 'get',
        url: '/',
        success: () => {
            console.log('posts fetched successfully...')
            window.location.reload()
        },
        error: (error) => {
            console.log('error in fetching posts = ', error.responseText)
        }
    })
}
