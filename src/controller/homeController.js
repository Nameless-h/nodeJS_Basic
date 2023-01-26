let getHomepage = (req,res) => {
    return res.render('index.ejs');
}

module.exports = {//export for other files can use
    getHomepage 
}