const contacts = require("./contacts")
const argv = require("yargs").argv

async function invokeAction({ action, id, name, email, phone }) {
  let result = null

  switch (action) {
    case "list":
      result = await contacts.listContacts()
      console.table(result)
      break

    case "get":
      result = await contacts.getContactById(id)
      console.table(result)
      break

    case "add":
      result = await contacts.addContact(name, email, phone)
      console.table(result)
      break

    case "remove":
      result = await contacts.removeContact(id)
      console.log(result)
      break

    default:
      console.warn("\x1B[31m Unknown action type!")
  }
}

invokeAction(argv)
