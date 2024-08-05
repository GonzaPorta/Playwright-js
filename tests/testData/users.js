export const users = {
    teacher: {
        user: 'panza',
        password: '12345'
    },
    students: {
        user: 'alumno1',
        password: 'alumnopass'
    },
    director: 'Juan',
    country: 'Argentina',
};
console.log(users.students);
console.log(users);

for (let role in users) {
    if (users.hasOwnProperty(role)) {
        console.log(`Role: ${role}`);
        const userInfo = users[role];
        
        for (let prop in userInfo) {
            if (userInfo.hasOwnProperty(prop)) {
                console.log(`${prop}: ${userInfo[prop]}`);
            }
        }
    }
}