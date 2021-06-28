const contacts = require("./contacts")
const { Command } = require("commander")
const program = new Command()
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone")

program.parse(process.argv)

const argv = program.opts()

async function invokeAction({ action, id, name, email, phone }) {
  let result = null

  switch (action) {
    case "list":
      result = await contacts.listContacts()
      console.table(result)
      break

    case "get":
      result = await contacts.getContactById(Number(id))
      console.table(result)
      break

    case "add":
      result = await contacts.addContact(name, email, phone)
      console.table(result)
      break

    case "remove":
      result = await contacts.removeContact(Number(id))
      console.log(result)
      break

    default:
      console.warn("\x1B[31m Unknown action type!")
  }
}

invokeAction(argv)
