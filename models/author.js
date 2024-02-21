const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    first_name: { type: String, required: true, maxLength: 100 },
    family_name: { type: String, required: true, maxLength: 100 },
    date_of_birth: { type : Date },
    date_of_death: { type : Date },

})

AuthorSchema.virtual("name").get(function(){
    let fullname = ''
    if (this.first_name && this.family_name){
        fullname = `${this.family_name}, ${this.first_name}`;
    }

    return fullname;
})

AuthorSchema.virtual("url").get(function(){
    return `/catalog/author/${this.id}`
})

AuthorSchema.virtual("lifespan").get(function(){
    const dob = this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';
    const dod = this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : '';
    return `${dob} - ${dod}`    
})

AuthorSchema.virtual("dob_input_format").get(function () {
  return DateTime.fromJSDate(this.date_of_birth).toISODate(); 
});

AuthorSchema.virtual("dod_input_format").get(function () {
  return DateTime.fromJSDate(this.date_of_death).toISODate(); 
});

module.exports = mongoose.model("Author", AuthorSchema)