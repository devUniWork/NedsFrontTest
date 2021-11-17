# lads-frontend-technical

## Project setup

Please clone this project by running in your terminal: 
```
git clone https://github.com/devUniWork/NedsFrontTest.git
```

### Compiles and hot-reloads for development

cd into the directory and then install and serve.
```
yarn install && yarn serve
```

### Compiles and minifies for production

if you feel so inclined, you may also build the project. (optional).

```
yarn build
```

### Lints and fixes files

Runnning lint will throw a couple of warnings - particularly around vuejs lifecycle hooks not return valid types (they are not supposed to)...
the linter needs to be adjusted.

```
yarn lint
```
### Basic test:

Upon running your server, please navigate to: 
```
 http://localhost:8080/
```

And you should see the UI with the races in time ascending order. I set greyhounds as the default race type.

<img width="1046" alt="Screen Shot 2021-11-17 at 6 44 14 pm" src="https://user-images.githubusercontent.com/88122060/142166821-3defb85e-f0d4-4799-9eaf-8a97342c6723.png">


