
import login from '../selectors/login.sel'
import 'cypress-mochawesome-reporter/register';
import { siteName,selectDate,singleSiteName } from '../selectors/login-action-locator'
import edge2xSiteSel from '../selectors/edge2x.sel'
import testData from '../test-data/data.json'
import xpath from 'cypress-xpath'

describe("Check each edge2x screen", function() {
  context("Login tests", function() {
    before(function() {
      cy.visit("/");
      cy.get(login.emailField).type('basic.test.user@gridedge.co.uk')
            cy.get(login.passwordField).type('0&Mq9#i*$$Rt')
            cy.get(login.checkBox).should('be.visible').click()
            cy.get(login.signInButton).click()
            cy.get('span:contains("Portfolio")').should('be.visible')
            cy.xpath(edge2xSiteSel.ed2ge2XsiteOption).click()
    });
  
    testData.forEach(test => {
      describe('portfolio screen loaded', () => {
          it('User shouble be able to open Edge2x page ', () => {
              cy.url().should('include', '/gridedge.site/map')
          })
          it('User shouble be able to open notification page ', () => {
              cy.xpath(edge2xSiteSel.analytics).click()
              cy.xpath(edge2xSiteSel.assertReview).should('have.text', ' REVIEW ');
              cy.xpath(edge2xSiteSel.assertShowMe).should('have.text', ' SHOW ME ');
              //cy.xpath(edge2xSiteSel.assertSpecificDayOrWeek).should('have.text', 'Specific day or week')
              cy.xpath(edge2xSiteSel.assertConditionsLike).should('have.text', 'Conditions like...')
              cy.xpath(edge2xSiteSel.assertDayComparisons).should('have.text', 'Day comparisons...')
              cy.get(':nth-child(3) > .mat-focus-indicator').should('be.enabled')
             
                
          })
          it('User should able to select site name from dropdown ', () => {
              cy.get(login.selectSiteOptions).click()
              cy.get(singleSiteName(test.name)).find(".mat-option-text").click()
              cy.wait(60000)
              cy.url().should('include', '/gridedge.site/map')
          })
          it('User should able to logout if all sites are over', () => {
            if (test.id === 22) {
            cy.get('.mat-button-wrapper > .material-icons').click()
            cy.get(':nth-child(10) > app-side-bar-option > .row > .col-6').click()
           }
           
        })
      })
  })
    
  });
});
