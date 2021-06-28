const fs = require("fs").promises
const path = require("path")
const { v4 } = require("uuid")

const contactsPath = path.join(__dirname, "db/contacts.json")

const listContacts = async () => {
  try {
    const res = await fs.readFile(contactsPath)

    return JSON.parse(res)
  } catch (error) {
    console.error(error.message)
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts()
    const contact = contacts.find((contact) => contact.id === contactId)
    if (!contact) throw new Error("Id's incorrect")

    return contact
  } catch (error) {
    console.error(error.message)
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts()
    const contactIndex = contacts.findIndex((contact) => contact.id === contactId)
    if (contactIndex === -1) throw new Error("Id's incorrect")

    const updatedContacts = contacts.filter((contact) => contact.id !== contactId)
    updateContactsDb(updatedContacts)
    return "Deletion completed"
  } catch (error) {
    console.error(error.message)
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts()
    const id = v4()
    const newContact = {
      id,
      name,
      email,
      phone,
    }
    const updatedContacts = contacts ? [...contacts, newContact] : newContact
    updateContactsDb(updatedContacts)
    return newContact
  } catch (error) {
    console.error(error.message)
  }
}

async function updateContactsDb(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
}

module.exports = { listContacts, getContactById, removeContact, addContact }
