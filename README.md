# Assignment 4 - Product
- Demo: [product.yuhong.me](https://product.yuhong.me/)
- Github: [Theodore-Ho/E.-App.-Dev.-Assignment---4-client](https://github.com/Theodore-Ho/E.-App.-Dev.-Assignment---4-client)

### Overview
This project is the 4th assignment of Enterprise Application Develop course of TU Dublin Computer Science module 4th year.

The assignment is about using Node.js, Express, and MongoDB to develop a minor site, display products, and include CRUD operations. This is the frontend project of the assignment, built with Vue2.

### Install
- ```git clone https://github.com/Theodore-Ho/E.-App.-Dev.-Assignment---4-client.git```
- Make sure you have the backend ([Theodore-Ho/E.-App.-Dev.-Assignment---4-server](https://github.com/Theodore-Ho/E.-App.-Dev.-Assignment---4-server)) running in port 8080.
- In bash command, navigate to the root path of the project, execute ```npm install```, then execute ```npm run serve```.
- The server will be running in localhost:8081, open browser, type in ```localhost:8081```, then you can access the app.
- If you wish to build the project, and put the bundled file in the node.js, please do follows:
  - Comment line 8 in the file ```./src/utils/request.js```, and cancel the comment for line 9.
  - Execute ```npm run build```, the bundled file will generate in ```./dist``` folder.
  - Copy the bundled files into the ```./public``` folder of node.js backend project.