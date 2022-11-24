/*
    Problem 1:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously 
*/

const fs = require("fs");

let myFunc = (() => {
    fs.mkdir("../json", () => {
        for (let i = 0; i < 8; i++) {

            let path ="../json" + Math.random().toString(36).slice(-5); + ".json";
            let data = {};

            fs.writeFile(path,JSON.stringify(data,null,2), ((error) => {
                if (error) {
                    console.log("error occurred while creating file!", err);
                    return;
                } else {
                    console.log("File created successfully  " + path);
                }
                fs.unlink(path, ((error) => {
                    if (error) {
                        throw error;
                    } else {
                        console.log("File deleted successfully" + path);
                    }
                }));
            }));
        }
    });
});


module.exports = myFunc;
