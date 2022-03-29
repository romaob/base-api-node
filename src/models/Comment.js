class Comment{
    constructor(
        id, post_id, user_id, text, 
    ){
        this.table_name = "comment";
        this.attributes = {
            id: id,
            post_id: post_id,
            user_id: user_id,
            text: text,
            date_register: new Date(),
            edited: null
        }
    }
}

module.exports = Comment;