export const clearAllInputs = () => {
   const inputs = document.querySelectorAll("input");
    for(let key of inputs) {
        key.value = '';
    }
}