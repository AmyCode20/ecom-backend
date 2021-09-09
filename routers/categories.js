const {Category} = require('../models/category');
const express = require('express');
const router  = express.Router();

router.get(`/`, async (req, res) => {
    const categoryList = await Category.find();

    if(!categoryList) {
        res.status(500).json({success: false})
    }
    res.send(categoryList);
})

router.post(`/`, async (req, res) => {
    let category = new Category({
        name: req.body.name,
        icom: req.body.icon,
        color: req.body.color
    })
    category = await category.save();

    if(!category)
    return res.status(404).send('the category cannot be created')

    res.send(category);
})

router.delete('/:id', (req, res) => {
    category.findByIdAndRemove(req.params.id).then(category => {
        if(category) {
            return res.status(200).json({success: true, message: 'the category has been found'})
        }else {
            return res.status(404).json({success:false, meassage: "category ID missing"})
        }
    }).catch(err => {
        return res.status(400).json({success: false, error: err})
    })
})

module.exports = router;