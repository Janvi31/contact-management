const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');
const mongoose = require('mongoose');
const ApiError = require('../utils/ApiError');


//  @desc Get all contacts
// @route GET /api/contacts
// @access private
const getContacts = asyncHandler(async (req,res)=> {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
});


// @desc Create new contacts
// @route POST /api/contacts
// @access private
const createContact = asyncHandler(async (req,res)=> {
    const {name, email, phone} = req.body;
    if(!name.trim() || !email.trim() || !phone.trim()){
        throw new ApiError(400,"All fields are mandatory");
    }
    const contact = await Contact.create({name, email, phone, user_id: req.user.id});
    res.status(201).json(contact);
});


// @desc Get a contact
// @route GET /api/contacts/:id
// @access private
const getContact = asyncHandler(async (req,res)=> {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        // Throw an error if the ID is invalid
        throw new ApiError(400,"Invalid ID format");
    }

    const contact = await Contact.findById(req.params.id);

    if(!contact){
        throw new ApiError(404,"Contact not found");
    }

    res.status(200).json(contact);
});


// @desc Update a contact
// @route PUT /api/contacts/:id
// @access private
const updateContact = asyncHandler(async (req,res)=> {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        // Throw an error if the ID is invalid
        throw new ApiError(400,"Invalid ID format");
    }

    const contact = await Contact.findById(req.params.id);

    if(!contact){
        throw new ApiError(404,"Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
        throw new ApiError(403,"User don't have permission to update user's contacts");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updatedContact);
});


// @desc Delete a contact
// @route DELETE /api/contacts/:id
// @access private
const deleteContact = asyncHandler(async (req,res)=> {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        // Throw an error if the ID is invalid
        throw new ApiError(400,"Invalid ID format");
    }


    const contact = await Contact.findById(req.params.id);

    if(!contact){
        throw new ApiError(404,"Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
        throw new ApiError(403,"User don't have permission to update user's contacts");
    }

    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedContact);
});


module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };