import { cleanConsole, createAll } from "./data";

const companies = createAll();

cleanConsole(4, companies);

// const result = companies.map((company)=>{
//     const newCompanies = []
//      return newCompanies[company.users]
// })


// const result = companies.users.map(item => {
//     const newCompanies = []
//     newCompanies.push([item])
//     //newCompanies.company = item.name

//     return newCompanies
//  })

// const result = companies.map((company) => {
//     return company.users.map((user)=> {
//         return user
//     })
// })

// const result = companies.filter(function(item){
//     return item = item.users
// })

// for(const prop in companies){
//     console.log(companies[prop.users]);
// }

const result = companies.map(company => {
    const newCompanies = {
        "users": company.users.map(user => {
            return user
        })
    }
}) 

console.log("---- SOLUTION EXAMPLE 4 --- ", result);

// -----------------------------------------------------------------------------
// INSTRUCCIONES EN ESPAÑOL

// Crear una función tomando como parámetro la variable "companies" y agrupando
// todos los "users" de todas las "companies" en una sola tabla. Cada "user"
// debe tener un nuevo atributo "company" que tenga como valor el nombre de la
// dicha "company". Los "users" deben ordenarse de acuerdo con sus edad
// (de mayor a menor).

// -----------------------------------------------------------------------------
// INSTRUCTIONS IN ENGLISH

// Create a function taking as parameter the "companies" variable and grouping
// all "users" of all "companies" in a single table. Each "user"
// must have a new attribute "company" having for value the name of the "company"
// to which it belongs. The "users" must be sorted according to their
// age (from oldest to youngest)
