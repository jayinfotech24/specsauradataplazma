import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constants/api.js";
import Contact from "../models/contactModel.js";

export const createContact = async (req, res) => {
    try {
        const { name, email, number, subject, message } = req.body;

        if (!name || !email || !number || !subject || !message ) {
            return res.status(400).json({ message: ERROR_MESSAGE.ALL_FIELDS_REQUIRED , status: 400});
        }

        // create new user 
        const contact = new Contact({
            name: name,
            email:email,
            mobile: number,
            subject: subject,
            message: message
        });

        await contact.save();

        res.status(201).json({ contact, status: 201 });

    } catch (error) {
        res.status(500).json({ message: ERROR_MESSAGE.PROCESS_REQUEST, status: 500 });
    }
}