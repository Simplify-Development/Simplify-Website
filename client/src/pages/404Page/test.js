const lost;
const getBack = () => {

};

if (lost) {
    getBack().then(() => {
        console.log("Here you go, don't go the same path again.")
    })
}


//Poor Navigation
if (lost) {
    lost = false;
    getBack();
}