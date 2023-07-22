const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

const listContacts = async () => {
  try {
    const contactsList = await fs.readFile(contactsPath);
    return JSON.parse(contactsList);
  } catch (error) {
    console.error(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contactsList = listContacts();
    const result = contactsList.find((contact) => contact.id === contactId);
    return result || null;
  } catch (error) {
    console.error(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contactsList = listContacts();
    const index = contactsList.find((contact) => contact.id === contactId);
    if (index === -1) {
      return null;
    }
    const [result] = contactsList.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
    return result;
    s;
  } catch (error) {
    console.error(error.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contactsList = await listContacts();
    const newContact = { id: nanoid(), name, email, phone };
    contactsList.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
    return newContact;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = { listContacts, getContactById, removeContact, addContact };
