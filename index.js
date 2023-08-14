const contacts = require("./contact");
const { Command } = require("commander");

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "User ID")
  .option("-n, --name <type>", "User name")
  .option("-e, --email <type>", "User email")
  .option("-p, --phone <type>", "User phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      return console.table(allContacts);

    case "get":
      const Users = await contacts.getContactsById();
      return console.table(Users);

    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      return console.table(newContact);

    case "remove":
      const removeContact = await contacts.removeContact(id);
      return console.table(removeContact);

    default:
      console.log("Invalid action");
  }
}

invokeAction(argv);
