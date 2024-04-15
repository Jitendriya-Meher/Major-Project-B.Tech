const Contact = require("../models/contact-model");


const contactUs = async (req, res) => {

    try{
        const {email,message,username} = req.body;

        const form = await Contact.create({
            email,message,username
        });

        return res.status(200).json({
            message:"your message has been send successfully",
            success:true,
            data:form
        });
    }
    catch(err){
        return res.status(200).json({
            message:'Error while connecting to server',
            success: false
        });
    }
}

const getAllContacts = async (req, res) => {

    try{

        const contacts = await Contact.find({});

        return res.status(200).json({
            message:"Contacts successfully retrieved",
            success:true,
            contacts: contacts
        });
    }
    catch(err){
        return res.status(200).json({
            message:'Error while connecting to server',
            success: false
        });
    }
}

const deleteUserContact = async (req, res) => {
    try{
        
        const {id} = req.params;

        const contact = await Contact.findByIdAndDelete(id);

        if( !contact){
            return res.json({
                success: false,
                message: "contact not found"
            });
        }

        return res.json({
            success: true,
            message: "Users contact deleted successfully",
            contact
        });

    }
    catch(err){
        return res.json({
            success: false,
            message: err.message
        });
    }
}

const getUserContact = async (req, res) => {
    try{
        
        const {id} = req.params;

        const contact = await Contact.findById(id);

        if( !contact){
            return res.json({
                success: false,
                message: "contact not found",
            });
        }

        return res.json({
            success: true,
            message: "contact fetch successfully",
            contact
        });

    }
    catch(err){
        return res.json({
            success: false,
            message: err.message
        });
    }
}

module.exports = {contactUs,getAllContacts,deleteUserContact,getUserContact};