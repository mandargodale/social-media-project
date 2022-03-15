//method to submit form data to post-controller.js create() for creating new post
const createPost = () => {
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
                const createdPost = appendPost(data.data.post)
                $('#post-list-container>ul').prepend(createdPost)
            },
            error: (error) => {
                console.log(error.responseText)
            }
        })
    })
}

//method to append the created post to DOM
const appendPost = (post) => {
    return $(`
    <li id="post-${post._id}">
        <p>
            <small>
                <a href="/post/destroy/${post._id}" class="delete-post-button">X</a>
            </small>
            ${post.content}
            <br>
            <small>
            ${post.user.name}
            </small>
        </p>
        <div id="post-comment">
            <form action="/comment/create" method="post">
                <input type="text" name="content" placeholder="Add comment..." required>
                <input type="hidden" name="postId" value="${post._id}">
                <button>Add comment</button>
            </form>
            <div id="post-comment-list">
                <ul id="post-comments-${post._id}">
                </ul>
            </div>
        </div>
    </li>`)
}

createPost()
