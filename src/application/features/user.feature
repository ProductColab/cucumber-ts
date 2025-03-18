Feature: User Repository
  As a developer
  I want to manage users in the database
  So that I can store and retrieve user information

  Background:
    Given the database is clean

  Scenario: Creating a new user
    When I create a user with email "test@example.com" and name "Test User"
    Then the user should be created successfully
    And the user should have email "test@example.com"
    And the user should have name "Test User"

  Scenario: Finding a user by ID
    Given a user exists with email "test@example.com" and name "Test User"
    When I find the user by ID
    Then the user should be found
    And the user should have email "test@example.com"
    And the user should have name "Test User"

  Scenario: Finding a user by email
    Given a user exists with email "test@example.com" and name "Test User"
    When I find the user by email "test@example.com"
    Then the user should be found
    And the user should have email "test@example.com"
    And the user should have name "Test User"

  Scenario: Updating a user
    Given a user exists with email "test@example.com" and name "Test User"
    When I update the user's name to "Updated Name"
    Then the user should be updated successfully
    And the user should have name "Updated Name"
    And the user should still have email "test@example.com"

  Scenario: Deleting a user
    Given a user exists with email "test@example.com" and name "Test User"
    When I delete the user
    Then the user should be deleted successfully
    And the user should not exist in the database

  Scenario: Listing all users
    Given a user exists with email "test1@example.com" and name "Test User 1"
    And a user exists with email "test2@example.com" and name "Test User 2"
    When I list all users
    Then I should see 2 users
    And the users should include "test1@example.com"
    And the users should include "test2@example.com" 