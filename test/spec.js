//spec.js
describe('Contact List App', function() {

  beforeEach(function() {
    browser.get('http://localhost:3000');
  });

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Contact List App');
  });


  it('should add empeccable as contact', function() {
	  	var nameToAdd = 'empeccable'

	    element(by.model('contact.name')).sendKeys(nameToAdd);
	    element(by.model('contact.email')).sendKeys('empeccable@test.com');
	    element(by.model('contact.number')).sendKeys('\(111\)\-111\-1111');
	    element(by.buttonText('Add Contact')).click();

	    // should have at least one contact
	    expect(element(by.binding('contact.name')).isPresent()).toBe(true);

	    // Get the row that has the name by using filter.
	    var contacts = element.all(by.repeater('contact in contactlist'));

        for(var i = 0; i < contacts.length; i++) {
          var contact = contacts[i];
          if(contact.name == nameToAdd) {
            expect(contact[i].email == 'empeccable@test.com');
            expect(contact[i].number == '\(111\)\-111\-1111');
          }
        }
  });


  it('should add empeccablelast as the last contact in the list', function() {
  	element(by.model('contact.name')).sendKeys('empeccablelast');
    element(by.model('contact.email')).sendKeys('empeccablelast@test.com');
    element(by.model('contact.number')).sendKeys('\(999\)\-999\-9999');
    element(by.buttonText('Add Contact')).click();

    expect(element.all(by.binding('contact.name')).last().getText()).
       toEqual('empeccablelast');
    expect(element.all(by.binding('contact.email')).last().getText()).
        toEqual('empeccablelast@test.com');
    expect(element.all(by.binding('contact.number')).last().getText()).
        toEqual('(999)-999-9999');  
  });


  it('should delete empeccable from the list', function() {
	var nameToDelete = 'empeccableDel'
    element(by.model('contact.name')).sendKeys(nameToDelete);
    element(by.model('contact.email')).sendKeys('empeccable@test.com');
    element(by.model('contact.number')).sendKeys('\(111\)\-111\-1111');
    element(by.buttonText('Add Contact')).click();
    expect(element.all(by.binding('contact.name')).last().getText()).
       toEqual(nameToDelete);

    // Get the row that has the name by using filter.
    element.all(by.repeater('contact in contactlist')).filter(function(row){
      return row.element(by.tagName('td')).getText().then(function(name){
        return name === nameToDelete; 
      });
    })
    // Now you should have one row.
    .get(0)
    // Get the row and click find the remove button.
    .element(by.buttonText('Remove'))
    .click();

    // Make sure it was deleted.
    var names = $$('td').getText();
    expect(names).not.toContain(nameToDelete);
  });

});

