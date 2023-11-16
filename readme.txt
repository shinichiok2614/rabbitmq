quokka.js

npm init
npm i amqplib --save-dev

docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.12-management

node receice.mail.js 'dev.test.leader'

node receive.mail.js '*.test'

node receive.mail.js '*.test.*'

node receive.mail.js '#.leader'

node send.mail.js 'dev.test' 'hello dev vs test'

node send.mail.js 'dev.test.leader' 'hello dev vs test vs leader'