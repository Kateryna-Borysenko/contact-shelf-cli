import { program } from "commander";
import { contactList, getContactById, addContact, removeContact, updateContact } from './db/contacts.js';

program.version('1.0.0');

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contactList();
      console.table(allContacts);
      break;
    case "get":
      const contact = await getContactById(id);
      console.table(contact);
      break;
    case "add":
      const newContact = await addContact({ name, email, phone });
      console.table(newContact);
      break;
    case "remove":
      const removedContact = await removeContact(id);
      console.table(removedContact);
      break;
    case "update":
      const updatedContact = await updateContact(id, { name, email, phone });
      console.table(updatedContact);
      break;
    default:
      console.error("Unknown action");
      break;
  }
};

invokeAction(options).catch(console.error);