// Business Logic for AddressBook
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i = 0; i < this.contacts.length; i++) {
    console.log(i, this.contacts[i]);
    if (this.contacts[i]) {
      console.log(" first if c.id=", this.contacts[i].id, "  id=", id);
      if (this.contacts[i].id === id) {
        console.log(" second if");
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if(this.contacts[i]) {
      if (this.contacts[i].id === id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}


// Buseiness Logic for Contacts
function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// UI logic
var addressBook = new AddressBook();

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<input type='button' class='deleteButton' id='" + contact.id + "' value='Delete'>");
  $("#show-contact").show();
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(parseInt(this.id));
  });

  $("#buttons").on("click", ".deleteButton", function(){
    addressBook.deleteContact(parseInt(this.id));
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  })
}

function displayContactDetails(addressBookToDisplay){
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact){
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
}

$(function(){
  attachContactListeners();
  $("form#new-contact").submit(function(event){
    event.preventDefault();
    var inputtedFirstName = $ ("input#new-first-name").val();
    var inputtedLastName = $ ("input#new-last-name").val();
    var inputtedPhoneNumber = $ ("input#new-phone-number").val();

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");

    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });
});
