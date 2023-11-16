const amqplib = require("amqplib");
const amqp_urlJ_cloud =
  "amqps://vtqfufsk:mc_1kCAAa0gsCR9qysjQKnRKIzcD3gV3@armadillo.rmq.cloudamqp.com/vtqfufsk";
const amqp_url_docker = "amqp://localhost:5672";
const postVideo = async ({ msg }) => {
  try {
    const conn = await amqplib.connect(amqp_urlJ_cloud);
    const channel = await conn.createChannel();
    const nameExchange = "video";
    await channel.assertExchange(nameExchange, "fanout", {
      durable: false,
    });
    await channel.publish(nameExchange, "", Buffer.from(msg)); //'': không đk queue cụ thể nào, exchange tự chia
    console.log(`[x] Send Ok:::${msg}`);
    setTimeout(() => {
      conn.close();
      process.exit(0);
    }, 2000);
  } catch (error) {}
};
const msg = process.argv.slice(2).join(" ") || "Hello Exchange";
postVideo({ msg });
