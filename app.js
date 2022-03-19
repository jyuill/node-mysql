var msg = "Hello John";
console.log(msg);

var msg2 = "Loop it!"

for(i=0; i < 5; i++){
    console.log(msg2);
}

// load faker package (already installed)
const {faker}=require('@faker-js/faker')
// demo faker
console.log(faker.internet.email());
console.log(faker.date.past());

function generateAddress(){
    console.log(faker.address.streetAddress());
    console.log(faker.address.city());
    console.log(faker.address.country());
}

generateAddress();