import {createAll, cleanConsole} from "./data";
const companies = createAll();
const companiesFinal = JSON.parse(JSON.stringify(companies))

cleanConsole(1, companies);

const nameCompanies = companiesFinal.map((company) => {

    company.name = company.name.charAt(0).toUpperCase() + company.name.slice(1)
    
    return company.users.map((user) => {    
        
        if (user.firstName == undefined) {
            user.firstName = "";
        } else {
            user.firstName = user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1);
        }
        if (user.lastName == undefined) {
            user.lastName = "";
        } else {
            user.lastName = user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1);
        }

        return user
    });
});

companiesFinal.sort((a,b) => b.usersLength-a.usersLength)

companiesFinal.forEach(item=>{
    item.users.sort((a,b) => a.firstName.localeCompare(b.firstName))
})

console.log("----SOLUTION EXAMPLE 1 --- ", companiesFinal);


// -----------------------------------------------------------------------------
// INSTRUCCIONES EN ESPAÑOL

// Crear una función tomando la variable "companies" como parámetro y reemplazando
// todos los valores "undefined" en "usuarios" por un string vacío.
// El nombre de cada "company" debe tener una letra mayúscula al principio, así como
// el apellido y el nombre de cada "user".
// Las "companies" deben ordenarse por su total de "user" (orden decreciente)
// y los "users" de cada "company" deben aparecer en orden alfabético.

// -----------------------------------------------------------------------------
// INSTRUCTIONS IN ENGLISH

// Create a function taking the variable "companies" as a parameter and replacing
// all values "undefined" in "users" by an empty string.
// The name of each "company" must have a capital letter at the beginning as well as
// the last name and first name of each "user".
// The "companies" must be sorted by their number of "user" (decreasing order)
// and the "users" of each "company" must be listed in alphabetical order
