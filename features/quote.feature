@quote
Feature: Quote test suite

  @quote1 @smoke
  Scenario: Quote smoke test
    Given I navigate to "quote" page
    When I fill out quote required fields
    When I submit the quote form
    And I wait for 1 sec
    Then I should verify required fields submitted successfully
