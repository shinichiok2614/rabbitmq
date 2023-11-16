const amqplib = require("amqplib");
const amqp_urlJ_cloud =
  "amqps://vtqfufsk:mc_1kCAAa0gsCR9qysjQKnRKIzcD3gV3@armadillo.rmq.cloudamqp.com/vtqfufsk";
const amqp_url_docker = "amqp://localhost:5672";
const sendQueue = async ({ msg }) => {
  try {
    const conn = await amqplib.connect(amqp_url_docker);
    const channel = await conn.createChannel();
    const nameQueue = "q3";
    await channel.assertQueue(nameQueue, {
      // durable: false, //mất hàng đợi khi cloud bị crash
      durable: true, //giữ ngay cả service rabbitmq bị restart //consumer cũng phải true
    });
    //Buffer: vận chuyển dữ liệu bằng byte, nhanh hơn dạng dữ liệu bt + có thể mã hoá
    // channel.sendToQueue(nameQueue, Buffer.from(msg), {
    //   expiration: "10000", //10s: ttl time-to-life
    // });
    channel.sendToQueue(nameQueue, Buffer.from(msg), {
      persistent: true, //bền bỉ: mặc định lấy cache ra chạy, nếu cache bị vấn đề thì lấy ổ đĩa ra chạy
    });
    //   channel.close()
  } catch (error) {
    console.error(error);
  }
};
const msg = process.argv.slice(2).join(" ") || "Hello";
sendQueue({ msg });
