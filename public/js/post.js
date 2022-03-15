//method to submit form data to post-controller.js create() for creating new post
const createPost = function () {
    console.log('Inside createPost()')
    const createPostForm = $('#create-post-form')
    createPostForm.submit((e) => {
        e.preventDefault()
        console.log('createPostForm.serialize() = ', createPostForm.serialize())
        $.ajax({
            type: 'post',
            url: '/post/create',
            data: createPostForm.serialize(),  //it converts form data into JSON
            success: (data) => {
                console.log(data)
            },
            error: (error) => {
                console.log(error.responseText)
            }
        })
    })
}

createPost()
