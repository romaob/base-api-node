class Post{
    constructor(
        id, user_id, text
    ){
        this.table_name = "post";
        this.attributes = {
            id: id,
            user_id: user_id,            
            text: text,
            date_registration: new Date(),
            deleted: null,        
            edited: null,
            comments: [],
        }
    }
}

module.exports = Post;