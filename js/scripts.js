//Business Logic for Bank
function Bank (){
  this.users = [];
  this.currentUser = null;
  this.nextUserId = 0;
}

Bank.prototype.assignUserId = function() {
  var newId = this.nextUserId;
  this.nextUserId++;
  return newId;
}

Bank.prototype.registerUser = function(username, password){
  var userId = this.assignUserId();
  var newUser = new User(userId, username, password);
  this.currentUser = newUser;
  this.users.push(newUser);
}

Bank.prototype.logIn = function(username, password){
  var foundUser = null;
  for (var i = 0; i <this.users.length; i++){
    if (username === this.users[i].name){
      foundUser = this.users[i];
    }
  }

  if(!foundUser) {
    return false;
  }

  if(foundUser.password === password) {
    this.currentUser = foundUser;
    return true;
  } else {
    return false;
  }
}

Bank.prototype.logOut = function(){
  this.currentUser = null;
}

//Business logic for users
function User (id, name, password) {
  this.account = new Account(0);
  this.id = id;
  this.name = name;
  this.password = password;
}

User.prototype.getAccount = function(){
  return this.account;
}

//Business logic for account
function Account (balance) {
  this.balance = balance;
}

Account.prototype.deposit = function(amount) {
  this.balance += amount;
}

Account.prototype.withdraw = function(amount){
  this.balance -= amount;
}

Account.prototype.getBalance = function(){
  return this.balance;
}

//User Interface Logic
var bank = new Bank();

function addNewUser(username, password) {
  bank.registerUser(username, password)
  $("#login-page").hide();
  $("#open-account-page").show();
}

function addNewAccount(balance){
  var newAccount = bank.currentUser.getAccount();
  newAccount.deposit(balance);
  $("#open-account-page").hide();
  $(".show-balance").text(newAccount.getBalance());
  $("#account-page").show();
}

function logInUser(username, password){
  if(bank.logIn(username, password)) {
    var account = bank.currentUser.getAccount();
    $("#login-page").hide();
    $(".show-balance").text(account.getBalance());
    $(".error-message").hide();
    $("#account-page").show();
  } else {
    $(".error-message").show();
  }
}

function userDeposit(amount){
  var account = bank.currentUser.getAccount();
  account.deposit(amount);
  $(".show-balance").text(account.getBalance());
}

function userWithdraw(amount) {
  var account = bank.currentUser.getAccount();
  account.withdraw(amount);
  $(".show-balance").text(account.getBalance());
}

function logOutUser(){
  bank.logOut();
  $("#account-page").hide();
  $("#login-page").show();
}

function addTestAccount(username, password, balance) {
  bank.registerUser(username, password);
  var newAccount = bank.currentUser.getAccount();
  newAccount.deposit(balance);
  bank.logOut();
}

$(function() {
  var loginUsername = $("#login-form #login-username");
  var loginPassword = $("#login-form #login-password");
  var startBalance = $("#new-account-form #opening-balance");
  var depositValue = $("#deposit-value");
  var withdrawValue = $("#withdraw-value");

  $("#register").click(function() {
    addNewUser(loginUsername.val(), loginPassword.val());
    loginUsername.val("");
    loginPassword.val("");
  });
  $("#login").click(function() {
    logInUser(loginUsername.val(), loginPassword.val());
    loginUsername.val("");
    loginPassword.val("");
  });
  $("#new-account-form").submit(function(event){
    event.preventDefault();
    addNewAccount(parseFloat(startBalance.val()));
  });
  $("#deposit").submit(function(event){
    event.preventDefault();
    userDeposit(parseFloat(depositValue.val()));
    depositValue.val("");
  });
  $("#withdraw").submit(function(event) {
    event.preventDefault();
    userWithdraw(parseFloat(withdrawValue.val()));
    withdrawValue.val("");
  })
  $("#logout").click(function(){
    logOutUser();
  });

  addTestAccount("phil", "panda45", 421.89);
  addTestAccount("paige", "giraffe87", 570.12);
});
