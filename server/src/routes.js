const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const AccountSchema = require("./schemas/account")
const createAccount = require("./functions/createAccount")
const multer = require("multer")
const fs = require("node:fs");


const upload = multer({storage: multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname+'/storage');
    },
    filename: (req, file, cb) => {
        const filename = (new Date().getTime()).toString(36)+file.originalname
        cb(null, filename)
    }
})})


router.post("/upload", upload.single('image'), async (req, res) => {
    let filename = req.file.filename;
    const {id, old_thumbnail} = req.body;


    let account = await AccountSchema.findById(id);
    account.public.avatar = filename;
    await account.save()

    if (old_thumbnail){
        fs.unlink(__dirname+"/storage/"+old_thumbnail, (err) => {
            if (err){
                console.log(err)
            }
    })}

    res.send(filename);
})

router.get("/attachments/:filename", (req, res) => {
    const {filename} = req.params;
    const filepath = __dirname+'/storage/'+filename;

    fs.access(filepath, fs.constants.F_OK, (err) => {
        if (err){
            console.log(err)
            res.status(404).send('Acces denied')
        }
        else{
            res.sendFile(filename, {root: __dirname+'/storage'})
        }
    })
})


router.post("/register", async (req, res) => {
    const {email, username, password} = req.body;
    let account = await AccountSchema.findOne({"private.email": email});
    const hashed_password = await bcrypt.hash(password, 10)

    if (!account){
        await createAccount(email, username, hashed_password).then(
            res.send("succes")
        )
        .catch(err=>{
            res.send(err)
        })
    }
    else{
        res.send("already registered")
    }
})


router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    let account = await AccountSchema.findOne({'private.email': email});

    if (!account) return res.send("invalid");
    if (!bcrypt.compareSync(password, account.private.password)) return res.send("invalid");

    const id = account._id.toString()
    var data = {...account.public, id: id};

    res.send(data);
})

router.post("/user", async(req, res) => {
    const {id} = req.body;
    let account = await AccountSchema.findById(id);

    if (account){
        res.send(account.public);
    }
    else{
        res.send("invalid id")
    }
})


router.post("/edit", async (req, res) => {
    const keys = Object.keys(req.body).filter(element => element!='id');
    let account = await AccountSchema.findById(req.body.id);
    if (!account) return res.send("invalid id");

    const public_keys = Object.keys(account.public)
    const private_keys = Object.keys(account.private)

    let res_data = "succes";

    for (const key of keys) {
        if (public_keys.includes(key)) {
          account.public[key] = req.body[key];
        }
      
        if (private_keys.includes(key)) {
          if (key === "password") {
            if (bcrypt.compareSync(req.body.password, account.private.password)) {
              account.private.password = await bcrypt.hash(req.body.new_password, 10);
            } else {
              res_data = "incorrect password";
            }
          } else {
            account.private[key] = req.body[key];
          }
        }
      }


    await account.save().catch(err=>{console.log(err)})
    
    res.send(res_data)
});

router.post("/delete", async (req, res) => {
    const {id, password} = req.body;
    account = await AccountSchema.findById(id)
    if (!account) return;
    
    if (await bcrypt.compare(password, account.private.password)){
        //remove profile picture from storage
        if (account.public.avatar){
            const filename = account.public.avatar;
            fs.unlinkSync(__dirname+"/storage/"+filename, (err) => {
                if (err){
                    console.log(err)
                }
            })

        }
        await AccountSchema.deleteOne({_id: id});
        res.send("account deleted")

    }
    else{
        res.send("invalid password")
    }
})




module.exports = router;