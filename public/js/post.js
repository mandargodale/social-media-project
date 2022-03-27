//function to submit form data to post-controller.js create() for creating new post
const createPost = () => {
    const createPostForm = $('#create-post-form')
    createPostForm.submit((e) => {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/post/create',
            data: createPostForm.serialize(),  //it converts form data into JSON
            success: (data) => {
                const createdPost = appendPost(data.data.post)
                $('#post-list-container>ul').prepend(createdPost)
                deletePost($(' .delete-post-button', createdPost))

                new ToggleLike($(' .toggle-like-button', createPost))
            },
            error: (error) => {
                console.log('error in creating post = ', error.responseText)
            }
        })
    })
}

//function to append the created post to DOM
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
            <br>
            <small>
                <a class="toggle-like-button" data-likes="0" href="/likes/toggle-like/?id=${post._id}&type=Post">
                    0 Likes
                </a>
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

//function to delete a post from DOM
const deletePost = (deleteLink) => {  //deleteLink is the <a> tag
    console.log('Inside deletePost()')
    $(deleteLink).click((e) => {
        e.preventDefault()
        $.ajax({
            type: 'get',
            url: $(deleteLink).prop('href'),  //getting value of href attribute from <a> tag
            success: (data) => {
                $(`#post-${data.data.post_id}`).remove()
            },
            error: (error) => {
                console.log('error in deleting post = ', error.responseText)
            }
        })
    })
}

createPost()
