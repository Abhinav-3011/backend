import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { registerschema } from "./mongodbconnect.js";
import { currentDateTime } from "./Date.js";
import pdf from "html-pdf";
import nodemailer from "nodemailer";

const app = express();
const pass = "RozLsaTj6K5kBcf0";
const collection_name = "ecom";
const uri = `mongodb+srv://pm8461202:${pass}@cluster0.xosv8mt.mongodb.net/${collection_name}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(uri)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("MongoDB connection error:", err));

const Register = mongoose.model("register", registerschema);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/image", express.static("image"));
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    
    res.send("yes");
});

app.post("/register", async (req, res) => {
    const { email, password, name } = req.body;
    console.log(email, password, name);

    try {
        let data = new Register({ name:req.body.name, password:req.body.password, email:req.body.email });
        let save = await data.save();
        console.log(save);
        res.send("Save successful");
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    try {
        let resp = await Register.findOne({ email, password });
        if (resp && resp.email === email && resp.password === password) {
            res.send(true);
        } else {
            res.send(false);
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/send_to_mail", (req, res) => {
 

    console.log(req.body)
     console.log(req.body.register_data[0])
     if(!req.body.data && req.bodyregister_data.length<=0)
        {
            res.send(false)
        }

    for (let i = 0; i < req.body.data.length; i++) {
        req.body.data[i].Timestamp = currentDateTime;
    }

    const templatePath = req.body.templateSelect == 1 ? "certificate1/Certificate1" : req.body.templateSelect == 2 ? "certificate2/Certificate2" : null;

    if (!templatePath) {
        return res.status(400).send("Invalid template selection");
    }

    if (!req.body.value) {
        return res.status(401).send("Kindly please login first");
    }

    try {
        res.render(templatePath, { certificateData: req.body.data[0] }, (err, html) => {
            if (err) {
                console.error("Error rendering template:", err);
                return res.send(false);
            }

            const options = { format: 'A4' };

            pdf.create(html, options).toBuffer((err, buffer) => {
                if (err) {
                    console.error("Error generating PDF:", err);
                    return res.send(false);
                }

                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user:'demo75114@gmail.com',
                        pass:'tmbw pgut dxzj fsmo'
                    }
                });
                
                const mailOptions = {
                    from: 'demo75114@gmail.com',
                    to: req.body.register_data[0], // Ensure the recipient's email is passed in the request
                    subject: 'Certificate',
                    text: 'Please find attached your certificate.',
                    attachments: [
                        {
                            filename: 'certificate.pdf',
                            content: buffer
                        }
                    ]
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error("Error sending email:", error);
                        return res.send(false);
                    }
                    console.log('Email sent: ' + info.response);
                    res.send("Email sent successfully");
                });
            });
        });
    } catch (error) {
        console.error("Error:", error);
        res.send(false)
    }
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
