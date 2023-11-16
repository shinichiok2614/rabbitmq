const amqplib = require("amqplib");
const amqp_url_cloud =
  "amqps://vtqfufsk:mc_1kCAAa0gsCR9qysjQKnRKIzcD3gV3@armadillo.rmq.cloudamqp.com/vtqfufsk";
const amqp_url_docker = "amqp://localhost:5672";
const sendEmail = async () => {
  try {
    const conn = await amqplib.connect(amqp_url_cloud);
    const channel = await conn.createChannel();
    const nameExchange = "send_email";
    await channel.assertExchange(nameExchange, "topic", {
      durable: false,
    });
    const agrs = process.argv.slice(2);
    const msg = agrs[1] || "Fixed!";
    const topic = agrs[0];
    console.log(`msg:::${msg}::::topic:::${topic}`);
    await channel.publish(nameExchange, topic, Buffer.from(msg)); //'': không đk queue cụ thể nào, exchange tự chia
    console.log(`[x] Send Ok:::${msg}`);
    setTimeout(() => {
      conn.close();
      process.exit(0);
    }, 2000);
  } catch (error) {}
};
sendEmail();
