const amqplib = require("amqplib");
const amqp_url_cloud =
  "amqps://vtqfufsk:mc_1kCAAa0gsCR9qysjQKnRKIzcD3gV3@armadillo.rmq.cloudamqp.com/vtqfufsk";
const amqp_url_docker = "amqp://localhost:5672";
const receiveEmail = async () => {
  try {
    const conn = await amqplib.connect(amqp_url_cloud);
    const channel = await conn.createChannel();
    const nameExchange = "send_email";
    await channel.assertExchange(nameExchange, "topic", {
      durable: false,
    });
    const { queue } = await channel.assertQueue("", {
      exclusive: true,
    });
    const agrs = process.argv.slice(2);
    if (!agrs.length) {
      process.exit(0);
    }

    //   * phù hợp với bất kì từ nào
    //   # khớp với 1 hoặc nhiều từ bất kì

    console.log(`waiting queue ${queue}:::topic:::${agrs}`);
    agrs.forEach(async (key) => {
      await channel.bindQueue(queue, nameExchange, key);
    });
    await channel.consume(queue, (msg) => {
      console.log(
        `Routing key: ${
          msg.fields.routingKey
        }:::msg:::${msg.content.toString()}`
      );
    });
    await channel.publish(nameExchange, topic, Buffer.from(msg)); //'': không đk queue cụ thể nào, exchange tự chia
    console.log(`[x] Send Ok:::${msg}`);
    setTimeout(() => {
      conn.close();
      process.exit(0);
    }, 2000);
  } catch (error) {}
};
receiveEmail();
