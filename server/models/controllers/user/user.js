const { Op } = require("sequelize")
const db = require("../../index")
const bcrypt=require("bcrypt")

const user = db.USER
// const admin = db.ADMIN_TRAINING
// const training = db.TRAININGS


const create_user = async (req, res) => {
    console.log("hi")
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;

    const isValid = /@jmangroup\.com$/

    try {
        if (req.body.emp_id && req.body.name && req.body.email && req.body.password) {
            var {emp_id, name, email, password } = req.body
            if(!passwordRegex.test(password))
            {
                res.send("Passoword is weak")
            }
            else if(!isValid.test(email))
            {
                res.send("not an organisation mail")
            }
            
            else{
                const hash= await bcrypt.hash(password, 10);
                password=hash
                console.log(password,"hello")
                await user.create({
                    emp_id:emp_id,
                    name: name,
                    email_id:email,
                    password: password
                });

                res.send({ statusCode: 200, message: 'response success' })
            }
        }
        else {
            res.send("Response failed to add to DB")
        }
    } catch (error) {
        res.send({ statusCode: 400, message: 'username or mail id already exists' })

    }}


const login = async (req, res) => {
        try {
            console.log(req.body,"sdfsdfsfjsldf")
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).render("login", {
                    msg: "Please enter your email and password",
                    msg_type: "error"
                });
            }
            const valid_user = await user.findOne({
                where: {
                    email_id: req.body.email,
                   
                }})
                console.log(valid_user)
                if (result.length <= 0) {
                    return res.status(401).render("login", {
                        msg: "Email or password incorrect",
                        msg_type: "error"
                    });
                } else {
                    if (!(await bcrypt.compare(password, valid_user.Password))) {
                        return res.status(401).render("login", {
                            msg: "Email or password incorrect",
                            msg_type: "error"
                        })
    
                    } else {
                        const User_Id = result[0].User_Id;
                        const User_Admin = result[0].User_admin;
                        const token = jwt.sign({ User_Id: User_Id }, process.env.JWT_SECRET, {
                            expiresIn:"90m"
                        });
                        const cookieOptions = {
                            expires:
                                new Date(
                                    Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                                ),
                            httpOnly: true,
                        };
                        res.cookie("vivek", token, cookieOptions);
                        if (User_Admin === 'YES') {
                            res.status(200).redirect("/home");
                        }
                        else {
                            res.status(200).redirect("/user");
                        }
    
                    }
                }
    
            ;
    
        } catch (error) {
            res.send("Phone la pesatha da ")
            console.log(error);
        }
}


const isLoggedIn = async (req, res, next) => {
    //req.name="Check Login.........";
    //console.log(req.cookies);
    if (req.cookies.vivek) {
        try {
            const decode = await promisify(jwt.verify)(
                req.cookies.vivek,
                process.env.JWT_SECRET
            );
            //console.log(decode);
            db.query("select * from user_login where User_Id=?",
                [decode.User_Id],
                (err, results) => {
                    //console.log(results);
                    if (!results) {
                        return next();
                    }
                    req.user = results[0];
                    return next();

                });
        } catch (error) {
            console.log(error);
            return next();
        }
    } else {
        next();
    }


};


    


module.exports = {
        create_user,
        login,
        isLoggedIn,
    };