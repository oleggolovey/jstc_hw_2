// I am not sure :) But think that it's a closure too? 
// As a variable we use a function argument (main.js line 26,27).

const changeBgColor = color => {  
    return () => {
        document.body.style.background = color;
    }
}

export default changeBgColor;