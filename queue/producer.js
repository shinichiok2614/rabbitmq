const amqplib = require("amqplib");
const amqp_urlJ_cloud =
  "amqps://vtqfufsk:mc_1kCAAa0gsCR9qysjQKnRKIzcD3gV3@armadillo.rmq.cloudamqp.com/vtqfufsk";
const amqp_url_docker = "";
const sendQueue = async ({ msg }) => {
  try {
    const conn = await amqplib.connect(amqp_urlJ_cloud);
    const channel = await conn.createChannel();
    const nameQueue = "q1";
    await channel.assertQueue(nameQueue, {
      durable: false, //mất hàng đợi khi cloud bị crash
    });
    channel.sendToQueue(nameQueue, Buffer.from(msg)); //Buffer: vận chuyển dữ liệu bằng byte, nhanh hơn dạng dữ liệu bt + có thể mã hoá
    //   channel.close()
  } catch (error) {
    console.error(error);
  }
};
const msg = process.argv.slice(2).join(" ") || "Hello";
sendQueue({ msg });
