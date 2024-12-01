
// Codigo del ejercicio
// console.log('🥇 Primero');

// setTimeout(() => {
//     console.log('🕐 Timeout 1');
//     Promise.resolve().then(() => console.log('🤔 Promesa dentro de timeout'));
// }, 0);

// Promise.resolve().then(() => {
//     console.log('✨ Promesa 1');
//     setTimeout(() => console.log('⏰ Timeout dentro de promesa'), 0);
// });

// Promise.resolve().then(() => console.log('💫 Promesa 2'));
// setTimeout(() => console.log('🕑 Timeout 2'), 0);

// console.log('🥈 Segundo');


console.log('🥇 Primero');

setTimeout(() => {
    console.log('🕐 Timeout 1');
    Promise.resolve().then(() => {
        console.log('🤔 Promesa dentro de timeout');
        return Promise.reject('❌ Promesa rechazada dentro de timeout');
    }).catch(err => console.log(err));
}, 0);

Promise.resolve()
    .then(async () => {
        console.log('✨ Promesa 1');
        setTimeout(() => console.log('⏰ Timeout dentro de promesa'), 0);
        await Promise.resolve();
        console.log('🌟 Async dentro de Promesa 1');
    }).catch(err => console.log('Error:', err));

Promise.resolve()
    .then(() => console.log('💫 Promesa 2'));
    setTimeout(() => console.log('🕑 Timeout 2'), 0);
    console.log('🥈 Segundo');

(async () => {
    try {
        await Promise.reject('❌ Promesa rechazada con async/await');
    } catch (err) {
        console.log(err);
    }
})();
