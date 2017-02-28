# mob-PegaPro
Código do projeto PegaPro para mobile. 


Exemplo de aplicação do material desing

https://github.com/delta98/ionic-material-design-lite/blob/master/demo/expanded-header.html


Usar alguns destes macetes deste link

https://tableless.com.br/criando-uma-aplicacao-movel-com-ionic-2-e-angular-2-em-dez-passos/

# Exemplo de um bom projeto 
https://github.com/martinmicunda/ionic-photo-gallery/blob/master/ionic

# Plugin do facebook como instalar
0 - Criar o aplicativo no facebook
1 - https://ionicthemes.com/tutorials/about/native-facebook-login-with-ionic-framework
2 - clonar o repositorio na pasta do projeto
    doc: https://github.com/jeduan/cordova-plugin-facebook4
    git clone https://github.com/jeduan/cordova-plugin-facebook4.git
3 - Comando para instalar o cordova na maquina local
    cordova plugin add cordova-plugin-facebook4 --save --variable APP_ID="1067360726701947" --variable APP_NAME="ionicfbapp"
4 - Adicionar a plataforma
    ionic platform add android
5 - Fazer o build do projeto
    ionic build android
6 - Rodar no aplicativo diretamente conectando o dispositivo no cabo usb do notebook
    ionic run android --device