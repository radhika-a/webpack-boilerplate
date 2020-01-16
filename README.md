# webpack-boilerplate

It is bootstrap applicaiton of webpack projects

It has implemented with latest version of webpack(4) created a component structure with the help of different loaders 


### Start project
npm start

### build project
npm run build


For including the child HTML component in templates
${require('../components/header/header.html')}

Please check html-webpack-plugin and html-loader to know more html component structure

## injecting component html into template using html-webpack-plugin
    ${require('../components/header/header.html')} //check index.html under templates folder to see the example

for html-webpack-plugin configuration level options please refer https://github.com/jantimon/html-webpack-plugin#options

## Creating a component
Create your new component directory under component folder eg: navigation
        
           |-components
                |-navigation
                    |-navigation.js
                    |-navigation.html
                    |-navigation.less
                    
Adding js entry into script.js which is under component folder

        import "./navigation/navigation";
In script.js you can maitain the order of components based on dependency order


Adding less file entry into styles.less which is under component folder
            
            @import "./navigation/navigation.less";


