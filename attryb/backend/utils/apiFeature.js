class ApiFeature{
    constructor (query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        const keyword =this.queryStr.q 
        ? {
            name : {
                $regex : this.queryStr.q,
                $options : "i"
            }
        } : {}

        this.query = this.query.find({...keyword});

        return this
    }
}
module.exports = ApiFeature;