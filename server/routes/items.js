const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const { Item } = require("../models/Item");


/** 
 * GET
 */
router.get("", (req, res) => {
    Item.find((err, row) => {
        if (err) return res.json({ success: false, method: "GET", error: err });
        if (row.length === 0) return res.json({ success: false, method: "GET", error: 'no document', data: null});
    
        return res.json({ success: true, method: "GET", data: row});
    })
})

/** 
 * POST 
 */
router.post("", (req, res) => {        
    Item.saveItem(req.body, (data) => {
        data.save((err, row) => {
            if (err) return res.json({ success: false, method: "POST", error: err });
            
            return res.json({ success: true, method: "POST", data: row });
        })
    });
});


/** 
 * PATCH
 */
router.patch("/:id", (req, res) => {
    Item.findByIdAndUpdate(req.params.id, req.body, (err, query) => {
        if (err)  return res.json({ success: false, method: "PATCH", error: err });

        return res.json({ success: true, method: "PATCH", id: req.params.id, value : req.body });
    }); 
});


/** DELETE 
 * delete data with parameter
 */
/* router.delete("/:id", (req, res) => {
    return res.json({ success: true, method: "DELETE" });
    const id = req.params.id;

    Case.findByIdAndDelete(id, (err, data) => {
        if(err) { return res.json({ success: false, msg: "데이터 삭제 실패", error: err }); }
        
        return res.json({ success: true, msg: "데이터 삭제 완료" });

    })
}); */


module.exports = router;