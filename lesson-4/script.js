const str = document.querySelector('p');
document.querySelector('.replace-all').addEventListener('click', () => {
    console.log(str);
    str.innerHTML = str.innerHTML.replace(/'/g, '"');
});


document.querySelector('.replace-start-end').addEventListener('click', () => {
    console.log(str);
    str.innerHTML = str.innerHTML.replace(/\B'|'\B/g, '"');
});

