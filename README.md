# Email Input

React component for the email address input field of a message composer.

## Improvements

### Error Messaging
* Instead of highlighting an invalid entry in red, I would display a short & descriptive error of the issue.
* Currently, the behavior for when a user hits 'Enter' while the input is a duplicate of an existing email, it will reset the input. With more time, I would inplement short & descriptive error messaging to go along with the validation mentioned in the previous point.

### Auto Complete
* I would adjust the markup & css for the dropdown to render from the current position of the user input, instead of a static spot. 
* I would update the user's focus to be on the input after selecting an item in the dropdown. Currently, after clicking, the user has to click back into the input.
* I would add mouse hover functionality to the autocomplete dropdown. Currently, it only responds to keyboard navigation.