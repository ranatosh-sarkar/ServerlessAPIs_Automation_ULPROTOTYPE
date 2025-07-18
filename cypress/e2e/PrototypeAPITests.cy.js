/// <reference types="cypress" />

describe('✅ Smoke Test – GET /registers through ngrok', () => {
  it('returns 200 OK and an array', () => {
    cy.request({
      method: 'GET',
      url: '/registers',
      headers: { 'ngrok-skip-browser-warning': 'true' },
      failOnStatusCode: false,
      timeout: 90_000
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body).to.be.an('array')
    })
  })
})

describe('Testing ALL APIs: Demonstrating API Request Chaining', () => {

  const generate10DigitContact = () => Math.floor(1000000000 + Math.random() * 9000000000);
  const generate3Digit = () => Math.floor(100 + Math.random() * 900);
  const randomString = (length) => {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  };

  const contact = generate10DigitContact();
  const firstName = randomString(3);
  const lastName = randomString(3);
  const email = `${firstName}.${lastName}@example.com`;
  const password = randomString(6);
  const applicationstatus = "PENDING";
  const country = randomString(3);
  const socialid = generate3Digit() + lastName + country;
  const accounttype = "SAVINGS";
  const annualincome = "58000";
  const drivinglicence = "DL-" + socialid;
  const occupation = "Engineer";
  const ongoingloans = "0";
  const passportnumber = "P" + socialid;
  const taxid = "TAX" + socialid;

  const headers = { 'ngrok-skip-browser-warning': 'true' };

  it("Request Chaining all APIs", () => {
    cy.log("🚀 POST /addRegister");

    const requestBody_addRegister = { contact, firstName, lastName, email, password };

    cy.request({
      method: "POST",
      url: "/addRegister",
      headers,
      body: requestBody_addRegister,
      timeout: 90000
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.deep.include(requestBody_addRegister);
      cy.log("✅ /addRegister passed");
    });

    cy.wait(3000);

    cy.log("📞 GET /registerByContact");
    const knownContact = 6087654321;
    cy.request({
      method: "GET",
      url: "/registerByContact",
      qs: { contact: knownContact },
      headers
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.include({
        contact: knownContact,
        firstName: "Alan",
        lastName: "Collins",
        email: "alan.collins@example.com"
      });
    });

    cy.wait(3000);

    cy.log("📄 GET /registers");
    cy.request({url:'/registers', headers}).then((res) => {
      expect(res.status).to.eq(200);
      const match = res.body.find(u => u.contact === contact);
      expect(match).to.exist;
      expect(match.email).to.eq(email);
    });

    cy.wait(3000);

    cy.log("📝 POST /addApplication");
    cy.request({
      method: "POST",
      url: "/addApplication",
      headers,
      body: { contact, password, accounttype, country, socialid }
    }).then((res) => {
      expect(res.status).to.eq(200);
    });

    cy.wait(3000);

    cy.log("🔍 GET /applicationByContact");
    cy.request({url:`/applicationByContact/${contact}`, headers}).then((res) => {
      expect(res.status).to.eq(200);
    });

    cy.wait(3000);

    cy.log("📋 GET /applications");
    cy.request({url:'/applications', headers}).then((res) => {
      expect(res.status).to.eq(200);
    });

    cy.wait(3000);

    cy.log("🧾 POST /kycDataCapture");
    cy.request({
      method: "POST",
      url: "/kycDataCapture",
      headers,
      body: { contact, password, socialid, annualincome, taxid, drivinglicence, passportnumber, occupation, ongoingloans }
    }).then((res) => {
      expect(res.status).to.eq(200);
    });

    cy.wait(3000);

    cy.log("✔️ POST /kycVerification");
    cy.request({
      method: "POST",
      url: "/kycVerification",
      headers,
      body: { contact, password, socialid, annualincome, taxid, drivinglicence, passportnumber, occupation, ongoingloans }
    }).then((res) => {
      expect(res.status).to.eq(200);
    });

    cy.wait(3000);

    cy.log("💵 POST /deposit");
    cy.request({
      method: "POST",
      url: "/deposit",
      headers,
      body: { contact, password, amount: 1000.0 }
    }).then((res) => {
      expect(res.status).to.eq(200);
    });

    cy.wait(3000);

    cy.log("🏧 POST /withdraw");
    cy.request({
      method: "POST",
      url: "/withdraw",
      headers,
      body: { contact, password, amount: 2000.0 }
    }).then((res) => {
      expect(res.status).to.eq(200);
    });

    cy.wait(3000);

    cy.log("🔁 POST /transferFund");
    const recipientContact = 6087654321;
    cy.request({
      method: "POST",
      url: `/transferFund/${recipientContact}`,
      headers,
      body: { contact, password, amount: 500.0 }
    }).then((res) => {
      expect(res.status).to.eq(200);
    });

    cy.wait(3000);

    cy.log("🧾 GET /displayStatement with schema validation");
    const Ajv = require("ajv");
    const ajv = new Ajv();
    const schema = {
      type: "array",
      items: { type: "object", required: ["id", "contact"] }
    };

    cy.request({
      method: "GET",
      url: `/displayStatement/${contact}`,
      qs: { password },
      headers
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(ajv.validate(schema, res.body)).to.be.true;
    });
  });
});
