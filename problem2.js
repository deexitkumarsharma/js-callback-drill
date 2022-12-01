/*
    Problem 2:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Read the given file lipsum.txt
        2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
        3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
        4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
        5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
*/

const fs = require("fs");

let myFunc2 = () => {
  fs.readFile("lipsum.txt", "utf-8", (error, data) => {
    console.log(data);
    let path = "upperCase.txt";
    let upperCaseData = data.toUpperCase();
    //2nd Step convert the content to uppercase & write to a new file.

    fs.writeFile(path, upperCaseData, (err) => {
      if (err) {
        throw err;
      }
      console.log(upperCaseData);

      fs.rename("upperCase.txt", "filenames.txt", () => {
        console.log("\nupperCase File Renamed!\n");

        fs.readFile("filenames.txt", "utf-8", (err, upperCaseReadData) => {
          console.log(upperCaseReadData);

          // 3.convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
          let newpath = "filenames.txt";
          let lowerCaseData = upperCaseData.toLowerCase();
          fs.writeFile(newpath, lowerCaseData, (err) => {
            if (err) {
              throw err;
            }
            console.log(lowerCaseData);

            var dataArr = data.split(". ");
            // console.log(dataArr);
            let splitContent = dataArr.reduce((acc, curr) => {
              let newArr = acc + "\n" + curr;
              return newArr;
            }, "");
            // console.log(res)

            let newpath2 = "filenames.txt";

            fs.writeFile(newpath2, splitContent, (err) => {
              if (err) {
                throw err;
              }
              // console.log(splitContent)

              fs.readFile("filenames.txt", "utf-8", (err, afterstep3data) => {
                // console.log(afterstep3data);
                //4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt

                var sortContent = afterstep3data.split("\n").sort().join("\n");
                let path = "sorted.txt";
                fs.writeFile(path, sortContent, (err) => {
                  if (err) {
                    throw err;
                  }
                  // console.log(sortContent);

                  let newpath = "filenames.txt";
                  fs.writeFile(newpath, sortContent, (err) => {
                    if (err) {
                      throw err;
                    }

                    fs.appendFile("filenames.txt", sortContent, (err) => {
                      if (err) {
                        throw err;
                      }
                      // 5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
                      fs.readFile(
                        "filenames.txt",
                        "utf-8",
                        (err, finalData) => {
                          console.log(finalData);

                          var files = ["filenames.txt", "sorted.txt"];
                          // myListOfFiles will be your list of files with paths relative to your script.
                          function deleteFiles(files) {
                            for (const file of files) {
                              fs.unlink(file, (err) => {
                                if (err) throw err;
                              });
                            }
                          }
                          deleteFiles(files);
                        }
                      );
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
};

module.exports = myFunc2;
