import { Given, When, Then } from "@cucumber/cucumber";
import { DbWorld } from "support/db.world";
import assert from "assert";

Given("the database is clean", async function (this: DbWorld) {
  await this.cleanDatabase();
});

Given("a user exists with email {string} and name {string}", async function (this: DbWorld, email: string, name: string) {
  await this.createTestUser(email, name);
});

When("I create a user with email {string} and name {string}", async function (this: DbWorld, email: string, name: string) {
  await this.createTestUser(email, name);
});

When("I find the user by ID", async function (this: DbWorld) {
  await this.findUserById(this.testUser.id);
});

When("I find the user by email {string}", async function (this: DbWorld, email: string) {
  await this.findUserByEmail(email);
});

When("I update the user's name to {string}", async function (this: DbWorld, newName: string) {
  await this.updateTestUser(this.testUser.id, { name: newName });
});

When("I delete the user", async function (this: DbWorld) {
  if (this.testUser.id === null) {
    throw new Error("Test user ID is null");
  }
  const userId = this.testUser.id;
  this.deletedUserId = userId;
  await this.deleteTestUser(userId);
});

When("I list all users", async function (this: DbWorld) {
  await this.listAllUsers();
});

Then("the user should be created successfully", function (this: DbWorld) {
  assert(this.testUser !== null, "User should be created");
  assert(this.testUser.id !== undefined, "User should have an ID");
});

Then("the user should be found", function (this: DbWorld) {
  assert(this.testUser !== null, "User should be found");
});

Then("the user should have email {string}", function (this: DbWorld, email: string) {
  assert(this.testUser.email === email, `User email should be ${email}`);
});

Then("the user should have name {string}", function (this: DbWorld, name: string) {
  assert(this.testUser.name === name, `User name should be ${name}`);
});

Then("the user should be updated successfully", function (this: DbWorld) {
  assert(this.testUser !== null, "User should be updated");
});

Then("the user should still have email {string}", function (this: DbWorld, email: string) {
  assert(this.testUser.email === email, `User email should still be ${email}`);
});

Then("the user should be deleted successfully", async function (this: DbWorld) {
  if (this.deletedUserId === null) {
    throw new Error("Deleted user ID is null");
  }
  const deletedUser = await this.findUserById(this.deletedUserId);
  assert(deletedUser === null, "User should be deleted");
});

Then("the user should not exist in the database", async function (this: DbWorld) {
  if (this.deletedUserId === null) {
    throw new Error("Deleted user ID is null");
  }
  const deletedUser = await this.findUserById(this.deletedUserId);
  assert(deletedUser === null, "User should not exist in database");
});

Then("I should see {int} users", function (this: DbWorld, count: number) {
  assert(this.testUsers.length === count, `Should see ${count} users`);
});

Then("the users should include {string}", function (this: DbWorld, email: string) {
  const userEmails = this.testUsers.map((u: any) => u.email);
  assert(userEmails.includes(email), `Users should include ${email}`);
}); 