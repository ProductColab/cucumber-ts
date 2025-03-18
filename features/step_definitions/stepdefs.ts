import { When, Then } from '@cucumber/cucumber';
import { hello } from '@/hello';

When('I visit the hello world page', function () {
  const result = hello();
  console.log(result);
});

Then('I see {string}', function (_string) {
  // Write code here that turns the phrase above into concrete actions
  return true;
});
