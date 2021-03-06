const shortid = require("shortid")
const slugify = require("slugify")
const Product = require("../models/product")



exports.createProduct = (req, res) => {

    // res.status(200).json({ file: req.files, body: req.body })

    const { name, price, description, category, createdBy, quantity} = req.body
    let productPicture = []

    if (req.files.length > 0) {
        productPicture = req.files.map( file => {
            return { img: file.filename }
        })
    }

    const product = new Product({
        name: name, slug: slugify(name), price, description, productPicture, category, quantity, createdBy: req.user._id
    })
    product.save(( error, product ) => {

        if ( error ) res.status(400).json({ error })

        if (product) res.status(201).json({ product })
    })
}
