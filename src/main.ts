import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
const Path = require('path');
const fs = require('fs');


function autoWireRoutes(app, baseDir, currDir, dirList) {
 
  const readDirMain = fs.readdirSync(currDir);
    
  readDirMain.forEach((dirNext) => {
    const dirName = currDir + "/" + dirNext;
    if (fs.lstatSync(dirName).isDirectory()) {
      const endpoint = {routeName:dirName.split(baseDir)[1],dirPath:dirName};
      try {
        if(fs.lstatSync( endpoint.dirPath+'/index.js').isFile()) {
        dirList.push(endpoint);
        app.use('/api'+ endpoint.routeName, require(endpoint.dirPath));
      }
    }catch(err) { 

      }
      autoWireRoutes(app, baseDir, dirName, dirList);
    } 
  });  
}


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  let dirList = [];
  const baseDir = Path.join(__dirname, '../src/routes');
  autoWireRoutes(app, baseDir, baseDir, dirList);
  console.log('endpoints = ' + JSON.stringify(dirList));

  const config = new DocumentBuilder()
  .setTitle('Cats example')
  .setDescription('The cats API description')
  .setVersion('1.0')
  .addTag('cats')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();
