
## Models
- user
```
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string,pin:string
```
- corkboard
```
npx sequelize-cli model:generate --name Corkboard --attributes name:string,category:string,visibility:string,password:string,userId:string
```
- pushpin 
```
npx sequelize-cli model:generate --name Pushpin --attributes corkboardId:string,url:string,description:string,tags:string
```
### Static Model
- category
```
npx sequelize-cli model:generate --name Category --attributes name:string,value:string
```