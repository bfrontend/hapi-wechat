/*
 * @Author: webxmsj
 * @Date: 2018-09-12 15:57:54
 * @LastEditors: webxmsj
 * @LastEditTime: 2018-09-12 18:20:24
 * @Description: 
 * @Email: 17625492424@163.com
 */

 const Hapi = require('hapi');
 require('env2')('./.env');
 const config = require('./config');

 const routesHelloWorld = require('./routes/hello-world');
 const routesShops = require('./routes/shops');
 const routesOrders = require('./routes/orders');
 
 const pluginHapiSwagger = require('./plugins/hapi-swagger');
 const pluginHapiPagination = require('./plugins/hapi-pagination');

 const server = new Hapi.Server();
 server.connection({
     port: config.port,
     host: config.host
 });

 const init = async () => {
     await server.register([
         ...pluginHapiSwagger,
         ...pluginHapiPagination
     ]);
     server.route([
         ...routesHelloWorld,
         ...routesShops,
         ...routesOrders
     ]);
     await server.start();
     console.log(`Server running at: ${server.info.uri}`); 
 }
 
 init();