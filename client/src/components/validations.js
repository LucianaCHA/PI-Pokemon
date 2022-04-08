export function validate (value) {
    let error = {};

    // if (!value.name) {
    //     error.message = 'Name is required';
    // }
    // if(!(/^[a-zA-z]*[a-zA-Z\d\-_@&$%#\s]{1,18}$/.test(value.name))) {
    //     error.message = 'Name must be at least 3 characters, only letters and spaces';
    //     console.log(error.message)
    // }
    // if(value.hp < 1 || value.hp > 100) {
    //     error.message = 'Must be beetween 1 and 99.You could leave it empty and toss a coin ';
    // }
    // if(value.attack < 1 || value.attack > 100) {
    //     error.message = 'Must be beetween 1 and 99.You could leave it empty and toss a coin ';
    // }
    // if(value.defense < 1 || value.defense > 100) {
    //     error.message = 'Must be beetween 1 and 99.You could leave it empty and toss a coin ';
    // }
    // if(value.speed < 1 || value.speed > 100) {
    //     error.message = 'Must be beetween 1 and 99.You could leave it empty and toss a coin ';
    // }
    // if(value.weight < 1 || value.weight > 1000) {
    //     error.message = 'Weight must be beetween 1 and 999 Kg.You could leave it empty and toss a coin ';
    // }
    // //^\d+(\.\d{1,2})?$
    // if(value.height < 0.1 || value.height > 20) {
    //     error.message = 'Height must be between 0.01 m and 20 m or leave it empty and toss a coin ';
    // }
    // // if(!(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(value.image))) {
    // //     error.message = 'Image must be an url';
    // // }
    // if(value.types.length >2) {
    //     error.message = 'You can only select 2 types';
    // }
    console.log(error.message)
    return error.message 
}


//console.log(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(value.image))


// let Pokemon = {
//     name : "Luciana ",
//     types:["normal"],
//     hp : 25,
//     attack: 15,
//     defense: 15,
//     speed: 15,
//     weight: 15,
//     heigth: 15,
//     image: "https://www.google.com"
// }
// validate (Pokemon)